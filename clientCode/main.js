/*
main.js
---------------------
Responsible for creating client's game, receiving events from the server

*/

var client = new Player();
var enemyFleet = new Array(4);
var gameID = -1;
var prepWindow = -1;
var positionWindow = -1;
var playWindow = -1;
var socket = io.connect();
var scaling = .8;
var backgrounds;
var shipImages = new Map();
var shipDesDims;
var finishFleetDims;
var finishShipSelectDims;
var normalAttackDims;
var specialAttackDims;
var buildButtonDims;
var selectButtonDims;
var moveButtonDims;
var deflect;
var scramble;

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
	shipImages.set('temp2', new Image());
	shipImages.get('temp2').src = 'images/Ships/ship2temp.png';
	shipImages.set('temp3', new Image());
	shipImages.get('temp3').src = 'images/Ships/ship3temp.png';
	shipImages.set('temp4', new Image());
	shipImages.get('temp4').src = 'images/Ships/ship4temp.png';
	shipImages.set('temp5', new Image());
	shipImages.get('temp5').src = 'images/Ships/ship5temp.png';
	
	//load in verical Ship Images
	shipImages.set('Scrambler', new Image());
	shipImages.get('Scrambler').src = 'images/Ships/ship2Scrambler.png';
	shipImages.set('Scanner', new Image());
	shipImages.get('Scanner').src = 'images/Ships/ship2Scanner.png';
	shipImages.set('Submarine', new Image());
	shipImages.get('Submarine').src = 'images/Ships/ship3Submarine.png';
	shipImages.set('Defender', new Image());
	shipImages.get('Defender').src = 'images/Ships/ship3Defender.png';
	shipImages.set('Cruiser', new Image());
	shipImages.get('Cruiser').src = 'images/Ships/ship4Cruiser.png';
	shipImages.set('Carrier', new Image());
	shipImages.get('Carrier').src = 'images/Ships/ship4Carrier.png';
	shipImages.set('Executioner', new Image());
	shipImages.get('Executioner').src = 'images/Ships/ship5Executioner.png';
	shipImages.set('Artillery', new Image());
	shipImages.get('Artillery').src = 'images/Ships/ship5Artillery.png';
	
	//load in horizontal Ship Images
	shipImages.set('ScramblerHor', new Image());
	shipImages.get('ScramblerHor').src = 'images/Ships/ship2ScramblerHor.png';
	shipImages.set('ScannerHor', new Image());
	shipImages.get('ScannerHor').src = 'images/Ships/ship2ScannerHor.png';
	shipImages.set('SubmarineHor', new Image());
	shipImages.get('SubmarineHor').src = 'images/Ships/ship3SubmarineHor.png';
	shipImages.set('DefenderHor', new Image());
	shipImages.get('DefenderHor').src = 'images/Ships/ship3DefenderHor.png';
	shipImages.set('CruiserHor', new Image());
	shipImages.get('CruiserHor').src = 'images/Ships/ship4CruiserHor.png';
	shipImages.set('CarrierHor', new Image());
	shipImages.get('CarrierHor').src = 'images/Ships/ship4CarrierHor.png';
	shipImages.set('ExecutionerHor', new Image());
	shipImages.get('ExecutionerHor').src = 'images/Ships/ship5ExecutionerHor.png';
	shipImages.set('ArtilleryHor', new Image());
	shipImages.get('ArtilleryHor').src = 'images/Ships/ship5ArtilleryHor.png';
	
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
	
	//get initial placement of ship descriptions, so they can be moved later
	shipDesDims = new Array(2);
	document.getElementsByClassName('shipDes')[0].style.display = 'block';
	shipDesDims[0] = document.getElementsByClassName('shipDes')[0].offsetLeft
	shipDesDims[1] = document.getElementsByClassName('shipDes')[0].offsetTop
	document.getElementsByClassName('shipDes')[0].style.display = 'none';
	
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
		socket.off(client.id + ' gameID created');
	});
	socket.on(client.id + ' join success', function(data) {
		document.getElementById('hostGame').style.display = 'none';
		document.getElementById('buildAFleet').style.display = 'block';
		socket.off(client.id + ' join success');
		loadGame();
	});
}

//inform the server that the game should be deleted, and disable all gameplay windows
function removeGame() {
	//todo:  add formal message telling client other player disconnected
	socket.emit('delete game', gameID);
	client.fleet = ['temp2', 'temp3', 'temp4', 'temp5'];
	enemyFleet = new Array(4);
	client.clearGrids();
	socket.off(gameID + ' player disconnect');	
	gameID = -1;
	prepWindow = -1;
	positionWindow = -1;
	playWindow = -1;
}

