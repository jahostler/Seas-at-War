class Player {
    constructor() {
        this.homeGrid = new Grid();
		this.targetGrid = new Grid();
		this.id = -1;
        this.fleet = ["Scrambler", "Submarine", "Cruiser", "Executioner"];
		this.hasTurn = false;
    }
}

class gameWindow {
	//constructor needs a player
	constructor(canvas, scale, player) {
		this.scale = scale;
		this.canvas = canvas;
		this.canvas.width = this.adjust(1920);
		this.canvas.height = this.adjust(1080);
		this.context = canvas.getContext('2d');
		this.background = backgrounds[2];
		this.canvas.addEventListener('click', this.getMousePos, false);
		this.selectedShip = -1;
		this.selectedTile = new orderedPair(-1, -1);
		this.numOfImagesLoaded = 0;
		this.targetHitIcon = new Image();
		this.targetHitIcon.src = 'images/targetHitIcon.png';
		this.targetMissIcon = new Image();
		this.targetMissIcon.src = 'images/targetMissIcon.png';
		this.homeHitIcon = new Image();
		this.homeHitIcon.src = 'images/homeHitIcon.png';
		this.homeMissIcon = new Image();
		this.homeMissIcon.src = 'images/homeMissIcon.png';
		this.turnMessage;
		
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
	
	adjust(dimension) {
		return dimension * this.scale;
	}
	
	drawTurnMessage() {
		this.context.font = 'bold 45px Times New Roman';
		this.context.fillStyle = 'red';
		if (client.hasTurn) {
			this.context.fillText("Your Turn", this.adjust(1500), this.adjust(190));
			this.context.font = '20px Times Arial';
			this.context.fillStyle = 'white';
			this.context.fillText("Select Ship and Tile to attack", this.adjust(1480), this.adjust(235));
		}
		else {
			this.context.fillText("Enemy Turn", this.adjust(1470), this.adjust(210));
		}
	}
	
	
	drawButtons() {
		var norm = document.getElementById('normalAttack');
		var spec = document.getElementById('specialAttack');
		
		norm.style.left = this.adjust(normalAttackDims[0])+"px";
		norm.style.top = this.adjust(normalAttackDims[1])+"px";
		spec.style.left = this.adjust(specialAttackDims[0])+"px";
		spec.style.top = this.adjust(specialAttackDims[1])+"px";
		norm.addEventListener('click', playWindow.moveMade("normal"), false);
		spec.addEventListener('click', playWindow.moveMade("special"), false);
		this.disableButtons();
	}
	homeGridStart() {
		return new orderedPair(playWindow.adjust(40), playWindow.adjust(30));
	}
	targetGridStart() {
		return new orderedPair(playWindow.adjust(710), playWindow.adjust(30));
	}
	moveMade(attackType) {
		//executes turn
		var currentShip = client.fleet[playWindow.selectedShip];
		console.log(currentShip);
		var currentTiles = [playWindow.selectedTile];
		console.log(currentShip);
		var attackData = {
			playerID: client.id,
			ship: currentShip,
			coordinates: currentTiles,
			gID: gameID;
		};
		socket.emit("Turn done", attackData);
	}
	
	getMousePos(evt) {
		if (client.hasTurn) {
			var rect = playWindow.canvas.getBoundingClientRect();
			var mousePos = new orderedPair (
											Math.round((evt.clientX-rect.left)/(rect.right-rect.left)*playWindow.canvas.width),
											Math.round((evt.clientY-rect.top)/(rect.bottom-rect.top)*playWindow.canvas.height));
			playWindow.processClick(mousePos);
		}
	}
	
	loadPage() {
		playWindow.numOfImagesLoaded++;
		if (playWindow.numOfImagesLoaded == 4) {
			playWindow.draw();
			document.getElementById('positionFleet').style.display = 'none';
			document.getElementById('gameWindow').style.display = 'block';
			playWindow.drawButtons();
		}
	}
	
	processClick(posPair){
		var xPair = posPair.posX;
		var yPair = posPair.posY;
		var gridName = "none";
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
			gridName = "home";
			//xPair and yPair are now values 0 through 8
			console.log(gridName + ": (" + xPair + "," + yPair + ")");
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
			gridName = "target";
			console.log(gridName + ": (" + xPair + "," + yPair + ")");
		}
		if (gridName != "none") {
			var gridCoordinate = new orderedPair(xPair, yPair);
			if (gridName == "home") {
				for(var i = 0; i < client.fleet.length; i++) {
					var element = client.fleet[i];
					if (element.containsPoint(gridCoordinate) && i != playWindow.selectedShip) {
						playWindow.draw();
						playWindow.drawShipSelector(i);
						playWindow.selectedTile = new orderedPair(-1,-1);
						playWindow.disableButtons();
						break;
					}
				}
			}
			else {
				if (playWindow.selectedShip != -1) {
					playWindow.draw();
					playWindow.drawShipSelector(playWindow.selectedShip);
					playWindow.drawTileSelector(gridCoordinate);
					playWindow.selectedTile = gridCoordinate;
					playWindow.enableButtons();
				}
				else {
					playWindow.draw();
					this.context.font = '26px Arial';
					playWindow.context.fillText("Must select Ship first!", this.adjust(90), this.adjust(810));
					
				}
			}
		}
	}
	
