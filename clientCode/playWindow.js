/*
playWindow.js
---------------------
Contains the class that updates the in-game screen as the game progresses.
*/

/*
gameWindow class
---------------------
Holds the player's game canvas, and the visuals/logic to represent the player's graphic interface


canvas- the canvas object, holds the visuals shown to the player on the game window
	scale- scale of canvas
	canvas.width- width of canvas
	canvas.height- height of canvas
	canvas.context- 2d or 3d canvas? 2d for our purposes
	background- background of canvas
	canvas.addEventListener- add function that handles when the user clicks on the game screen
							to determine whether they are clicking on a tile or ship
selectedShip- id of currently selected ship
selectedTile- (x,y) position of currently selected tile
numOfImagesLoaded- number of images currently loaded
-
*/

class gameWindow {
	//constructor needs a player
	constructor(canvas, scale, player) {
		this.scale = scale;
		this.canvas = canvas;
		this.canvas.width = this.adjust(1920);
		this.canvas.height = this.adjust(1080);
		this.context = canvas.getContext('2d');
		this.background = backgrounds[2];
		this.canvas.addEventListener('mousemove', this.getMousePos, false);
		this.canvas.addEventListener('click', this.selectObject, false);
		this.selectedShip = -1;
		this.hoveredShip = -1;
		this.selectedTile = new orderedPair(-1, -1);
		this.hoveredTile = new orderedPair(-1, -1);
		this.numOfImagesLoaded = 0;
		this.targetScrambleIcon = new Image();
		this.targetScrambleIcon.src = 'images/targetScrambleIcon.png';
		this.targetHitIcon = new Image();
		this.targetHitIcon.src = 'images/targetHitIcon.png';
		this.targetMissIcon = new Image();
		this.targetMissIcon.src = 'images/targetMissIcon.png';
		this.homeHitIcon = new Image();
		this.homeHitIcon.src = 'images/homeHitIcon.png';
		this.homeMissIcon = new Image();
		this.homeMissIcon.src = 'images/homeMissIcon.png';
		this.partialVisionIcon = new Image();
		this.partialVisionIcon.src = 'images/highlight.png';
		this.attackType = 'normal';
		this.promptNeeded = false;
		this.specialMessage = '';
		this.specialData = new Array();
		this.turnResult = '';
		this.selectedButton = '';
		this.timerFunction;
		this.timerCount = 30;
		
		this.images = [new Image(), new Image(), new Image(), new Image()];
		for (var i = 0; i < this.images.length; i++) {
			var imageName = (i+2) + client.fleet[i].shipName;
			if (!client.fleet[i].vert) {
				imageName += 'Hor';
			}
			this.images[i].src = 'images/Ships/ship' + imageName + '.png';
			this.images[i].addEventListener('load', this.loadPage, false);
		}
	}
	
