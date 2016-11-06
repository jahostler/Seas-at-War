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
}

function nextInstruction(){
	if(document.getElementById('i1').style.display == 'block') { //1 -> 2
		document.getElementById('i1').style.display = 'none';
		document.getElementById('i2').style.display = 'block';
	}
	else if(document.getElementById('i2').style.display == 'block') { //2 -> 3
		document.getElementById('i2').style.display = 'none';
		document.getElementById('i3').style.display = 'block';
	}
	else if(document.getElementById('i3').style.display == 'block') {
		document.getElementById('i3').style.display = 'none';
		document.getElementById('i4').style.display = 'block';
	}
	else if(document.getElementById('i4').style.display == 'block') {
		document.getElementById('i4').style.display = 'none';
		document.getElementById('i5').style.display = 'block';
	}
	else if(document.getElementById('i5').style.display == 'block') {
		document.getElementById('i5').style.display = 'none';
		document.getElementById('i6').style.display = 'block';
	}
	else if(document.getElementById('i6').style.display == 'block') {
		document.getElementById('i6').style.display = 'none';
		document.getElementById('i7').style.display = 'block';
	}
	else if(document.getElementById('i7').style.display == 'block') {
		//do nothing
	}
}

function prevInstruction() {
	if(document.getElementById('i7').style.display == 'block') { //1 -> 2
		document.getElementById('i7').style.display = 'none';
		document.getElementById('i6').style.display = 'block';
	}
	else if(document.getElementById('i6').style.display == 'block') { //2 -> 3
		document.getElementById('i6').style.display = 'none';
		document.getElementById('i5').style.display = 'block';
	}
	else if(document.getElementById('i5').style.display == 'block') {
		document.getElementById('i5').style.display = 'none';
		document.getElementById('i4').style.display = 'block';
	}
	else if(document.getElementById('i4').style.display == 'block') {
		document.getElementById('i4').style.display = 'none';
		document.getElementById('i3').style.display = 'block';
	}
	else if(document.getElementById('i3').style.display == 'block') {
		document.getElementById('i3').style.display = 'none';
		document.getElementById('i2').style.display = 'block';
	}
	else if(document.getElementById('i2').style.display == 'block') {
		document.getElementById('i2').style.display = 'none';
		document.getElementById('i1').style.display = 'block';
	}
	else if(document.getElementById('i1').style.display == 'block') {
		//do nothing
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