	disableButtons() {
		document.getElementById('normalAttack').disabled = true;
		document.getElementById('specialAttack').disabled = true;
	}
	
	enableButtons() {
		document.getElementById('normalAttack').disabled = false;
		//document.getElementById('specialAttack').disabled = false;	//todo:  implement special attacks
	}
	
	drawShipSelector(shipIndex) {
		var currentShip = client.fleet[shipIndex];
		var drawPoint = client.homeGrid.field[currentShip.mainX][currentShip.mainY].corner;
		var selectorW = playWindow.adjust(playWindow.images[shipIndex].width);
		var selectorH = playWindow.adjust(playWindow.images[shipIndex].height);
		playWindow.selectedShip = shipIndex;
		playWindow.context.lineWidth="3";
		playWindow.context.strokeStyle="red";
		playWindow.context.strokeRect(drawPoint.posX, drawPoint.posY, selectorW, selectorH);
	}
	
	drawTileSelector(gridCoordinate) {
		var drawPoint = client.targetGrid.field[gridCoordinate.posX][gridCoordinate.posY].corner;
		var dimension = playWindow.adjust(70);
		playWindow.context.lineWidth="3";
		playWindow.context.strokeStyle="red";
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
		this.drawTurnMessage();
	}
}

class buildAFleetWindow {
	constructor(canvas, scale) {
		this.scale = scale;
		this.canvas = canvas;
		this.canvas.width = this.adjust(1920);
		this.canvas.height = this.adjust(1080);
		this.context = canvas.getContext('2d');
		this.background = backgrounds[0];
		this.class2 = tempImages[0];
		this.class3 = tempImages[1];
		this.class4 = tempImages[2];
		this.class5 = tempImages[3];
		this.buildButtons = document.getElementsByClassName('buildButton');
		this.divX = -1;
		this.divY = -1;
	}
	adjust(dimension) {
		return dimension * this.scale;
	}
	drawButtons() {
		document.getElementById('finishShipSelect').style.left = this.adjust(finishShipSelectDims[0])+'px';
		document.getElementById('finishShipSelect').style.top = this.adjust(finishShipSelectDims[1])+'px';
		for (var i = 0; i < this.buildButtons.length; i++) {
			this.buildButtons[i].style.left = this.adjust(buildButtonDims[i][0])+'px';
			this.buildButtons[i].style.top = this.adjust(buildButtonDims[i][1])+'px';
		}
	}
	draw() {
		this.context.drawImage(this.background, 0, 0, this.adjust(this.background.width), this.adjust(this.background.height));
		this.context.font = 'bold 32px Arial';
		this.context.fillStyle = 'white';
		this.context.shadowColor = 'black';
		this.context.shadowOffsetX = 3;
		this.context.shadowOffsetY = 3;
		this.context.drawImage(this.class2, this.adjust(180), this.adjust(240), this.adjust(this.class2.width), this.adjust(this.class2.height));
		this.context.drawImage(this.class3, this.adjust(250), this.adjust(240), this.adjust(this.class3.width), this.adjust(this.class3.height));
		this.context.drawImage(this.class4, this.adjust(320), this.adjust(240), this.adjust(this.class4.width), this.adjust(this.class4.height));
		this.context.drawImage(this.class5, this.adjust(390), this.adjust(240), this.adjust(this.class5.width), this.adjust(this.class5.height));
		this.context.fillText('Build Fleet Menu', this.adjust(850), this.adjust(100));
		this.context.font = '24px Arial';
		this.context.fillText('Scrambler', this.adjust(850), this.adjust(225));
		this.context.fillText('Scanner', this.adjust(850), this.adjust(315));
		this.context.fillText('Submarine', this.adjust(850), this.adjust(435));
		this.context.fillText('Destroyer', this.adjust(850), this.adjust(525));
		this.context.fillText('Cruiser', this.adjust(850), this.adjust(645));
		this.context.fillText('Carrier', this.adjust(850), this.adjust(735));
		this.context.fillText('Executioner', this.adjust(850), this.adjust(855));
		this.context.fillText('Artillery', this.adjust(850), this.adjust(945));
		this.context.font = '28px Arial';
		this.context.fillText('Class 2', this.adjust(750), this.adjust(170));
		this.context.fillText('Class 3', this.adjust(750), this.adjust(380));
		this.context.fillText('Class 4', this.adjust(750), this.adjust(590));
		this.context.fillText('Class 5', this.adjust(750), this.adjust(800));
		this.context.font = 'bold 28px Arial';
		this.context.fillText('Ship Ability', this.adjust(250), this.adjust(750));
		
	}
}