	//loads the game window, hiding the fleet positioning window
	loadPage() {
		playWindow.numOfImagesLoaded++;
		if (playWindow.numOfImagesLoaded == 4) {
			playWindow.draw();
			document.getElementById('positionFleet').style.display = 'none';
			document.getElementById('gameWindow').style.display = 'block';
			playWindow.drawButtons();
			playWindow.timerFunction = setInterval(playWindow.drawTimer, 1000);
			socket.on(client.id + ' make update', function(data){
				console.log("Special Data at 0: " + playWindow.specialData[0]);
				var updatedTiles = data.tiles;
				var currentTiles = new Array();
				for (var i = 0; i < updatedTiles.length; i++) {
					currentTiles.push(updatedTiles[i].coordinate);
				}
				enemyFleet = data.enemyShips;
				for (var i = 0; i < updatedTiles.length; i++) {
					var x = updatedTiles[i].corner.posX;
					var y = updatedTiles[i].corner.posY;
					client.targetGrid.field[currentTiles[i].posX][currentTiles[i].posY].hasShip = updatedTiles[i].hasShip;
					client.targetGrid.field[currentTiles[i].posX][currentTiles[i].posY].shipHit = updatedTiles[i].shipHit;
					if(scramble > 0){
						client.targetGrid.field[currentTiles[i].posX][currentTiles[i].posY].scrambled = true;
					}
				}
				if (data.result == "hit") {
					playWindow.turnResult = "You damaged an enemy ship!";
				}
				else if (data.result == "miss") {
					playWindow.turnResult = "Your shot landed in the ocean.";
				}
				else {
					playWindow.turnResult = "You sunk the enemy's " + data.result + "!";
				}
				if (playWindow.specialData.length > 0) {
					if (playWindow.specialData[0] == 'Scan') { //Erase highlighted areas
						playWindow.specialData.splice(0, 1);
						for (var i = 0; i < playWindow.specialData.length; i++) {
							var x = playWindow.specialData[i].posX;
							var y = playWindow.specialData[i].posY;
							client.targetGrid.field[x][y].partialVision = false;
						}
						playWindow.specialData = new Array();
					}
					else if (playWindow.specialData[0] == 'Counter') {
						playWindow.specialMessage = '';
						playWindow.specialData = new Array();
					}
				}
				if (data.scanData != undefined) {
					playWindow.specialMessage = data.scanData;
					playWindow.specialData = new Array();
					playWindow.specialData.push('Scan');
					for (var i = 0; i < data.specialData.length; i++) {
						var x = data.specialData[i].coordinate.posX;
						var y = data.specialData[i].coordinate.posY;
						client.targetGrid.field[x][y].partialVision = true;
						playWindow.specialData.push(new orderedPair(x, y));
					}
				}
				if (data.defelectData != undefined) [
					playWindow.specialMessage = data.defelectData;
				]
				if (data.specialData.length > 0) {
					if (data.specialData[0] == "deflect") {
						deflect = true;
					}
					else if(data.specialData[0] == "scramble") {
						scramble = 3; 
					}
					else if (data.specialData[0] == 5) { //Cruiser Special Attack
						console.log(data.specialData);
						var attackingShip = data.specialData[1];
						var max = client.fleet[attackingShip].length;
						var rand = Math.floor(Math.random() * (max));
						var x = client.fleet[attackingShip].posArray[rand].posX;
						var y = client.fleet[attackingShip].posArray[rand].posY;
						while(client.homeGrid.field[x][y].isShotAt()) {
							rand = Math.floor(Math.random() * (max));
							x = client.fleet[attackingShip].posArray[rand].posX;
							y = client.fleet[attackingShip].posArray[rand].posY;
						}
						client.homeGrid.field[x][y].updateTile();
						playWindow.specialMessage = 'Enemy cruiser counter attacked.';
						var attackData = {
							playerID: client.id,
							coordinates: [5, new orderedPair(x, y)],
							gID: gameID
						}
						socket.emit('turn done', attackData);
						playWindow.specialData.push('Counter');
					}
				}
				else {
					playWindow.specialMessage = '';
				}
				playWindow.disableButtons();
				playWindow.draw();
			});
		}
	}
	
	//adjusts size of window
	adjust(dimension) {
		return dimension * this.scale;
	}
	
	//adds a "Waiting for other player" message to screen when it is not the player's turn
	drawTurnMessage() {
		this.context.font = 'bold 45px Times New Roman';
		this.context.shadowColor = 'transparent';
		this.context.fillStyle = 'red';
		if (client.hasTurn) {
			this.context.fillText('Your Turn', this.adjust(1500), this.adjust(160));
			this.context.font = '20px Times New Roman';
			this.context.fillStyle = 'white';
			this.context.fillText('Select Ship and Tile to attack', this.adjust(1480), this.adjust(195));
		}
		else {
			this.context.fillText('Enemy Turn', this.adjust(1470), this.adjust(160));
			this.context.font = '22px Times New Roman';
			this.context.fillStyle = 'white';
			this.context.fillText('Waiting for other player...', this.adjust(1490), this.adjust(195));
		}
		this.context.fillStyle = 'white';
		this.context.font = '20px Times New Roman';
		this.context.textAlign = 'center';
		this.context.fillText(this.turnResult, this.adjust(1625), this.adjust(290));
		if (this.specialMessage != '') {
			this.context.fillStyle = 'red';
			this.context.font = '20px bold Arial';
			this.context.fillText(this.specialMessage, this.adjust(1625), this.adjust(265));
		}
		this.context.shadowColor = 'black';
		this.context.textAlign = 'start';
	}
	
