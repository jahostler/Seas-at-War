"use strict";
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require('fs');
var path = require('path');

var games = new Map();
var players = new Array();

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
		case '.svg':
			contentType = 'image/svg+xml';
			break;
    }
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
app.use('/clientCode', express.static(__dirname + '/clientCode'));
app.use('/images', express.static(__dirname + '/images'));
app.use('/style.css', express.static(__dirname + '/style.css'));

io.on('connection', function(socket){
	console.log('a user connected');
    var newID = getPlayerID();
	var gameID = -1;
    players.push(newID);
    socket.emit('welcome', newID);
    socket.on('new player created', function(data) {
        if (data != newID) {
			console.log(data);
            players.delete(newID);
            console.log("Player failed to be created for client.");
        }
        else {
            console.log("Player " + newID + " creation successful!");
        }
    });
	socket.on('new game', function(data) {
		gameID = getGameID();
		var hostID = data;
		games.set(gameID, hostID);
		socket.emit(hostID + ' gameID created', gameID);
		console.log("Game " + gameID + " was created with host " + hostID);
	});
	socket.on('join game', function(data) {
		if (!games.has(data.gameID)) {
			socket.emit(data.clientID + ' join error', {});
		}
		else {
			gameID = data.gameID;
			if (games.get(gameID).gameFull) {
				socket.emit(data.clientID + ' join full', {});
				return;
			}
			games.set(gameID, new Game(games.get(gameID), data.clientID));
			games.get(gameID).gameFull = true;
			socket.emit(games.get(gameID).visitor + ' join success', {});
			io.sockets.emit(games.get(gameID).host + ' join success', {});
		}
	});
	socket.on('delete game', function(data) {
		games.delete(data);
		console.log("Game " + data + " deleted from records");
		gameID = -1;
	});
	
	socket.on('fleet finished', function(data) {
		gameID = data.gID;
		if(data.playerID == games.get(gameID).host) {
			if(games.get(gameID).hostReady != true) {
				console.log('host ready on game ' + gameID);
				games.get(gameID).hostReady = true;
			}
		}
		if(data.playerID == games.get(gameID).visitor) {
			if(games.get(gameID).visitorReady != true) {
				console.log('visitor ready on game ' + gameID);
				games.get(gameID).visitorReady = true;
			}
		}
		if(games.get(gameID).visitorReady && games.get(gameID).hostReady) {
			var firstPlayer = games.get(gameID).host;
			if (getRandomInt(0, 1) == 1) {
				firstPlayer = games.get(gameID).visitor;
			}
			io.sockets.emit(gameID + ' ready', firstPlayer);
		}
	});
	
    socket.on('disconnect', function () {
        var index = players.indexOf(newID);
		if (games.delete(gameID)) {
			io.sockets.emit(gameID + ' player disconnect');
			console.log("Game " + gameID + " deleted from records");
		}
		players.splice(index, 1);
        console.log("Player " + newID + " deleted from records.");
		console.log(players);
		console.log(games);
    });
    
});

function getPlayerID() {
    var clientID = 10000 + players.length;
    while (players.indexOf(clientID) != -1)
        clientID += 1;
    return clientID;
};

function getGameID() {
    var gameID = 1 + games.size;
    while (games.has(gameID))
        gameID += 1;
    return gameID;
};

//returns random integer in range [min, max]
function getRandomInt(min, max) {  //http://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var portNumber = 35000;
if (process.argv.length >= 3) {
	portNumber = process.argv[2];
}

http.listen(portNumber, function(){
   console.log('listening on *: ' + portNumber);
 });

class Game {
	constructor(hostID, visitorID) {
		this.host = hostID;
		this.hostReady = false;
		this.visitor = visitorID;
		this.visitorReady = false;
		this.gameFull = false;
	}
}