//create a new gameplay window
function loadGame() {
	console.log("Your game ID is " + gameID);
	prepWindow = new buildAFleetWindow(document.getElementById('buildCanvas'), scaling); //todo: fix scaling of buttons
	socket.on(gameID + ' player disconnect', function(data){
		//todo:  add formal message telling client other player disconnected
		var divs = document.getElementsByTagName('div');
		for(var i = 0; i < divs.length; i++) {
			divs[i].style.display = 'none';
		}
		document.getElementById('playerDisconnectMessage').style.display = 'block';
		prepWindow.cleanUp();
		removeGame();
	});
	prepWindow.draw();
	prepWindow.drawButtons();
}

//gets the data associated with a ship
//data includes a description of ship's ability, as well as images
function shipDetails(shipName, shipIndex) {
	var index = -1;
	var descriptions = document.getElementsByClassName('shipDes');
	var ships = ['Scrambler', 'Scanner', 'Submarine', 'Defender', 'Cruiser', 'Carrier', 'Executioner', 'Artillery'];
	
	if (client.fleet[shipIndex] != shipName || prepWindow.firstSelect[shipIndex]) {
		prepWindow.images[shipIndex] = shipImages.get(shipName);
		prepWindow.draw();
		index = ships.indexOf(shipName);
		client.fleet[shipIndex] = shipName
		var altShipName;
		if (index % 2 == 0)
			altShipName = ships[index+1].toLowerCase() + 'Des';
		else
			altShipName = ships[index-1].toLowerCase() + 'Des';
		
		document.getElementById(shipName.toLowerCase() + 'Des').disabled = true;
		document.getElementById(altShipName).disabled = false;
		
		if (prepWindow.currentShipDes != -1)
			descriptions[prepWindow.currentShipDes].style.display = 'none';
		prepWindow.currentShipDes = index;
		descriptions[index].style.display = 'block';
		descriptions[index].style.left = prepWindow.divX + 'px';
		descriptions[index].style.top = prepWindow.divY + 'px';
		prepWindow.firstSelect[shipIndex] = false;
	}
}

function loadPositionSelect() {
	positionWindow.drawButtons();
	positionWindow.draw();
}

//transition from fleet selection to fleet positioning window
function toPositionSelect() {
	for (var i = 0; i < client.fleet.length; i++) {
		if (client.fleet[i].substring(0, 4) == 'temp') {
			switch(i) {
				case 0:
					client.fleet[i] = 'Scrambler';
					break;
				case 1:
					client.fleet[i] = 'Submarine';
					break;
				case 2:
					client.fleet[i] = 'Cruiser';
					break;
				case 3:
					client.fleet[i] = 'Executioner';
					break;
			}
		}
	}
	document.getElementById('buildAFleet').style.display = 'none';
	document.getElementById('positionFleet').style.display = 'block';
	prepWindow.cleanUp();
	prepWindow = -1;
	positionWindow = new fleetPositionWindow(document.getElementById('positionCanvas'), scaling)
	socket.off(gameID + ' player disconnect');
	socket.on(gameID + ' player disconnect', function(data){
		//todo:  add formal message telling client other player disconnected
		var divs = document.getElementsByTagName('div');
		for(var i = 0; i < divs.length; i++) {
			divs[i].style.display = 'none';
		}
		document.getElementById('playerDisconnectMessage').style.display = 'block';
		positionWindow.cleanUp();
		removeGame();
	});
	loadPositionSelect();
}

