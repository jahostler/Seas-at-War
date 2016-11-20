/*
main.js
---------------------
Responsible for creating client's game, receiving events from the server

*/

var client = new Player();
var enemyFleet = new Array(4);
var gameID = -1;
var prepWindow;
var positionWindow;
var playWindow;
var socket = io.connect();
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

//creates the game interface, and initializes client-side data
function initialize() {
	//scale instruction images
	var instructImages = document.getElementsByClassName('instructImg');
	var instructImgDims = [instructImages[0].width * 0.9, instructImages[0].height * 0.9];
	for (var i = 0; i < instructImages.length; i++) {
		instructImages[i].style.width = instructImgDims[0] + 'px';
		instructImages[i].style.height = instructImgDims[1] + 'px';
	}
	
	//load in background images
	backgrounds = [new Image(), new Image(), new Image()];
	backgrounds[0].src = 'images/shipSelect.png';
	backgrounds[1].src = 'images/shipSelect.png';
	backgrounds[2].src = 'images/gameBoard.png';
	
	//load in Temporary Ship Images
	tempImages = [new Image(), new Image(), new Image(), new Image()];
	tempImages[0].src = 'images/Ships/ship2temp.png';
	tempImages[1].src = 'images/Ships/ship3temp.png';
	tempImages[2].src = 'images/Ships/ship4temp.png';
	tempImages[3].src = 'images/Ships/ship5temp.png';
	
	//get initial placement of buttons and save positions, so they can be scaled later
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
	
	//Hide all screens except main menu screen
	var divs = document.getElementsByTagName('div');
	for(var i = 0; i < divs.length; i++) {
		divs[i].style.display = 'none';
	}
	document.getElementById('mainMenu').style.display = 'block';
}

//on receiving a welcome event from server, get playerid from server
//send confirmation back to server
socket.on('welcome', function(data) {
	console.log("Your player ID is " + data);
	client.id = data;
	socket.emit('new player created', client.id);
});

//on receiving a disconnect event from server, hide all gameplay windows and display a disconnection message
socket.on('disconnect', function(data) {
	//todo:  add formal message telling client server disconnected
	var divs = document.getElementsByTagName('div');
	for(var i = 0; i < divs.length; i++) {
		divs[i].style.display = 'none';
	}
	document.getElementById('serverDisconnectMessage').style.display = 'block';
});

//send a new game event to the server
//once the server sends back the appropriate game creation event, create the game
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

//informt the server that the game should be deleted, and disable all gameplay windows
function removeGame() {
	socket.emit('delete game', gameID);
	client.fleet = ["Scrambler", "Submarine", "Cruiser", "Executioner"];
	var buttons = document.getElementById('positionFleet').querySelectorAll('button');
	[].forEach.call(buttons, function(element) {
		element.disabled = false;
	});
	gameID = -1;
	socket.off(client.id + ' make update');
}

//create a new gameplay window
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

