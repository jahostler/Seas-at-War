//Server.js
/*
	Responsible for reading/sending socket.io events to and from clients, and manages all games being played
	
*/

'use strict';
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require('fs');
var path = require('path');

//holds a Map of all games being played
var games = new Map();
//holds a Map of all players in games, 2 players per game
var players = new Array();

app.get('/', function(request, response){
    console.log('request starting...');

    var filePath = '.' + request.url;
    if (filePath == './')
        filePath = './index.html';
	
    var extname = path.extname(filePath);
    var contentType = 'text/html';
	//reading files
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

//reads a connection event from a client
//once 2 players attempt to connect with the same id, start a new game
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
            console.log('Player failed to be created for client.');
        }
        else {
            console.log('Player ' + newID + ' creation successful!');
        }
    });
	
	//on receiving a new game event from a client, create a new game
	//once game has been created, add to map, and set sending client as host
	socket.on('new game', function(data) {
		gameID = getGameID();
		var hostID = data;
		games.set(gameID, hostID);
		socket.emit(hostID + ' gameID created', gameID);
		console.log('Game ' + gameID + ' was created with host ' + hostID);
	});
	
	//if the client attempts to connect to a valid game id (and it is not full), add that player to the game
	//set the game to full so others may no longer join
	socket.on('join game', function(data) {
		if (!games.has(data.gameID)) {
			socket.emit(data.clientID + ' join error', {});
		}
		else {
			gameID = data.gameID;
			if (games.get(gameID).gameFull) {
				gameID = -1;
				socket.emit(data.clientID + ' join full', {});
				return;
			}
			else {
				games.set(gameID, new Game(games.get(gameID), data.clientID));
				games.get(gameID).gameFull = true;
				socket.emit(games.get(gameID).visitor + ' join success', gameID);
				io.sockets.emit(games.get(gameID).host + ' join success', gameID);
			}
		}
	});
	
	//when player has finished their fleet selection and positioning, set the player as ready
	//if both players are ready, start the game
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
	
	//remove the game from Map
	socket.on('delete game', function(data) {
		games.delete(data);
		console.log('Game ' + data + ' deleted from records');
		gameID = -1;
	});
	
	//records the player's attack, sends an attack event to the other player in the game
	socket.on('turn done', function(attackData){
		console.log(attackData);
		var gameID = attackData.gID;
		var currentGame = games.get(gameID);
		var recipientID = currentGame.host;
		if (attackData.playerID == currentGame.host) {
			recipientID = currentGame.visitor;
		}
		io.sockets.emit(recipientID + ' attack made', attackData);
	});
	
	//sends the updated Tile information from the attack back to the attacking player, so they
	//redraw their screen appropriately
	socket.on('game updated', function(updateData){
		var gameID = updateData.gID;
		var currentGame = games.get(gameID);
		var recipientID = currentGame.host;
		if (updateData.playerID == currentGame.host) {
			recipientID = currentGame.visitor;
		}
		console.log(recipientID + ' update made');
		io.sockets.emit(recipientID + ' make update', updateData);
	});
	
	//when the game is over, delete it 
	socket.on('game over', function(data) {
		var gameID = data.gID;
		var currentGame = games.get(gameID);
		var recipientID = currentGame.host;
		if (data.playerID == currentGame.host) {
			recipientID = currentGame.visitor;
		}
		console.log('Game ' + gameID + ' is over');
		games.delete(gameID);
		io.sockets.emit(recipientID + 'end game', {});
	});
	
	//ends the game on a player disconnect
    socket.on('disconnect', function () {
        var index = players.indexOf(newID);
		if (games.delete(gameID)) {
			io.sockets.emit(gameID + ' player disconnect');
			console.log('Game ' + gameID + ' deleted from records');
		}
		players.splice(index, 1);
        console.log('Player ' + newID + ' deleted from records.');
		console.log(players);
		console.log(games);
    });
    
});

//generates a unique player id
function getPlayerID() {
    var clientID = 10000 + players.length;
    while (players.indexOf(clientID) != -1)
        clientID += 1;
    return clientID;
};

//generates a unique game id
function getGameID() {
    var gameID = 1 + games.size;
    while (games.has(gameID))
        gameID += 1;
    return gameID;
};

//returns random integer in range [min, max]
function getRandomInt(min, max) {  
	//http://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var portNumber = 35000;
if (process.argv.length >= 3) {
	portNumber = process.argv[2];
}

http.listen(portNumber, function(){
   console.log('listening on *: ' + portNumber);
 });

//Game class
//holds the ids of the players, their status (ready/not ready), and the status of the game
class Game {
	constructor(hostID, visitorID) {
		this.host = hostID;
		this.hostReady = false;
		this.visitor = visitorID;
		this.visitorReady = false;
		this.gameFull = false;
	}
}
