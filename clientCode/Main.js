var client;
var enemy;
var gameID;
var prepWindow;
var positionWindow;
var socket = io.connect();
var currentGame;
var scaling = .75;

socket.on('welcome', function(data) {
	console.log("Your player ID is " + data);
	client.id = data;
	socket.emit('new player created', client.id);
});

function initialize() {
    client = new Player();
	enemy = new Player();
	gameID = -1;
	prepWindow = new buildAFleetWindow(document.getElementById('buildCanvas'), scaling);
	positionWindow = new fleetPositionWindow(document.getElementById('positionCanvas'), scaling)
}

function loadGame() {
	prepWindow.draw();
	prepWindow.drawButtons();
}

function shipDetails(shipname) {
	var index = -1;
	var descriptions = document.getElementsByClassName('shipDes');
	
	switch(shipname){
		case "Scrambler":
			index = 0;
			if (prepWindow.class2.src != 'images/Ships/ship2Scrambler.png') {
				prepWindow.class2.src = 'images/Ships/ship2Scrambler.png';
				prepWindow.class2.addEventListener('load', prepWindow.draw.bind(prepWindow));
				client.fleet[0] = "Scrambler";
			}
			break;
		case "Scanner":
			index = 1;
			if (prepWindow.class2.src != 'images/Ships/ship2Scanner.png') {
				prepWindow.class2.src = 'images/Ships/ship2Scanner.png';
				prepWindow.class2.addEventListener('load', prepWindow.draw.bind(prepWindow));
				client.fleet[0] = "Scanner";
			}
			break;	
		case "Submarine":
			index = 2;
			if (prepWindow.class3.src != 'images/Ships/ship3Submarine.png') {
				prepWindow.class3.src = 'images/Ships/ship3Submarine.png';
				prepWindow.class3.addEventListener('load', prepWindow.draw.bind(prepWindow));
				client.fleet[1] = "Submarine";
			}
			break;
		case "Destroyer":
			index = 3;
			if (prepWindow.class3.src != 'images/Ships/ship3Destroyer.png') {
				prepWindow.class3.src = 'images/Ships/ship3Destroyer.png';
				prepWindow.class3.addEventListener('load', prepWindow.draw.bind(prepWindow));
				client.fleet[1] = "Destroyer";
			}
			break;
		case "Cruiser":
			index = 4;
			if (prepWindow.class4.src != 'images/Ships/ship4Cruiser.png') {
				prepWindow.class4.src = 'images/Ships/ship4Cruiser.png';
				prepWindow.class4.addEventListener('load', prepWindow.draw.bind(prepWindow));
				client.fleet[2] = "Cruiser";
			}
			break;
		case "Carrier":
			index = 5;
			if (prepWindow.class4.src != 'images/Ships/ship4Carrier.png') {
				prepWindow.class4.src = 'images/Ships/ship4Carrier.png';
				prepWindow.class4.addEventListener('load', prepWindow.draw.bind(prepWindow));
				client.fleet[2] = "Carrier";
			}
			break;
		case "Executioner":
			index = 6;
			if (prepWindow.class5.src != 'images/Ships/ship5Executioner.png') {
				prepWindow.class5.src = 'images/Ships/ship5Executioner.png';
				prepWindow.class5.addEventListener('load', prepWindow.draw.bind(prepWindow));
				client.fleet[3] = "Executioner";
			}
			break;
		case "Artillery":
			index = 7;
			if (prepWindow.class5.src != 'images/Ships/ship5Artillery.png') {
				prepWindow.class5.src = 'images/Ships/ship5Artillery.png';
				prepWindow.class5.addEventListener('load', prepWindow.draw.bind(prepWindow));
				client.fleet[3] = "Artillery";
			}
			break;
		default: 
			console.log("Ship Detail Button Error");
	}
	[].forEach.call(descriptions, function(element){
			element.style.display = 'none';
	});
	descriptions[index].style.display = 'block';
}

function loadPositionSelect() {
	positionWindow.drawButtons();
	positionWindow.draw();
}

function toPositionSelect() {
	document.getElementById('buildAFleet').style.display = 'none';
	document.getElementById('positionFleet').style.display = 'block';
	loadPositionSelect();
}