	drawTimer() {
		if (playWindow.timerCount <= 0) {
			playWindow.timerCount = 1;
			//TODO: end turn
		}
 		if (client.hasTurn) {
			playWindow.timerCount--;
			document.getElementById("timer").innerHTML = playWindow.timerCount + " secs"; 
		}
		else {
			playWindow.timerCount--;
			document.getElementById("timer").innerHTML = playWindow.timerCount + " secs"; 
		}
	}
	
	//adds the buttons to the player window
	drawButtons() {
		var norm = document.getElementById('normalAttack');
		var spec = document.getElementById('specialAttack');
		
		norm.style.left = this.adjust(normalAttackDims[0])+'px';
		norm.style.top = this.adjust(normalAttackDims[1])+'px';
		spec.style.left = this.adjust(specialAttackDims[0])+'px';
		spec.style.top = this.adjust(specialAttackDims[1])+'px';
		norm.addEventListener('click', function(data){
			playWindow.enableButton('normal');
			playWindow.draw();
			playWindow.drawShipSelector(playWindow.selectedShip);
		}, false);
		spec.addEventListener('click', function(data){
			playWindow.enableButton('special');
			playWindow.draw();
			playWindow.drawShipSelector(playWindow.selectedShip);
		}, false);
		this.disableButtons();
	}
	homeGridStart() {
		return new orderedPair(playWindow.adjust(40), playWindow.adjust(30));
	}
	targetGridStart() {
		return new orderedPair(playWindow.adjust(710), playWindow.adjust(30));
	}
	//stores the player's attack, and sends the data to the server
	//afterwards, waits for a server update, then updates the gameWindow with the results of the attack
	moveMade(attackType) {
		//executes turn
		var currentShip = client.fleet[playWindow.selectedShip];
		if (currentShip != undefined) {
			var currentTiles = [playWindow.selectedTile];
			if (attackType == 'special') {
				currentTiles = currentShip.specialAttack(playWindow.selectedTile);
			}
			var attackData = {
				playerID: client.id,
				ship: playWindow.selectedShip,
				coordinates: currentTiles,
				gID: gameID
			};
			socket.emit('turn done', attackData);
			playWindow.timerCount = 30;
			client.hasTurn = false;
		}
	}
	
	
	//if the player hovers on a ship on their home grid, draw selector rectangle around that ship
	//if the player hovers on a tile on their target grid, draw selector around that tile
	getMousePos(evt) {
		if (client.hasTurn) {
			//http://www.html5canvastutorials.com/advanced/html5-canvas-mouse-coordinates/
			var rect = playWindow.canvas.getBoundingClientRect();
			var mousePos = new orderedPair (
											Math.round((evt.clientX-rect.left)/(rect.right-rect.left)*playWindow.canvas.width),
											Math.round((evt.clientY-rect.top)/(rect.bottom-rect.top)*playWindow.canvas.height));
			var result = playWindow.processMousePos(mousePos);
			var gridName = result.grid;
			var gridCoordinate = result.point;
			var x = gridCoordinate.posX;
			var y = gridCoordinate.posY;
			playWindow.hoveredShip = -1;
			playWindow.hoveredTile = new orderedPair(-1, -1);
			if (gridName == 'home') {
				var i = client.homeGrid.field[x][y].shipIndex;
				if (i == -1) {
					playWindow.draw();
				}
				else if (client.fleet[i].alive) {
					playWindow.draw();
					if (i != playWindow.selectedShip) {
						playWindow.hoveredShip = i;
						if (playWindow.hoveredShip != playWindow.selectedShip) {
							playWindow.drawShipSelector(i);
						}
					}
				}
				if (playWindow.selectedShip != -1) {
					playWindow.drawShipSelector(playWindow.selectedShip);
				}
			}
			else if (gridName == 'target') {
				if (!client.targetGrid.field[x][y].isShotAt()) {
					playWindow.draw();
					if (playWindow.selectedShip != -1) {
						playWindow.drawShipSelector(playWindow.selectedShip);
					}
					playWindow.hoveredTile = gridCoordinate;
					playWindow.drawTileSelector(gridCoordinate);
				}
			}
			else {
				playWindow.draw();
				if (playWindow.selectedShip != -1) {
					playWindow.drawShipSelector(playWindow.selectedShip);	
				}
			}
			if (playWindow.promptNeeded) {
				playWindow.drawPrompt();
			}
		}
	}
	
