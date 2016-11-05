var client;
var enemy;
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
}

function loadGame() {
	
}

function newGame() {
	socket.emit('new game', client.id);
	socket.on(client.id + ' gameID created', function(data) {
		console.log(data);
		document.getElementById("sessionID").innerHTML = "Your session ID: " + data;
		document.getElementById("sessionID").innerHTML += "<p> Waiting for player to join... </p>";
	});
}

function resizeGame() {
	canvas = document.getElementById("gameCanvas");
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
}

function resizeWindow() {
	win = document.getElementById("gameWindow");
	win.width = window.innerWidth;
	win.height = window.innerHeight;
}

function hostGame() {
	document.getElementById('mainMenu').style.display = 'none';
	document.getElementById('hostGame').style.display = 'block';
	newGame();
}

function joinGame() {
	document.getElementById('mainMenu').style.display = 'none';
	document.getElementById('joinGame').style.display = 'block';
}

function joinID() {
	var id = document.getElementById('sessionID').value;
	socket.emit('join game', {gameID : id, clientID : client.id});
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
	document.getElementById(displayedScreen).style.display = 'none';
	document.getElementById('mainMenu').style.display = 'block';
}