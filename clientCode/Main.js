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
	document.getElementById('buildCanvas').style.display = 'block';
	var buildCanvasCtx = document.getElementById('buildCanvas').getContext('2d');
	var backgroundImg = new Image();
	backgroundImg.src = 'images/Ships/shipSelect.png';
	var class2 = new Image();
	class2.src = 'images/Ships/ship2temp.png';
	backgroundImg.onload = function() {
		buildCanvasCtx.drawImage(backgroundImg, 0, 0, 1680, 945);
		buildCanvasCtx.drawImage(class2, 50, 50, 67, 120);
	};
}
