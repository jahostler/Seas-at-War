var client;
var enemy;
var gameID;
var prepWindow;
var positionWindow;
var socket = io.connect();
var playWindow;
var scaling = .8;
var backgrounds;
var tempImages;
var finishFleetDims;
var finishShipSelectDims;
var normalAttackDims;
var specialAttackDims;
var buildButtonDims;
var selectButtonDims;
var moveButtonDims;

socket.on('welcome', function(data) {
	console.log("Your player ID is " + data);
	client.id = data;
	socket.emit('new player created', client.id);
});

socket.on('disconnect', function(data) {
	//todo:  add formal message telling client server disconnected
	var divs = document.getElementsByTagName('div');
	for(var i = 0; i < divs.length; i++) {
		divs[i].style.display = 'none';
	}
	document.getElementById('serverDisconnectMessage').style.display = 'block';
});

function initialize() {
    client = new Player();
	enemy = new Player();
	gameID = -1;
	var instructImages = document.getElementsByClassName('instructImg');
	var instructImgDims = [instructImages[0].width * 0.9, instructImages[0].height * 0.9];
	for (var i = 0; i < instructImages.length; i++) {
		instructImages[i].style.width = instructImgDims[0] + 'px';
		instructImages[i].style.height = instructImgDims[1] + 'px';
	}
	backgrounds = [new Image(), new Image(), new Image()];
	backgrounds[0].src = 'images/Ships/shipSelect.png';
	backgrounds[1].src = 'images/Ships/shipSelect.png';
	backgrounds[2].src = 'images/gameBoard.png';
	tempImages = [new Image(), new Image(), new Image(), new Image()];
	tempImages[0].src = 'images/Ships/ship2temp.png';
	tempImages[1].src = 'images/Ships/ship3temp.png';
	tempImages[2].src = 'images/Ships/ship4temp.png';
	tempImages[3].src = 'images/Ships/ship5temp.png';
	finishFleetDims = [document.getElementById('finishFleet').offsetLeft, document.getElementById('finishFleet').offsetTop];
	finishShipSelectDims = [document.getElementById('finishShipSelect').offsetLeft, document.getElementById('finishShipSelect').offsetTop];
	normalAttackDims = [document.getElementById('normalAttack').offsetLeft, document.getElementById('normalAttack').offsetTop];
	specialAttackDims = [document.getElementById('specialAttack').offsetLeft, document.getElementById('specialAttack').offsetTop];
	var tempBuildBut = document.getElementsByClassName('buildButton');
	buildButtonDims = new Array(tempBuildBut.length);
	for (var i = 0; i < tempBuildBut.length; i++) {
		buildButtonDims[i] = new Array(2);
		buildButtonDims[i][0] = tempBuildBut[i].offsetLeft;
		buildButtonDims[i][1] = tempBuildBut[i].offsetTop;
	}
	var tempSelectBut = document.getElementsByClassName('shipSelectButton');
	selectButtonDims = new Array(tempSelectBut.length);
	for (var i = 0; i < tempSelectBut.length; i++) {
		selectButtonDims[i] = new Array(2);
		selectButtonDims[i][0] = tempSelectBut[i].offsetLeft;
		selectButtonDims[i][1] = tempSelectBut[i].offsetTop;
	}
	var tempMoveBut = document.getElementsByClassName('shipMoveButton');
	moveButtonDims = new Array(tempMoveBut.length);
	for (var i = 0; i < tempMoveBut.length; i++) {
		moveButtonDims[i] = new Array(2);
		moveButtonDims[i][0] = tempMoveBut[i].offsetLeft;
		moveButtonDims[i][1] = tempMoveBut[i].offsetTop;
	}
	var divs = document.getElementsByTagName('div');
	for(var i = 0; i < divs.length; i++) {
		divs[i].style.display = 'none';
	}
	document.getElementById('mainMenu').style.display = 'block';
}

