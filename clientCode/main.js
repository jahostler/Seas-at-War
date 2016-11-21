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
	
	prepWindow.canvas.addEventListener('keypress', onkeydown = function(e) {
		console.log('key pressed: ' + e.keyCode);
		switch(e.keyCode) {
			case 97:
			case 49:
				shipDetails('Scrambler');
				break;
			case 98:
			case 50:
				shipDetails('Scanner');
				break;
			case 99:
			case 51:
				shipDetails('Submarine');
				break;
			case 100:
			case 52:
				shipDetails('Defender');
				break;
			case 101:
			case 53:
				shipDetails('Cruiser');
				break;
			case 102:
			case 54:
				shipDetails('Carrier');
				break;
			case 103:
			case 55:
				shipDetails('Executioner');
				break;
			case 104:
			case 56:
				shipDetails('Artillery');
				break;
			case 13:
				console.log('moving to position select');
				toPositionSelect();
				break;
		}
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
	//monitors keyboard input
	positionWindow.canvas.addEventListener('keypress', onkeydown = function(e) {
		console.log('key pressed');
		console.log(e.keyCode);
		switch (e.keyCode) {
			case 98:
			case 50:
				//select class 2 ship
				console.log(positionWindow.selectShip(0));
				break;
			case 99:
			case 51:
				//select class 3 ship
				console.log(positionWindow.selectShip(1));
				break;
			case 100:
			case 52:
				//select class 4 ship
				console.log(positionWindow.selectShip(2));
				break;
			case 101:
			case 53:
				//select class 5 ship
				console.log(positionWindow.selectShip(3));
				break;
			
			case 37:
				//move selected ship left
				console.log(positionWindow.moveAction('Left'));
				break;
			case 38:
				//move selected ship up
				console.log(positionWindow.moveAction('Up'));
				break;
			case 39:
				//move selected ship right
				console.log(positionWindow.moveAction('Right'));
				break;
			case 40:
				//move selected ship down
				console.log(positionWindow.moveAction('Down'));
				break;
			case 32:
				//rotate selected ship
				console.log(positionWindow.moveAction('Rotate'));
				break;
			case 13:
				//finish
				console.log("ready to start");
				startGameScreen();
				break;
		}
	});
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

function getRandomInt(min, max) {  
	//http://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function repositionAttack(){
	var defX = getRandomInt(0,8);
	var defY = getRandomInt(0,8);
	while(client.homeGrid.field[defX][defY].shipPresent()){
		var defX = getRandomInt(0,8);
		var defY = getRandomInt(0,8);
	}
	return new orderedPair(defX, defY);
}

function findRandomEnemy(){
	var shipPositions = new Array();
	for (var i = 0; i < 9; i++) {
		for (var j = 0; j < 9; j++){
			if(client.homeGrid.field[i][j].hasShip == true && client.homeGrid.field[i][j].shipHit == undefined){
				shipPositions.push(new orderedPair(i,j));
			}
		}
	}
	console.log("shipPositions.length = " + shipPositions.length);
	return shipPositions[getRandomInt(0,shipPositions.length-1)];
	
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
	deflect = false;
	scramble = 0;
	
	
	socket.on(client.id + ' attack made', function(attackData){
		var str = '';
		var scanStr = '';
		var deflectStr = '';
		var counterStr = '';
		var returnData;
		var specialResult = new Array();
		var attackCoordinate = attackData.coordinates[0];
		if (typeof attackCoordinate === "number")
			attackCoordinate = attackData.coordinates[1];
		if (deflect == true && attackData.coordinates[0] != 1) {
			var tempPlace = repositionAttack();
			attackCoordinate = tempPlace;
			if (typeof attackData.coordinates[0] === "number"){
				attackData.coordinates[1] = tempPlace;
			}
			else{
				attackData.coordinates[0] = tempPlace;
			}
			deflect = false;
			deflectStr = 'Enemy defender deflected shot.';
		}
		var specialResult = new Array();
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
				if (client.homeGrid.field[x][y].shipPresent()) {
					scanCount++;
				}
				specialResult.push(client.homeGrid.field[x][y]);
			}
			console.log(specialResult);
			attackData.coordinates = [attackCoordinate];
			if (scanCount == 0)
				scanStr = 'There are no enemy tiles in the area.'
			else if (scanCount == 1)
				scanStr = 'There is 1 enemy tile in the area.'
			else
				scanStr = 'There are ' + scanCount + ' enemy tiles in the area.'
		}
		//Submarine Special
		else if (attackData.coordinates[0] == 3){ 
			
		}
		
		//Defender Special 
		else if (attackData.coordinates[0] == 4){ 
			specialResult = ["deflect"];
			attackData.coordinates = [attackCoordinate];
			console.log(attackData.coordinates);
		}
		
		//Cruiser Special 
		else if (attackData.coordinates[0] == 5) { 
			client.targetGrid.field[attackCoordinate.posX][attackCoordinate.posY].hasShip = true;
			client.targetGrid.field[attackCoordinate.posX][attackCoordinate.posY].shipHit = true;
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
		}
		
		//Executioner Special
		else if (attackData.coordinates[0] == 7){ 
			
		}
		
		// Artillery Special 
		else if (attackData.coordinates[0] == 8) { 
			attackData.coordinates = processSpecialAttack("Artillery", attackCoordinate);
		}
		var updatedTiles = new Array(attackData.coordinates.length);
		for (var i = 0; i < updatedTiles.length; i++) {
			var x = attackData.coordinates[i].posX;
			var y = attackData.coordinates[i].posY;
			client.homeGrid.field[x][y].updateTile();
			updatedTiles[i] = client.homeGrid.field[x][y];
			if (updatedTiles[i].shipHit) {
				str = "hit";
				if (updatedTiles[i].shipIndex == 2) {
					if (client.fleet[2].firstHit) {
						specialResult = client.fleet[2].specialAttack(attackData.ship); //hits cruiser 
					}
				}
				else if(updatedTiles[i].shipIndex == 1) {
					if(client.fleet[1].firstHit){
						specialResult = client.fleet[1].specialAttack(attackData.ship); //hits submarine
						submarineSpecial();
						client.homeGrid.field[x][y].hasShip = true;
						client.homeGrid.field[x][y].shipHit = true;
						client.homeGrid.field[x][y].shipIndex = -1;
						playWindow.draw();
						console.log("Submarine Special");
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
	});
}