//inform server that this client has completed ship positioning, and is ready to begin game
//once server emits a ready event (i.e. both players are ready), begins game
//server randomly assigns a player to go first
function startGameScreen() {
	socket.emit('fleet finished', {gID: gameID, playerID: client.id});
	positionWindow.waitMessage();
	document.removeEventListener('keydown', positionWindow.moveShips);
	socket.on(gameID + ' ready', function(data) {
		if (data == client.id) {
			client.hasTurn = true;
		}
		playWindow = new gameWindow(document.getElementById('gameCanvas'), scaling, client);
		socket.off(gameID + ' ready');
		positionWindow.cleanUp();
		positionWindow = -1;
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

function getRandomInt(min, max) {  
	//http://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function repositionAttack(){
	var defX = getRandomInt(0,8);
	var defY = getRandomInt(0,8);
	while(client.homeGrid[defX][defY].shipPresent()){
		var defX = getRandomInt(0,8);
		var defY = getRandomInt(0,8);
	}
	return new orderedPair(defX, defY);
}

function findRandomEnemy(){
	var shipPositions = new Array();
	for (var i = 0; i < 9; i++) {
		for (var j = 0; j < 9; j++){
			if(client.homeGrid[i][j].hasShip == true && client.homeGrid[i][j].shipHit == undefined){
				shipPositions.push(new orderedPair(i,j));
			}
		}
	}
	return shipPositions[getRandomInt(0,shipPositions.length-1)];
}

//loads graphics for playing the game, and listens for game updates (such as a tile being attacked or the game ending)
function initializeGame() {
	for (var i = 0; i < client.fleet.length; i++) {
		var posArray = client.fleet[i].currentPosArray();
		for (var j = 0; j < posArray.length; j++) {
			var xCor = posArray[j].posX;
			var yCor = posArray[j].posY;
			client.homeGrid[xCor][yCor].hasShip = true;
			client.homeGrid[xCor][yCor].shipIndex = i;
		}
	}
	deflect = false;
	scramble = 0;
	socket.on(client.id + ' attack made', function(attackData){
		var str = '';
		var scanStr = '';
		var deflectStr = '';
		var counterStr = '';
		var returnData;
		var specialResult = new Array();
		var scanResult = new Array();
		var attackCoordinate = attackData.coordinates[0];
		if (typeof attackCoordinate === "number")
			attackCoordinate = attackData.coordinates[1];
		if (deflect == true && attackData.coordinates[0] != 1) {
			var tempPlace = repositionAttack();
			console.log("original");
			console.log(attackCoordinate);
			attackCoordinate = tempPlace;
			console.log("new");
			console.log(attackCoordinate);
			if (typeof attackData.coordinates[0] === "number"){
				attackData.coordinates[1] = tempPlace;
			}
			else{
				attackData.coordinates[0] = tempPlace;
			}
			deflect = false;
			deflectStr = 'Enemy defender deflected shot.';
		}
		
		//Scrambler Special 
		if (attackData.coordinates[0] == 1){
			scramble = 3;
			attackData.coordinates = new Array();
			specialResult = ["scramble"];
			str = 'jammed';
		}
		
		//Scanner Special
		else if (attackData.coordinates[0] == 2) {	
			var scanArray = processSpecialAttack('Scanner', attackCoordinate);
			var scanCount = 0;
			for (var i = 0; i < scanArray.length; i++) {
				var x = scanArray[i].posX;
				var y = scanArray[i].posY;
				if (client.homeGrid[x][y].shipPresent()) {
					scanCount++;
				}
				scanResult.push(client.homeGrid[x][y]);
			}
			attackData.coordinates = [attackCoordinate];
			if (scanCount == 0)
				scanStr = 'There are no enemy tiles in the area.'
			else if (scanCount == 1)
				scanStr = 'There is 1 enemy tile in the area.'
			else
				scanStr = 'There are ' + scanCount + ' enemy tiles in the area.'
		}
		
		//Defender Special 
		else if (attackData.coordinates[0] == 4){ 
			specialResult = ["deflect"];
			attackData.coordinates = [attackCoordinate];
			console.log(attackData.coordinates);
		}
		
		//Cruiser Special 
		else if (attackData.coordinates[0] == 5) { 
			client.targetGrid[attackCoordinate.posX][attackCoordinate.posY].hasShip = true;
			client.targetGrid[attackCoordinate.posX][attackCoordinate.posY].shipHit = true;
			if (attackData.deadShips != undefined) {
				enemyFleet = attackData.deadShips;
				playWindow.turnResult = "You sunk the enemy's " + attackData.result + "!";
			}
			playWindow.draw();
			return;
		}
		
		//Carrier Special 
		else if (attackData.coordinates[0] == 6){ 
			attackData.coordinates = new Array();
			specialResult = ["detect", findRandomEnemy()];
			str = "detected";
		}
		
		//Executioner Special
		else if (attackData.coordinates[0] == 7){ 
			var attackInPartial = false;
			var smallestLength = 6;
			var smallestShip = -1;
			if (attackData.coordinates.length == 4) {
				var partialTiles = attackData.coordinates[3];
				for (var i = 0; i < partialTiles.length; i++) {
					var x = partialTiles[i].posX;
					var y = partialTiles[i].posY;
					var selectedShip = client.homeGrid[x][y].shipIndex;
					if (selectedShip != -1) {
						if (client.fleet[selectedShip].length < smallestLength) {
							smallestLength = client.fleet[selectedShip].length;
							smallestShip = selectedShip 
						}
					}
					if (attackCoordinate.posX == x && attackCoordinate.posY == y) {
						attackInPartial = true;
					}
				}
			}
			if (smallestShip == -1 || !attackInPartial) {
				var x = attackCoordinate.posX;
				var y = attackCoordinate.posY;
				if (client.homeGrid[x][y].shipIndex != -1) {	//Destroy entire ship at the single point
					smallestShip = client.homeGrid[x][y].shipIndex;
					attackData.coordinates = client.fleet[smallestShip].posArray
				}
				else {
					attackData.coordinates = [attackCoordinate]; //Missed shot
				}
			}
			else if (attackInPartial) { //Destroy smallest ship in scanned area
				attackData.coordinates = client.fleet[smallestShip].posArray;
			}
			playWindow.specialMessage = 'Enemy executioner fired killing blow.';
		}
		
		// Artillery Special 
		else if (attackData.coordinates[0] == 8) { 
			attackData.coordinates = processSpecialAttack("Artillery", attackCoordinate);
		}
		var updatedTiles = new Array(attackData.coordinates.length);
		var cruiserSpecial = false;
		var subSpecial = false;
		for (var i = 0; i < updatedTiles.length; i++) {
			var x = attackData.coordinates[i].posX;
			var y = attackData.coordinates[i].posY;
			client.homeGrid[x][y].updateTile();
			updatedTiles[i] = client.homeGrid[x][y];
			if (updatedTiles[i].shipHit) {
				str = "hit";
				if (updatedTiles[i].shipIndex == 2) {
					if (client.fleet[2].firstHit) {
						 cruiserSpecial = true;
					}
				}
				else if(updatedTiles[i].shipIndex == 1) {
					if(client.fleet[1].firstHit){
						subSpecial = true;
					}
				}
			}
			else if (str != "hit")
				str = "miss";
		}
		var sunkShips = new Array(4);
		for (var i = 0; i < client.fleet.length; i++) {
			if (client.fleet[i].updateAlive())
				str = client.fleet[i].shipName;
			if (!client.fleet[i].alive) {
				sunkShips[i] = client.fleet[i];
			}
		}
		if (cruiserSpecial && client.fleet[2].alive) {
			specialResult = client.fleet[2].specialAttack(attackData.ship); //hits cruiser
		}
		if (subSpecial && client.fleet[1].alive) {
			specialResult = client.fleet[1].specialAttack(attackData.ship); //hits submarine
			client.homeGrid[x][y].hasShip = true;
			client.homeGrid[x][y].shipHit = true;
			client.homeGrid[x][y].shipIndex = -1;
			playWindow.draw();
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
			returnData.scanArray = scanResult;
		}
		if (deflectStr != '') {
			returnData.defelectData = deflectStr;
		}
		returnData.specialData = specialResult;
		socket.emit('game updated', returnData);
		client.hasTurn = true;
		playWindow.draw();
		playWindow.hoveredTile = new orderedPair(-1, -1);
		if (isGameOver()) {
			client.hasTurn = false;
			playWindow.disableButtons();
			socket.emit('game over', {gID: gameID, playerID: client.id});
			document.getElementById('gameOverMessageLose').innerHTML = 'You Lose!';
			document.getElementById('gameOverLose').style.display = 'block';
			document.getElementById('gameWindow').style.display = 'none';
			playWindow.cleanUp();
			removeGame();
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
		document.getElementById('gameOverMessageWin').innerHTML = 'You Win!';
		document.getElementById('gameOverWin').style.display = 'block';
		document.getElementById('gameWindow').style.display = 'none';
		playWindow.cleanUp();
		removeGame();
	});
	socket.off(gameID + ' player disconnect');
	socket.on(gameID + ' player disconnect', function(data){
		//todo:  add formal message telling client other player disconnected
		var divs = document.getElementsByTagName('div');
		for(var i = 0; i < divs.length; i++) {
			divs[i].style.display = 'none';
		}
		document.getElementById('playerDisconnectMessage').style.display = 'block';
		playWindow.cleanUp();
		removeGame();
	});
}