function loadGame() {
	console.log("Your game ID is " + gameID);
	prepWindow = new buildAFleetWindow(document.getElementById('buildCanvas'), scaling); //todo: fix scaling of buttons
	positionWindow = new fleetPositionWindow(document.getElementById('positionCanvas'), scaling)
	socket.on(gameID + ' player disconnect', function(data){
		//todo:  add formal message telling client other player disconnected
		var divs = document.getElementsByTagName('div');
		for(var i = 0; i < divs.length; i++) {
			divs[i].style.display = 'none';
		}
		document.getElementById('playerDisconnectMessage').style.display = 'block';
		removeGame();
	});
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
				positionWindow.class2.src = 'images/Ships/ship2Scrambler.png';
				positionWindow.class2Hor.src = 'images/Ships/ship2ScramblerHor.png';
				prepWindow.class2.addEventListener('load', prepWindow.draw.bind(prepWindow));
				client.fleet[0] = "Scrambler";
				document.getElementById('scannerDes').disabled = false;
			}
			break;
		case "Scanner":
			index = 1;
			if (prepWindow.class2.src != 'images/Ships/ship2Scanner.png') {
				prepWindow.class2.src = 'images/Ships/ship2Scanner.png';
				positionWindow.class2.src = 'images/Ships/ship2Scanner.png';
				positionWindow.class2Hor.src = 'images/Ships/ship2ScannerHor.png';
				prepWindow.class2.addEventListener('load', prepWindow.draw.bind(prepWindow));
				client.fleet[0] = "Scanner";
				document.getElementById('scramblerDes').disabled = false;
			}
			break;	
		case "Submarine":
			index = 2;
			if (prepWindow.class3.src != 'images/Ships/ship3Submarine.png') {
				prepWindow.class3.src = 'images/Ships/ship3Submarine.png';
				positionWindow.class3.src = 'images/Ships/ship3Submarine.png';	
				positionWindow.class3Hor.src = 'images/Ships/ship3SubmarineHor.png';				
				prepWindow.class3.addEventListener('load', prepWindow.draw.bind(prepWindow));
				client.fleet[1] = "Submarine";
				document.getElementById('destroyerDes').disabled = false;
			}
			break;
		case "Destroyer":
			index = 3;
			if (prepWindow.class3.src != 'images/Ships/ship3Destroyer.png') {
				prepWindow.class3.src = 'images/Ships/ship3Destroyer.png';
				positionWindow.class3.src = 'images/Ships/ship3Destroyer.png';
				positionWindow.class3Hor.src = 'images/Ships/ship3DestroyerHor.png';
				prepWindow.class3.addEventListener('load', prepWindow.draw.bind(prepWindow));
				client.fleet[1] = "Destroyer";
				document.getElementById('submarineDes').disabled = false;
			}
			break;
		case "Cruiser":
			index = 4;
			if (prepWindow.class4.src != 'images/Ships/ship4Cruiser.png') {
				prepWindow.class4.src = 'images/Ships/ship4Cruiser.png';
				positionWindow.class4.src = 'images/Ships/ship4Cruiser.png';
				positionWindow.class4Hor.src = 'images/Ships/ship4CruiserHor.png';
				prepWindow.class4.addEventListener('load', prepWindow.draw.bind(prepWindow));
				client.fleet[2] = "Cruiser";
				document.getElementById('carrierDes').disabled = false;
			}
			break;
		case "Carrier":
			index = 5;
			if (prepWindow.class4.src != 'images/Ships/ship4Carrier.png') {
				prepWindow.class4.src = 'images/Ships/ship4Carrier.png';
				positionWindow.class4.src = 'images/Ships/ship4Carrier.png';
				positionWindow.class4Hor.src = 'images/Ships/ship4CarrierHor.png';
				prepWindow.class4.addEventListener('load', prepWindow.draw.bind(prepWindow));
				client.fleet[2] = "Carrier";
				document.getElementById('cruiserDes').disabled = false;
			}
			break;
		case "Executioner":
			index = 6;
			if (prepWindow.class5.src != 'images/Ships/ship5Executioner.png') {
				prepWindow.class5.src = 'images/Ships/ship5Executioner.png';
				positionWindow.class5.src = 'images/Ships/ship5Executioner.png';
				positionWindow.class5Hor.src = 'images/Ships/ship5ExecutionerHor.png';
				prepWindow.class5.addEventListener('load', prepWindow.draw.bind(prepWindow));
				client.fleet[3] = "Executioner";
				document.getElementById('artilleryDes').disabled = false;
			}
			break;
		case "Artillery":
			index = 7;
			if (prepWindow.class5.src != 'images/Ships/ship5Artillery.png') {
				prepWindow.class5.src = 'images/Ships/ship5Artillery.png';
				positionWindow.class5.src = 'images/Ships/ship5Artillery.png';
				positionWindow.class5Hor.src = 'images/Ships/ship5ArtilleryHor.png';
				prepWindow.class5.addEventListener('load', prepWindow.draw.bind(prepWindow));
				client.fleet[3] = "Artillery";
				document.getElementById('executionerDes').disabled = false;
			}
			break;
	}
	document.getElementById(shipname.toLowerCase() + 'Des').disabled = true;
	[].forEach.call(descriptions, function(element){
			element.style.display = 'none';
	});
	console.log(descriptions[index]);
	descriptions[index].style.display = 'block';
	if (prepWindow.divX == -1) {
		prepWindow.divX = prepWindow.adjust(document.getElementsByClassName('shipDes')[index].offsetLeft) + 'px';
		prepWindow.divY = prepWindow.adjust(document.getElementsByClassName('shipDes')[index].offsetTop) + 'px';
		[].forEach.call(descriptions, function(element){
			element.style.left = prepWindow.divX;
			element.style.top = prepWindow.divY;
		});
	}
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


function startGameScreen() {
	socket.emit('fleet finished', {gID: gameID, playerID: client.id});
	positionWindow.waitMessage();
	socket.on(gameID + ' ready', function(data) {
		if (data == client.id) {
			client.hasTurn = true;
		}
		playWindow = new gameWindow(document.getElementById('gameCanvas'), scaling, client);
		initializeGame();
	});
}

function initializeGame() {
	client.homeGrid.loadGrid(playWindow.homeGridStart(), playWindow.adjust(70));
	client.targetGrid.loadGrid(playWindow.targetGridStart(), playWindow.adjust(70));
	for (var i = 0; i < client.fleet.length; i++) {
		var posArray = client.fleet[i].currentPosArray();
		for (var j = 0; j < posArray.length; j++) {
			var xCor = posArray[j].posX;
			var yCor = posArray[j].posY;
			client.homeGrid.field[xCor][yCor].hasShip = true;
			client.homeGrid.field[xCor][yCor].shipIndex = i;
		}
	}
	socket.on(client.id + ' attack made', function(attackData){
		
	});
}