class fleetPositionWindow {
	constructor(canvas, scale) {
		this.scale = scale;
		this.canvas = canvas;
		this.canvas.width = this.adjust(1920);
		this.canvas.height = this.adjust(1080);
		this.context = canvas.getContext('2d');
		this.background = backgrounds[1];
		this.class2 = new Image();
		this.class3 = new Image();
		this.class4 = new Image();
		this.class5 = new Image();
		this.class2Hor = new Image();
		this.class3Hor = new Image();
		this.class4Hor = new Image();
		this.class5Hor = new Image();
		this.selectRectangle = new Image();
		this.class2.src = 'images/Ships/ship2' + client.fleet[0] + '.png';
		this.class3.src = 'images/Ships/ship3' + client.fleet[1] + '.png';
		this.class4.src = 'images/Ships/ship4' + client.fleet[2] + '.png';
		this.class5.src = 'images/Ships/ship5' + client.fleet[3] + '.png';
		this.class2Hor.src = 'images/Ships/ship2' + client.fleet[0] + 'Hor.png';
		this.class3Hor.src = 'images/Ships/ship3' + client.fleet[1] + 'Hor.png';
		this.class4Hor.src = 'images/Ships/ship4' + client.fleet[2] + 'Hor.png';
		this.class5Hor.src = 'images/Ships/ship5' + client.fleet[3] + 'Hor.png';
		this.selectRectangle.src = 'images/selectRec.png';
		this.moveableShips = new Array(4);
		this.moveableShips[0] = new moveableShip(client.fleet[0], 2, 2, 3); //TODO
		this.moveableShips[1] = new moveableShip(client.fleet[1], 3, 3, 3);
		this.moveableShips[2] = new moveableShip(client.fleet[2], 4, 4, 3);
		this.moveableShips[3] = new moveableShip(client.fleet[3], 5, 5, 3);
		this.selectButtons = document.getElementsByClassName('shipSelectButton');
		this.moveButtons = document.getElementsByClassName('shipMoveButton');
		this.selectedShip = -1;
		this.xAdj = [0,0,0,0];
		this.yAdj = [0,0,0,0];
		this.rotAdj = [false,false,false,false];
	}
	
	waitMessage() {
		this.context.font = '24px Arial';
		this.context.fillStyle = 'white';
		this.context.shadowColor = 'black';
		this.context.shadowOffsetX = 3;
		this.context.shadowOffsetY = 3;
		this.draw();
		this.context.fillText('Waiting for other player...', this.adjust(177), this.adjust(950));
		for (var i = 0; i < this.moveableShips.length; i++) {
			this.moveableShips[i].shipName = client.fleet[i];
		}
		client.fleet = this.moveableShips;
		var buttons = document.getElementById('positionFleet').querySelectorAll('button');
		[].forEach.call(buttons, function(element) {
			element.disabled = true;
		});
	}
	
	adjust(dimension) {
		return dimension * this.scale;
	}
	
