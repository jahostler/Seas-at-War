/** Globals - Engine **/
var LOOP_DELAY = 16;
var DEBUG = true;
var WIDTH = 800;
var HEIGHT = 600;

// Game Globals
var player;
var others;
var canvas, context;

// socket.io
var socket = io.connect();
           
socket.on('welcome', function(data) {
    player.id = data.id;
    console.log("got player id: "+player.id);
    
    // send the player info to the server
    var playerData = {
		id: player.id,
		pos: player.position,
		frame: player.frameIndex,
		facing: player.facing
	};
    socket.emit("addPlayer", playerData);
});

socket.on('allPlayers', function(data) {

	console.log(data);

	for(var i in data.players)
	{
		// create new OtherPlayer
		var other = new OtherPlayer(data.players[i].id);
			other.position = data.players[i].pos;
			other.frameIndex = data.players[i].frame;
			other.facing = data.players[i].facing;
			
		others.set(other.id, other);
	}
/*
	// create new OtherPlayer
	var other = new OtherPlayer(data.id);
		other.position = data.pos;
		other.frameIndex = data.frame;
		other.facing = data.facing;
		
	others.set(other.id, other);
*/
    console.log("adding existing players");
});

socket.on('addPlayer', function(data) {
	
	// create new OtherPlayer
	var other = new OtherPlayer(data.id);
		other.position = data.pos;
		other.frameIndex = data.frame;
		other.facing = data.facing;
		
	others.set(other.id, other);

    console.log("adding new other player id: "+other.id);
});

socket.on('removePlayer', function(data) {
   
   	// remove the player from the others map
   	others.remove(data.id);
   	
    console.log("removing player id: "+data.id);
});

socket.on('updatePlayer', function(data) {
	
	// update the otherPlayer's fields
	try {
		var other = others.get(data.id);
		other.position = data.pos;
		other.frameIndex = data.frame;
		other.facing = data.facing;
	} catch(e) {
	}
	
    //console.log("updating player id: "+data.id);
});

window.onbeforeunload = function (e) {
	socket.emit("removePlayer", {id: player.id});
};

 
// Game Setup
function loadGame()
{
	// initialize stuff	
	canvas = document.getElementById('gameCanvas');
	context = canvas.getContext('2d');
	
	player = new Player();
	
	others = new Map();
	
	// after things have been initialized
	// might want to delay the setup function until you are sure everything has loaded
	setupGame();	
}

function setupGame()
{
	
	// add key event handlers to the window
	window.onkeydown = KeyHandler.onKeyDown;
	window.onkeyup = KeyHandler.onKeyUp;
		
	// start game loop
	setInterval(gameLoop, LOOP_DELAY);
}

function gameLoop()
{
	// this function runs every 'frame'
	
	// call the players update function
	player.update();
	
	// update the other players on the gameboard
	
	// redraw the canvas
	redraw();
}

function redraw()
{
	clearCanvas();
	
	player.draw();
	

	// put all the drawables together
	var drawables = getAllDrawables();

	// sort all drawables by their bottom
	// so that they are drawn in the right order
	// which will properly layer them in the y axis
	
	drawables.sort(function(a, b) {
	  return a.getVisualBottom() - b.getVisualBottom();
	});
	
	for(var i = 0; i < drawables.length; i++)
	{
		drawables[i].draw();
	}
	
}

function getAllDrawables()
{
	var drawables = [];
	
	for(var i of others.values())
	{
		drawables.push(i);
	}
	
	drawables.push(player);
	
	return drawables;
}

 function clearCanvas()
{
	canvas.width = WIDTH;
	canvas.height = HEIGHT;
};

function drawImage(img, x, y, width, height)
{	
	//x = Math.round(x);
	//y = Math.round(y);
	
	//draw canvas without smoothing, for pixel art
	context.imageSmoothingEnabled = false;
	context.mozImageSmoothingEnabled = false;
	context.oImageSmoothingEnabled = false;
	context.webkitImageSmoothingEnabled = false;
	
	// draw the image to the canvas
	context.drawImage(img, x, y, width, height);
};

function drawCircle(color, x, y, width, height)
{
	var centerX = x + width / 2;
	var centerY = y + height / 2;

	context.beginPath();
	context.arc(centerX, centerY, width / 2, 0, 2 * Math.PI, false);
	context.fillStyle = color;
	context.fill();
};

function drawImageRect(img, sx, sy, swidth, sheight, x, y, width, height)
{	
	//x = Math.round(x);
	//y = Math.round(y);	
	
	//draw canvas without smoothing, for pixel art
	context.imageSmoothingEnabled = false;
	context.mozImageSmoothingEnabled = false;
	context.oImageSmoothingEnabled = false;
	context.webkitImageSmoothingEnabled = false;
	
	// draw a subsection of the image
	context.drawImage(img, sx, sy, swidth, sheight, x, y, width, height);
};

