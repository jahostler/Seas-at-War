var client;
var enemy;
var gameID;
var socket = io.connect();

socket.on('welcome', function(data) {
	console.log(data);
	client.id = data;
	socket.emit('new player created', client.id);
});

class Player {
    constructor() {
        this.homeGrid = new Grid();
		this.id = -1;
        this.fleet = new Array(4);
    }
}

class Grid {
	constructor() {
		this.field = new Array(9);
		for (var i = 0; i < 9; i++) {
			this.field[i] = new Array(9);
		}
	}
}

class Tile {
	
}

class BattleShip {
    
}

function initialize() {
    client = new Player();
	enemy = new Player();
	gameID = -1;
}

function loadGame() {
	
}

function newGame() {
	socket.emit('new game', client.id);
	socket.on(client.id + ' gameID created', function(data) {
		gameID = data;
		document.getElementById('sessionID').innerHTML = 'Your session ID: ' + gameID;
		document.getElementById('sessionID').innerHTML += '<p font-size="16px"> Waiting for player to join... </p>';
	});
	socket.on(client.id + ' join success' , function(data) {
		document.getElementById('hostGame').style.display = 'none';
		document.getElementById('buildAFleet').style.display = 'block';
	});
}

function resizeGame() {
	canvas = document.getElementById('gameCanvas');
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
}

function resizeWindow() {
	win = document.getElementById('gameWindow');
	win.width = window.innerWidth;
	win.height = window.innerHeight;
}

function hostGame() {
	document.getElementById('mainMenu').style.display = 'none';
	document.getElementById('hostGame').style.display = 'block';
	newGame();
}

function removeGame() {
	socket.emit('delete game', gameID);
	gameID = -1;
}

function joinGame() {
	document.getElementById('mainMenu').style.display = 'none';
	document.getElementById('joinGame').style.display = 'block';
}

function joinID() {
	var input = parseInt(document.getElementById('joinIDVar').value);
	socket.emit('join game', {gameID : input, clientID : client.id});
	socket.on(client.id + ' join error' , function(data) {
		document.getElementById('joinGameError').innerHTML = 'Cannot find session ID';
		return;
	});
	socket.on(client.id + ' join success' , function(data) {
		document.getElementById('joinGame').style.display = 'none';
		document.getElementById('buildAFleet').style.display = 'block';
	});
}

function instructions() {
	document.getElementById('mainMenu').style.display = 'none';
	document.getElementById('instructions').style.display = 'block';
}

function credits() {
	document.getElementById('mainMenu').style.display = 'none';
	document.getElementById('credits').style.display = 'block';
}

function backToMain(displayedScreen) {
	if (displayedScreen == 'hostGame') {
		removeGame();
	}
	document.getElementById(displayedScreen).style.display = 'none';
	document.getElementById('mainMenu').style.display = 'block';
}