	drawButtons() {
		document.getElementById('finishFleet').style.left = this.adjust(finishFleetDims[0])+'px';
		document.getElementById('finishFleet').style.top = this.adjust(finishFleetDims[1])+'px';
		for (var i = 0; i < this.selectButtons.length; i++) {
			this.selectButtons[i].style.left = this.adjust(selectButtonDims[i][0])+'px';
			this.selectButtons[i].style.top = this.adjust(selectButtonDims[i][1])+'px';
		}
		for (var i = 0; i < this.moveButtons.length; i++) {
			this.moveButtons[i].style.left = this.adjust(moveButtonDims[i][0])+'px';
			this.moveButtons[i].style.top = this.adjust(moveButtonDims[i][1])+'px';
		}
	}
	draw() {
		this.context.drawImage(this.background, 0, 0, this.adjust(this.background.width), this.adjust(this.background.height));
		this.context.font = 'bold 32px Arial';
		this.context.fillStyle = 'white';
		this.context.shadowColor = 'black';
		this.context.shadowOffsetX = 3;
		this.context.shadowOffsetY = 3;
		//class 2 display
		if(this.rotAdj[0] == false){
			this.context.drawImage(this.class2, this.adjust(180 + this.xAdj[0]), this.adjust(240 + this.yAdj[0]), this.adjust(this.class2.width), this.adjust(this.class2.height));
		}
		else{
			this.context.drawImage(this.class2Hor, this.adjust(180 + this.xAdj[0]), this.adjust(240 + this.yAdj[0]), this.adjust(this.class2.height), this.adjust(this.class2.width));
		}
		//class 3 display
		if(this.rotAdj[1] == false){
			this.context.drawImage(this.class3, this.adjust(250 + this.xAdj[1]), this.adjust(240 + this.yAdj[1]), this.adjust(this.class3.width), this.adjust(this.class3.height));
		}
		else{
			this.context.drawImage(this.class3Hor, this.adjust(250 + this.xAdj[1]), this.adjust(240 + this.yAdj[1]), this.adjust(this.class3.height), this.adjust(this.class3.width));
		}
		//class 4 display
		if(this.rotAdj[2] == false){
			this.context.drawImage(this.class4, this.adjust(320 + this.xAdj[2]), this.adjust(240 + this.yAdj[2]), this.adjust(this.class4.width), this.adjust(this.class4.height));
		}
		else{
			this.context.drawImage(this.class4Hor, this.adjust(320 + this.xAdj[2]), this.adjust(240 + this.yAdj[2]), this.adjust(this.class4.height), this.adjust(this.class4.width));
		}
		//class 5 display
		if(this.rotAdj[3] == false){
			this.context.drawImage(this.class5, this.adjust(390 + this.xAdj[3]), this.adjust(240 + this.yAdj[3]), this.adjust(this.class5.width), this.adjust(this.class5.height));
		}
		else{
			this.context.drawImage(this.class5Hor, this.adjust(390 + this.xAdj[3]), this.adjust(240 + this.yAdj[3]), this.adjust(this.class5.height), this.adjust(this.class5.width));
		}
		this.context.fillText('Move Fleet Menu', this.adjust(850), this.adjust(100));
		this.context.font = '28px Arial';
		this.context.fillText(client.fleet[0], this.adjust(950), this.adjust(225));
		this.context.fillText(client.fleet[1], this.adjust(950), this.adjust(355));
		this.context.fillText(client.fleet[2], this.adjust(950), this.adjust(485));
		this.context.fillText(client.fleet[3], this.adjust(950), this.adjust(615));
	}
	
	selectShip(shipID) {
		this.selectedShip = shipID;
		this.draw();
		var xPos;
		var yPos;
		[].forEach.call(document.getElementsByClassName('shipSelectButton'), function(element) {
			element.disabled = false;
		});
		document.getElementById('move' + (shipID+2)).disabled = true;
		switch(shipID) {
			case 0:
				xPos = 945;
				yPos = 173;
				break;
			case 1:
				xPos = 945;
				yPos = 303;
				break;
			case 2:
				xPos = 945;
				yPos = 433;
				break;
			case 3:
				xPos = 945;
				yPos = 563;
				break;
		}
		this.context.drawImage(this.selectRectangle, this.adjust(xPos), this.adjust(yPos), this.adjust(this.selectRectangle.width), this.adjust(this.selectRectangle.height));
	}
	
