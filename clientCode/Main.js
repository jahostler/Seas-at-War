var client;
var enemy;
var gameID;
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
}

function loadGame() {
	var buildCanvas = new fabric.Canvas('buildCanvas', { selection: false });
	var rect = new fabric.Rect({
		left: 100,
		top: 100,
		fill: 'red',
		width: 20,
		height: 20,
		angle: 45
	});
	canvas.add(rect);
}
