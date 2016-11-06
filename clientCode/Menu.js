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
		loadGame();
	});
}
function removeGame() {
	socket.emit('delete game', gameID);
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
	socket.on(client.id + ' join success' , function(data) {
		document.getElementById('joinGame').style.display = 'none';
		document.getElementById('buildAFleet').style.display = 'block';
		loadGame();
	});
}

function instructions() {
	document.getElementById('mainMenu').style.display = 'none';
	document.getElementById('instructions').style.display = 'block';
	document.getElementsByClassName('instructImg')[0].style.display = 'block';
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
	if (displayedScreen == 'instructions') {
		var instructions = document.getElementsByClassName('instructImg');
		[].forEach.call(instructions, function(element){
			element.style.display = 'none';
		});
	}
	document.getElementById(displayedScreen).style.display = 'none';
	document.getElementById('mainMenu').style.display = 'block';
}

function resizeGame() {
//	canvas1 = document.getElementById('buildCanvas');
//	canvas2 = document.getElementById('gameCanvas');
//	canvas1.width = window.innerWidth;
//	canvas1.height = window.innerHeight;
//	canvas2.width = window.innerWidth;
//	canvas2.height = window.innerHeight;
}

function shipDetails(shipname) {
	var index = -1;
	var descriptions = document.getElementsByClassName('shipDes')
	switch(shipname){
		case "Scrambler":
			index = 0;
			break;
		case "Scanner":
			index = 1;
			break;	
		break;
		case "Submarine":
			index = 2;
			break;
		case "Destroyer":
			index = 3;
			break;
		case "Cruiser":
			index = 4;
			break;
		case "Carrier":
			index = 5;
			break;
		case "Executioner":
			index = 6;
			break;
		case "Artillery":
			index = 7;
			break;
		default: 
			console.log("Ship Detail Button Error");
	}
	[].forEach.call(descriptions, function(element){
			element.style.display = 'none';
	});
	descriptions[index].style.display = 'block';
}