	checkPosition(desiredMove) {
		this.draw();
		var shipID = this.selectedShip;
		this.selectShip(shipID);
		for(var i = 0; i < desiredMove.length; i++) {
			var current = desiredMove[i];
			//out of bounds X check
			if(current.getX() < 0){
				this.context.fillText('Invalid Move!', this.adjust(240), this.adjust(760));
				return false;
			}
			else if(current.getX() > 8){
				this.context.fillText('Invalid Move!', this.adjust(240), this.adjust(760));
				return false;
			}
			//out of bounds Y check
			if(current.getY() < 0){
				this.context.fillText('Invalid Move!', this.adjust(240), this.adjust(760));
				return false;
			}
			else if(current.getY() > 8){
				this.context.fillText('Invalid Move!', this.adjust(240), this.adjust(760));
				return false;
			}
			//ship collision check
			for(var j = 0; j < this.moveableShips.length; j++){
				if(j != shipID){
					var compareShip = this.moveableShips[j].currentPosArray();
					for(var k = 0; k < compareShip.length; k++){
						var comparePos = compareShip[k];
						if(current.equals(comparePos)){
							this.context.fillText('Invalid Move!', this.adjust(240), this.adjust(760));
							return false;
						}
					}//end comparePos
				}
				
			}//end ship loop
		}//desiredMove loop end; 
		return true;
	}
	moveAction(actionString){
		var shipID = this.selectedShip;
		
		if(actionString == "Rotate"){
			if(this.checkPosition(this.moveableShips[shipID].checkRotate()) == true){
				this.moveableShips[shipID].rotate();
				if(this.moveableShips[shipID].vert){
					switch(shipID){
						case 0: 
							this.rotAdj[0] = false;
							break;
						case 1:
							this.rotAdj[1] = false;
							break;
						case 2:
							this.rotAdj[2] = false;
							break;
						case 3:
							this.rotAdj[3] = false;
							break;
					}
				}
				else{
					switch(shipID){
						case 0: 
							this.rotAdj[0] = true;
							break;
						case 1:
							this.rotAdj[1] = true;
							break;
						case 2:
							this.rotAdj[2] = true;
							break;
						case 3:
							this.rotAdj[3] = true;
							break;
					}
				}
				this.draw();
				this.selectShip(shipID);
				return true;
			}
			else{
				return false;
			}
		}
		else if(actionString == "Up"){
			if(this.checkPosition(this.moveableShips[shipID].checkMove("Up")) == true){
				this.moveableShips[shipID].move("Up");
				this.yAdj[shipID] = this.yAdj[shipID] - 70;
				this.draw()
				this.selectShip(shipID);
				return true;
			}
			else{
				return false;
			}
		}
		else if(actionString == "Down"){
			if(this.checkPosition(this.moveableShips[shipID].checkMove("Down")) == true){
				this.moveableShips[shipID].move("Down");
				this.yAdj[shipID] = this.yAdj[shipID] + 70;
				this.draw()
				this.selectShip(shipID);
				return true;
			}
			else{
				return false;
			}
		}
		else if(actionString == "Right"){
			if(this.checkPosition(this.moveableShips[shipID].checkMove("Right")) == true){
				this.moveableShips[shipID].move("Right");
				this.xAdj[shipID] = this.xAdj[shipID] + 70;
				this.draw()
				this.selectShip(shipID);
				return true;
			}
			else{
				return false;
			}
		}
		else if(actionString == "Left"){
			if(this.checkPosition(this.moveableShips[shipID].checkMove("Left")) == true){
				this.moveableShips[shipID].move("Left");
				this.xAdj[shipID] = this.xAdj[shipID] - 70;
				this.draw()
				this.selectShip(shipID);
				return true;
			}
			else{
				return false;
			}
		}
		else{
			return false;
		}
		return false;
	}
}

class orderedPair{
	constructor(x,y) {
		this.posX = x;
		this.posY = y;
	}
	getX(){
		return this.posX;
	}
	getY(){
		return this.posY;
	}
	move(x,y){
		this.posX = x;
		this.posY = y;
	}
	equals(inputPair){
		if(inputPair.getX() != this.posX){
			return false;
		}
		if(inputPair.getY() != this.posY){
			return false;
		}
		return true;
	}
}



class Tile {
	constructor(pair) {
		this.corner = pair;			//top left corner pixel coordinates
		this.hasShip = false; 		//whether or not a ship occupies this tile
		this.hasBeenShot = false; 	//whether or not a player has fired on this tile
		this.shipHit = undefined; 	//true = "hit", false = "miss"
		this.shipIndex = -1;  		//contains index of ship in client fleet
	}
	