	//check what tile the player has hovered over, based on the mouse's pixel position on the canvas
	processMousePos(posPair){
		var xPair = posPair.posX;
		var yPair = posPair.posY;
		var gridName = 'none';
		if(xPair >= playWindow.adjust(40) && xPair <= playWindow.adjust(670) && yPair >= playWindow.adjust(30) && yPair <= playWindow.adjust(660)){
			//Handle home grid
			xPair = xPair - playWindow.adjust(40);
			switch(true){
				case (xPair <= playWindow.adjust(70)):
					xPair = 0;
					break;
				case (xPair <= playWindow.adjust(140)):
					xPair = 1;
					break;
				case (xPair <= playWindow.adjust(210)):
					xPair = 2;
					break;
				case (xPair <= playWindow.adjust(280)):
					xPair = 3;
					break;
				case (xPair <= playWindow.adjust(350)):
					xPair = 4;
					break;
				case (xPair <= playWindow.adjust(420)):
					xPair = 5;
					break;
				case (xPair <= playWindow.adjust(490)):
					xPair = 6;
					break;
				case (xPair <= playWindow.adjust(560)):
					xPair = 7;
					break;
				case (xPair <= playWindow.adjust(630)):
					xPair = 8;
					break;
			}
			yPair = yPair - playWindow.adjust(30);
			switch(true){
				case (yPair <= playWindow.adjust(70)):
					yPair = 0;
					break;
				case (yPair <= playWindow.adjust(140)):
					yPair = 1;
					break;
				case (yPair <= playWindow.adjust(210)):
					yPair = 2;
					break;
				case (yPair <= playWindow.adjust(280)):
					yPair = 3;
					break;
				case (yPair <= playWindow.adjust(350)):
					yPair = 4;
					break;
				case (yPair <= playWindow.adjust(420)):
					yPair = 5;
					break;
				case (yPair <= playWindow.adjust(490)):
					yPair = 6;
					break;
				case (yPair <= playWindow.adjust(560)):
					yPair = 7;
					break;
				case (yPair <= playWindow.adjust(630)):
					yPair = 8;
					break;
			}
			gridName = 'home';
			//xPair and yPair are now values 0 through 8
			//console.log(gridName + ': (' + xPair + ',' + yPair + ')');
		}
		else if(xPair >= playWindow.adjust(710) && xPair <= playWindow.adjust(1340) && yPair >= playWindow.adjust(30) && yPair <= playWindow.adjust(660)){
			//Handle enemy grid
			xPair = xPair - playWindow.adjust(710);
			switch(true){
				case (xPair <= playWindow.adjust(70)):
					xPair = 0;
					break;
				case (xPair <= playWindow.adjust(140)):
					xPair = 1;
					break;
				case (xPair <= playWindow.adjust(210)):
					xPair = 2;
					break;
				case (xPair <= playWindow.adjust(280)):
					xPair = 3;
					break;
				case (xPair <= playWindow.adjust(350)):
					xPair = 4;
					break;
				case (xPair <= playWindow.adjust(420)):
					xPair = 5;
					break;
				case (xPair <= playWindow.adjust(490)):
					xPair = 6;
					break;
				case (xPair <= playWindow.adjust(560)):
					xPair = 7;
					break;
				case (xPair <= playWindow.adjust(630)):
					xPair = 8;
					break;
			}
			yPair = yPair - playWindow.adjust(30);
			switch(true){
				case (yPair <= playWindow.adjust(70)):
					yPair = 0;
					break;
				case (yPair <= playWindow.adjust(140)):
					yPair = 1;
					break;
				case (yPair <= playWindow.adjust(210)):
					yPair = 2;
					break;
				case (yPair <= playWindow.adjust(280)):
					yPair = 3;
					break;
				case (yPair <= playWindow.adjust(350)):
					yPair = 4;
					break;
				case (yPair <= playWindow.adjust(420)):
					yPair = 5;
					break;
				case (yPair <= playWindow.adjust(490)):
					yPair = 6;
					break;
				case (yPair <= playWindow.adjust(560)):
					yPair = 7;
					break;
				case (yPair <= playWindow.adjust(630)):
					yPair = 8;
					break;
			}
			//xPair and yPair are now values 0 through 8
			gridName = 'target';
			//console.log(gridName + ': (' + xPair + ',' + yPair + ')');
		}
		var returnData = {
			grid: gridName,
			point: new orderedPair(xPair, yPair)
		};
		return returnData;
	}
	
