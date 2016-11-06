var client;
var enemy;
var gameID;
var prepWindow;
var socket = io.connect();
var currentGame;

socket.on('welcome', function(data) {
	console.log("Your player ID is " + data);
	client.id = data;
	socket.emit('new player created', client.id);
});

function initialize() {
    client = new Player();
	enemy = new Player();
	gameID = -1;
	prepWindow = new buildAFleetWindow(document.getElementById('buildCanvas'), 30, .75);
}

function loadGame() {
	prepWindow.draw();
}
