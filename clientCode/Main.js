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