	selectObject(evt) {
		if(client.hasTurn) {
			//http://www.html5canvastutorials.com/advanced/html5-canvas-mouse-coordinates/
			if (playWindow.hoveredShip == -1 && playWindow.selectedShip == -1) {
				playWindow.promptNeeded = true;
				playWindow.drawPrompt();
			}
			else if (playWindow.hoveredShip != -1) {	
				playWindow.promptNeeded = false;
				if (playWindow.selectedShip != playWindow.hoveredShip) {
					playWindow.selectedShip = playWindow.hoveredShip;
					playWindow.selectedTile = new orderedPair(-1, -1);
				}				
				playWindow.enableButton(playWindow.attackType);
			}
			else if (!playWindow.hoveredTile.equals(new orderedPair(-1, -1))) {
				playWindow.selectedTile = playWindow.hoveredTile;
				playWindow.moveMade(playWindow.attackType);
			}
		}
	}
	
	drawPrompt() {
		playWindow.context.font = '26px Arial';
		playWindow.context.fillText('Must select Ship first!', playWindow.adjust(90), playWindow.adjust(810));
	}
	
	//prevents player from firing until appropriate conditions have been met
	disableButtons() {
		document.getElementById('normalAttack').disabled = true;
		document.getElementById('specialAttack').disabled = true;
		playWindow.selectedButton = '';
	}
	
	//enable firing
	enableButton(attack) {
		var index = playWindow.selectedShip;
		var hasSpecial = false;
		if (index != -1) {
			if (client.fleet[index].specialAttacksLeft > 0) {
				hasSpecial = true;
			}
		}
		if (attack == "normal" || !hasSpecial) {
			document.getElementById('normalAttack').disabled = true;
			if (hasSpecial) {
				document.getElementById('specialAttack').disabled = false;
			}
			else {
				document.getElementById('specialAttack').disabled = true;
			}
			playWindow.attackType = 'normal';
			playWindow.selectedButton = 'normalAttack';
		}
		else {
			document.getElementById('normalAttack').disabled = false;
			document.getElementById('specialAttack').disabled = true;
			playWindow.attackType = 'special';
			playWindow.selectedButton = 'specialAttack';
		}
	}
	
	drawButtonSelector(buttonID) {
		if (buttonID != '') {
			var w = playWindow.adjust(document.getElementById(buttonID).offsetWidth + 70);
			var h = playWindow.adjust(document.getElementById(buttonID).offsetHeight + 40);
			playWindow.context.lineWidth='3';
			playWindow.context.strokeStyle='red';
			if (buttonID == 'normalAttack')
				playWindow.context.strokeRect(playWindow.adjust(normalAttackDims[0] - 5), playWindow.adjust(normalAttackDims[1] - 5), w, h);
			else
				playWindow.context.strokeRect(playWindow.adjust(specialAttackDims[0] - 5), playWindow.adjust(specialAttackDims[1] - 5), w, h);
		}
	}
	
