var client;
var enemy;
var gameID;
var socket = io.connect();

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
	
}

function shipDetails(shipname) {
	switch(shipname){
		case "Scrambler":
			document.getElementById('2a').style.display='block';
			document.getElementById('2b').style.display='none';
			document.getElementById('3a').style.display='none';
			document.getElementById('3b').style.display='none';
			document.getElementById('4a').style.display='none';
			document.getElementById('4b').style.display='none';
			document.getElementById('5a').style.display='none';
			document.getElementById('5b').style.display='none';
		break;
		
		case "Scanner":
			document.getElementById('2a').style.display='none';
			document.getElementById('2b').style.display='block';
			document.getElementById('3a').style.display='none';
			document.getElementById('3b').style.display='none';
			document.getElementById('4a').style.display='none';
			document.getElementById('4b').style.display='none';
			document.getElementById('5a').style.display='none';
			document.getElementById('5b').style.display='none';	
		break;
		
		case "Submarine":
			document.getElementById('2a').style.display='none';
			document.getElementById('2b').style.display='none';
			document.getElementById('3a').style.display='block';
			document.getElementById('3b').style.display='none';
			document.getElementById('4a').style.display='none';
			document.getElementById('4b').style.display='none';
			document.getElementById('5a').style.display='none';
			document.getElementById('5b').style.display='none';
		break;
		
		case "Destroyer":
			document.getElementById('2a').style.display='none';
			document.getElementById('2b').style.display='none';
			document.getElementById('3a').style.display='none';
			document.getElementById('3b').style.display='block';
			document.getElementById('4a').style.display='none';
			document.getElementById('4b').style.display='none';
			document.getElementById('5a').style.display='none';
			document.getElementById('5b').style.display='none';
		break;
		
		case "Cruiser":
			document.getElementById('2a').style.display='none';
			document.getElementById('2b').style.display='none';
			document.getElementById('3a').style.display='none';
			document.getElementById('3b').style.display='none';
			document.getElementById('4a').style.display='block';
			document.getElementById('4b').style.display='none';
			document.getElementById('5a').style.display='none';
			document.getElementById('5b').style.display='none';
		break;
		
		case "Carrier":
			document.getElementById('2a').style.display='none';
			document.getElementById('2b').style.display='none';
			document.getElementById('3a').style.display='none';
			document.getElementById('3b').style.display='none';
			document.getElementById('4a').style.display='none';
			document.getElementById('4b').style.display='block';
			document.getElementById('5a').style.display='none';
			document.getElementById('5b').style.display='none';
		break;
		
		case "Executioner":
			document.getElementById('2a').style.display='none';
			document.getElementById('2b').style.display='none';
			document.getElementById('3a').style.display='none';
			document.getElementById('3b').style.display='none';
			document.getElementById('4a').style.display='none';
			document.getElementById('4b').style.display='none';
			document.getElementById('5a').style.display='block';
			document.getElementById('5b').style.display='none';
		break;
		
		case "Artillery":
			document.getElementById('2a').style.display='none';
			document.getElementById('2b').style.display='none';
			document.getElementById('3a').style.display='none';
			document.getElementById('3b').style.display='none';
			document.getElementById('4a').style.display='none';
			document.getElementById('4b').style.display='none';
			document.getElementById('5a').style.display='none';
			document.getElementById('5b').style.display='block';
		break;
		default: 
			console.log("Ship Detail Button Error");
	}
}

