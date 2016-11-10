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
		document.getElementById('buildAFleet').addEventListener('load', loadGame(), false);
	});
}
function removeGame() {
	socket.emit('delete game', gameID);
	client.fleet = ["Scrambler", "Submarine", "Cruiser", "Executioner"];
	var buttons = document.getElementById('positionFleet').querySelectorAll('button');
	[].forEach.call(buttons, function(element) {
		element.disabled = false;
	});
	gameID = -1;
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
	var input = parseInt(document.getElementById('joinIDVar').value);
	socket.emit('join game', {gameID : input, clientID : client.id});
	socket.on(client.id + ' join error' , function(data) {
		document.getElementById('joinGameError').innerHTML = 'Cannot find session ID';
		return;
	});
	socket.on(client.id + ' join full' , function(data) {
		document.getElementById('joinGameError').innerHTML = 'Game is full';
		return;
	});
	socket.on(client.id + ' join success' , function(data) {
		gameID = input;
		document.getElementById('joinGame').style.display = 'none';
		document.getElementById('buildAFleet').style.display = 'block';
		document.getElementById('buildAFleet').addEventListener('load', loadGame(), false);
	});
}

function instructions() {
	document.getElementById('mainMenu').style.display = 'none';
	document.getElementById('instructions').style.display = 'block';
	document.getElementsByClassName('instructImg')[0].style.display = 'block';
	document.getElementById('nextInstruction').style.display = 'block';
	document.getElementById('previousInstruction').style.display = 'none';
}

function nextInstruction(){
	var instructions = document.getElementsByClassName('instructImg');
	for (var i = 0; i < instructions.length - 1; ++i) {
		if (instructions[i].style.display == 'block') {
			instructions[i].style.display = 'none';
			instructions[i+1].style.display = 'block';
			if (i == 0) {
				document.getElementById('previousInstruction').style.display = 'block';
			}
			if (i == 5) {
				document.getElementById('nextInstruction').style.display = 'none';
			}
			break;
		}
	}
}

function prevInstruction() {
	var instructions = document.getElementsByClassName('instructImg');
	for (var i = 1; i < instructions.length; ++i) {
		if (instructions[i].style.display == 'block') {
			instructions[i].style.display = 'none';
			instructions[i-1].style.display = 'block';
			if (i == 1) {
				document.getElementById('previousInstruction').style.display = 'none';
			}
			if (i == 6) {
				document.getElementById('nextInstruction').style.display = 'block';
			}
			break;
		}
	}
}

function credits() {
	document.getElementById('mainMenu').style.display = 'none';
	document.getElementById('credits').style.display = 'block';
}

function backToMain(displayedScreen) {
	if (displayedScreen == 'hostGame') {
		removeGame();
	}
	else if (displayedScreen == 'instructions') {
		var instructions = document.getElementsByClassName('instructImg');
		[].forEach.call(instructions, function(element){
			element.style.display = 'none';
		});
	}
	else if (displayedScreen == 'gameOver') {
		removeGame();
	}
	document.getElementById(displayedScreen).style.display = 'none';
	document.getElementById('mainMenu').style.display = 'block';
}


function resizeGame() {
	
}