	//update the grids with the result of the turn
	drawGrids() {
		for(var i = 0; i < client.homeGrid.field.length; i++) {
			for(var j = 0; j < client.homeGrid.field[i].length; j++) {
				var homeTile = client.homeGrid.field[i][j];
				var targetTile = client.targetGrid.field[i][j];
				if (homeTile.isShotAt()) {
					if (homeTile.shipHit == true) {
						this.context.drawImage(this.homeHitIcon, homeTile.corner.posX, homeTile.corner.posY, this.adjust(70), this.adjust(70));
					}
					else if (homeTile.shipHit == false) {
						this.context.drawImage(this.homeMissIcon, homeTile.corner.posX, homeTile.corner.posY, this.adjust(70), this.adjust(70));
					}
				}
				if (targetTile.isShotAt()) {
					if(targetTile.scrambled && client.fleet[targetTile.shipIndex].alive){
						this.context.drawImage(this.targetScrambleIcon, targetTile.corner.posX, targetTile.corner.posY, this.adjust(70), this.adjust(70));
					}
					else{
						if (targetTile.shipHit == true) {
							this.context.drawImage(this.targetHitIcon, targetTile.corner.posX, targetTile.corner.posY, this.adjust(70), this.adjust(70));
						}
						else if (targetTile.shipHit == false) {
							this.context.drawImage(this.targetMissIcon, targetTile.corner.posX, targetTile.corner.posY, this.adjust(70), this.adjust(70));
						}
					}
					
				}
				if (targetTile.partialVision) {
					this.context.drawImage(this.partialVisionIcon, targetTile.corner.posX, targetTile.corner.posY, this.adjust(70), this.adjust(70));
				}
			}
		}
		//Draw lines through your sunk ships on the home grid
		for (var k = 0; k < client.fleet.length; k++) {
			if (!client.fleet[k].alive) {
				this.context.beginPath();
				var point = client.homeGrid.field[client.fleet[k].mainX][client.fleet[k].mainY];
				var x = point.corner.posX;
				var y = point.corner.posY;
				var length = client.fleet[k].length;
				if (client.fleet[k].vert) {
					this.context.moveTo(x + this.adjust(35), y);
					this.context.lineTo(x + this.adjust(35), y + (this.adjust(70) * length));
				}
				else {
					this.context.moveTo(x, y + this.adjust(35));
					this.context.lineTo(x + (this.adjust(70) * length), y + this.adjust(35));
				}
				this.context.lineWidth = '5';
				this.context.strokeStyle = 'red';
				this.context.stroke();
				this.context.closePath();
			}
		}
		//Draw lines through sunk enemy ships on the target grid to let player know they sunk a ship
		for (var c = 0; c < enemyFleet.length; c++) {
			if (enemyFleet[c] != null) {
				this.context.beginPath();
				var point = client.targetGrid.field[enemyFleet[c].mainX][enemyFleet[c].mainY];
				var x = point.corner.posX;
				var y = point.corner.posY;
				var length = enemyFleet[c].length;
				if (enemyFleet[c].vert) {
					this.context.moveTo(x + this.adjust(35), y);
					this.context.lineTo(x + this.adjust(35), y + (this.adjust(70) * length));
				}
				else {
					this.context.moveTo(x, y + this.adjust(35));
					this.context.lineTo(x + (this.adjust(70) * length), y + this.adjust(35));
				}
				this.context.lineWidth = '5';
				this.context.strokeStyle = 'lime';
				this.context.stroke();
				this.context.closePath();
			}
		}
	}
	
	//draw red rectangle around selected ship
	drawShipSelector(shipIndex) {
		var currentShip = client.fleet[shipIndex];
		var drawPoint = client.homeGrid.field[currentShip.mainX][currentShip.mainY].corner;
		var selectorW = playWindow.adjust(playWindow.images[shipIndex].width);
		var selectorH = playWindow.adjust(playWindow.images[shipIndex].height);
		playWindow.context.lineWidth='3';
		playWindow.context.strokeStyle='red';
		playWindow.context.strokeRect(drawPoint.posX, drawPoint.posY, selectorW, selectorH);
	}
	
	//draw red rectangle around selected tile
	drawTileSelector(gridCoordinate) {
		var drawPoint = client.targetGrid.field[gridCoordinate.posX][gridCoordinate.posY].corner;
		var dimension = playWindow.adjust(70);
		playWindow.context.lineWidth='3';
		playWindow.context.strokeStyle='red';
		playWindow.context.strokeRect(drawPoint.posX, drawPoint.posY, dimension, dimension);
	}
	
	draw() {
		this.context.drawImage(this.background, 0, 0, this.adjust(this.background.width), this.adjust(this.background.height));
		this.context.font = 'bold 32px Arial';
		this.context.fillStyle = 'white';
		this.context.shadowColor = 'black';
		this.context.shadowOffsetX = 3;
		this.context.shadowOffsetY = 3;
		for (var i = 0; i < this.images.length; i++) {
			this.context.drawImage(this.images[i], this.adjust(client.fleet[i].mainX * 70 + 40), this.adjust(client.fleet[i].mainY * 70 + 30), this.adjust(this.images[i].width), this.adjust(this.images[i].height));				
		}
		this.context.fillText('Turn', this.adjust(1575), this.adjust(75));
		this.context.fillText('Timer', this.adjust(1560), this.adjust(435));
		this.context.fillText('Chat', this.adjust(1320), this.adjust(750));
		this.drawGrids();
		this.drawTurnMessage();
		this.drawButtonSelector(this.selectedButton);
	}
}