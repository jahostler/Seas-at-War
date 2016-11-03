"use strict";
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require('fs');
var path = require('path');

var gameMap = new Map();
var playerMap = new Map();

app.get('/', function(request, response){
    console.log('request starting...');

    var filePath = '.' + request.url;
    if (filePath == './')
        filePath = './index.html';

    var extname = path.extname(filePath);
    var contentType = 'text/html';
    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;      
        case '.jpg':
            contentType = 'image/jpg';
            break;
        case '.wav':
            contentType = 'audio/wav';
            break;
    }
            console.log(filePath);
    fs.readFile(filePath, function(error, content) {
        if (error) {
            if(error.code == 'ENOENT'){
                fs.readFile('./404.html', function(error, content) {
                    response.writeHead(200, { 'Content-Type': contentType });
                    response.end(content, 'utf-8');
                });
            }
            else {
                response.writeHead(500);
                response.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
                response.end(); 
            }
        }
        else {
            response.writeHead(200, { 'Content-Type': contentType });
            response.end(content, 'utf-8');
        }
    });
});
app.use('/clientCode', express.static(__dirname + '/clientCode'))

io.on('connection', function(socket){
	console.log('a user connected');
    var newID = newClientID();
    playerMap.set(newID, new Player(newID));
    socket.emit('new player', {'player' : playerMap.get(newID)});
    socket.on('new player created', function(data) {
        if (data.id != newID) {
			console.log(data.id);
            playerMap.delete(newID);
            console.log("Player failed to be created for client.");
        }
        else {
            console.log("Player " + newID + " creation successful!");
        }
    });
    
    socket.on('disconnect', function () {
        playerMap.delete(newID);
        console.log("Player " + newID + " deleted from records.");
    });
    
});

var newClientID = function() {
    var clientID = 10000 + gameMap.size;
    while (gameMap.has(clientID))
        clientID += 1;
    return clientID;
};

var portNumber = 35000;
if (process.argv.length >= 3) {
	portNumber = process.argv[2];
}

http.listen(portNumber, function(){
   console.log('listening on *: ' + portNumber);
 });



class Game {
    
}

class Player {
    constructor(ID) {
        this.homeGrid = new Grid();
        this.id = ID;
        this.fleet = new Array(4);
    }
}

class Grid {
	constructor() {
		this.area = new Array(9);
		for (var i = 0; i < 9; i++) {
			this.area[i] = new Array(9);
		}
	}
}

class Tile {
	
}

class BattleShip {
    
}