	shipPresent() {
		return this.hasShip;
	}
	
	shot() {
		return this.hasBeenShot;
	}
	
	updateTile() {} //TODO
}

class Grid {
	constructor() {
		this.field = new Array(9);
		for (var i = 0; i < 9; i++) {
			this.field[i] = new Array(9);
		}
	}
	
	loadGrid(topLeftCorner, tileSize) {
		var x = topLeftCorner.posX;
		var y = topLeftCorner.posY;
		for (var i = 0; i < 9; i++) {
			for (var j = 0; j < 9; j++) {
				this.field[i][j] = new Tile(new orderedPair(i*tileSize + x, j*tileSize + y));
			}
		}
	}
}
//general battleship
class generalShip {
    constructor() {
		this.ship = new Array(3);
		this.sunk = false;
		this.selected = false;
	}
	shipSunk(){
		return this.sunk;
	}
	shipSelected(){
		return this.selected;
	}
	/* ship coordinates
	shipCoor(){
		return coordinates
	} */

	
}


class moveableShip {
	constructor(name,shipSize,mainX,mainY) {
		this.shipName = name;
		this.mainX = mainX;
		this.mainY = mainY;
		this.mainPoint = new orderedPair(mainX,mainY);
		this.vert = true;
		this.length = shipSize;
	}
	containsPoint(point) {
		var posArray = this.currentPosArray();
		for (var i = 0; i < posArray.length; i++) {
			if (posArray[i].equals(point))
				return true;
		}
		return false;
	}
	currentPosArray(){
		var pos = [this.mainPoint];
		for (var i = 0; i < this.length-1; i++){
			if(this.vert){
				pos.push(new orderedPair(this.mainX,this.mainY + 1 + i));
			}
			else{
				pos.push(new orderedPair(this.mainX + 1 + i,this.mainY));
			}
		}
		return pos;
	}
	checkRotate(){
		var pos = [this.mainPoint];
		for (var i = 0; i < this.length-1; i++){
			if(this.vert == true){
				pos.push(new orderedPair(this.mainX + 1 + i,this.mainY));
			}
			else{
				pos.push(new orderedPair(this.mainX,this.mainY + 1 + i));
			}
		}
		return pos;
	}
	rotate(){
		if(this.vert == true){
			this.vert = false;
		}
		else{
			this.vert = true;
		}
	}
	checkMove(direction){
		var xChange = 0;
		var yChange = 0;
		if(direction == "Up"){
			xChange = 0;
			yChange = -1;
		}
		else if(direction == "Down"){
			xChange = 0;
			yChange = 1;
		}
		else if(direction == "Right"){
			xChange = 1;
			yChange = 0;
		}
		else if(direction == "Left"){
			xChange = -1;
			yChange = 0;
		}
		
		var pos = [new orderedPair(this.mainX + xChange,this.mainY + yChange)];
		for (var i = 0; i < this.length-1; i++){
			if(this.vert){
				pos.push(new orderedPair(this.mainX + xChange,this.mainY + 1 + i + yChange));
			}
			else{
				pos.push(new orderedPair(this.mainX + 1 + i + xChange,this.mainY + yChange));
			}
		}
		return pos;
	}
	move(direction){
		var xChange = 0;
		var yChange = 0;
		if(direction == "Up"){
			xChange = 0;
			yChange = -1;
		}
		else if(direction == "Down"){
			xChange = 0;
			yChange = 1;
		}
		else if(direction == "Right"){
			xChange = 1;
			yChange = 0;
		}
		else if(direction == "Left"){
			xChange = -1;
			yChange = 0;
		}
		this.mainX = this.mainX + xChange;
		this.mainY = this.mainY + yChange;
		this.mainPoint.move(this.mainX,this.mainY);
	}
	fire(tile) {
		tile.hasBeenShot = true;
		if(tile.shipPresent()) {
			tile.shipHit = true;
		}
		else {
			tile.shipHit = false;
		}
	}
	
}

/* //class 2
class BattleShip {
    
}

class BattleShip {
    
}
//class 3
class BattleShip {
    
}

class BattleShip {
    
}
//class 4
class BattleShip {
    
}

class BattleShip {
    
}
//class 5
class BattleShip {
    
}

class BattleShip {
    
} */