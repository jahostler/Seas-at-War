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