//gets the data associated with a ship
//data includes a description of ship's ability, as well as images
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
				client.fleet[0].specialAttacksLeft = 2;
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
				document.getElementById('defenderDes').disabled = false;
			}
			break;
		case "Defender":
			index = 3;
			if (prepWindow.class3.src != 'images/Ships/ship3Defender.png') {
				prepWindow.class3.src = 'images/Ships/ship3Defender.png';
				positionWindow.class3.src = 'images/Ships/ship3Defender.png';
				positionWindow.class3Hor.src = 'images/Ships/ship3DefenderHor.png';
				prepWindow.class3.addEventListener('load', prepWindow.draw.bind(prepWindow));
				client.fleet[1] = "Defender";
				client.fleet[0].specialAttacksLeft = 3;
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

//transition from fleet selection to fleet positioning window
function toPositionSelect() {
	document.getElementById('buildAFleet').style.display = 'none';
	document.getElementById('positionFleet').style.display = 'block';
	loadPositionSelect();
}

//inform server that this client has completed ship positioning, and is ready to begin game
//once server emits a ready event (i.e. both players are ready), begins game
//server randomly assigns a player to go first
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

//checks if all of the player's ships have been sunk, returning a boolean value
function isGameOver() {
	for (var i = 0; i < client.fleet.length; i++) {
		if (client.fleet[i].alive) {
			return false;
		}
	}
	return true;
}

//loads graphics for playing the game, and listens for game updates (such as a tile being attacked or the game ending)
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
		var str = '';
		var scanStr = '';
		var returnData;
		var attackCoordinate = attackData.coordinates[0];
		var specialResult = new Array();
		if (attackCoordinate == 2) {	//Scanner Special
			attackCoordinate = attackData.coordinates[1];
			var scanArray = processSpecialAttack('Scanner', attackCoordinate);
			var scanCount = 0;
			for (var i = 0; i < scanArray.length; i++) {
				var x = scanArray[i].posX;
				var y = scanArray[i].posY;
				if (client.homeGrid.field[x][y].shipPresent()) {
					scanCount++;
				}
				specialResult.push(client.homeGrid.field[x][y]);
			}
			attackData.coordinates = [attackCoordinate];
			if (scanCount == 0)
				scanStr = 'There are no enemy tiles in the area.'
			else if (scanCount == 1)
				scanStr = 'There is 1 enemy tile in the area.'
			else
				scanStr = 'There are ' + scanCount + ' enemy tiles in the area.'
		}
		else if (attackCoordinate == 5) {
			attackCoordinate = attackData.coordinates[1];
		}
		else if (attackCoordinate == 8) {
			attackCoordinate = attackData.coordinates[1];
			attackData.coordinates = processSpecialAttack("Artillery", attackCoordinate);
		}
		var updatedTiles = new Array(attackData.coordinates.length);
		for (var i = 0; i < updatedTiles.length; i++) {
			var x = attackData.coordinates[i].posX;
			var y = attackData.coordinates[i].posY;
			client.homeGrid.field[x][y].updateTile();
			updatedTiles[i] = client.homeGrid.field[x][y];
			if (updatedTiles[i].shipHit)
				str = "hit";
			else if (str != "hit") {
				str = "miss";
			}
		}
		var sunkShips = new Array(4);
		for (var i = 0; i < client.fleet.length; i++) {
			if (client.fleet[i].updateAlive())
				str = client.fleet[i].shipName;
			if (!client.fleet[i].alive) {
				sunkShips[i] = client.fleet[i];
			}
		}
		returnData = {
			tiles: updatedTiles,
			enemyShips: sunkShips,
			gID: gameID,
			playerID: client.id,
			result: str
		};
		if (scanStr != '') {
			returnData.scanData = scanStr;
		}
		if (specialResult.length > 0) {
			returnData.specialData = specialResult;
		}
		socket.emit('game updated', returnData);
		client.hasTurn = true;
		playWindow.draw();
		playWindow.hoveredTile = new orderedPair(-1, -1);
		if (isGameOver()) {
			client.hasTurn = false;
			playWindow.disableButtons();
			socket.emit('game over', {gID: gameID, playerID: client.id});
			document.getElementById('gameOverMessage').innerHTML = 'You Lose!';
			document.getElementById('gameOver').style.display = 'block';
			document.getElementById('gameWindow').style.display = 'none';
		}
		else {
			if (playWindow.selectedShip != -1) {
				if (client.fleet[playWindow.selectedShip].alive) {
					playWindow.enableButton('normal');
					playWindow.drawButtonSelector(playWindow.selectedButton);
					playWindow.drawShipSelector(playWindow.selectedShip);
				}
				else {
					playWindow.selectedShip = -1;
				}
			}
			playWindow.timerCount = 30;
		}
	});
	socket.on(client.id + 'end game', function(data){
		client.hasTurn = false;
		playWindow.disableButtons();
		document.getElementById('gameOverMessage').innerHTML = 'You Win!';
		document.getElementById('gameOver').style.display = 'block';
		document.getElementById('gameWindow').style.display = 'none';
	});
}
