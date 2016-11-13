/*
setupWindows.js
---------------------
Contains the two setup windows.  The first is the one where the player selects their battleships
and the second is the one where the player can move their battleships around.
*/

/*
buildAFleetWindow class
---------------------
Holds the canvas for the fleet selection window

*/

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

/*
buildAFleetWindow class
---------------------
Holds the canvas for the fleet positioning window

*/

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
	
	//determine if the attempted move in position for the current ship is valid (in the game window and does not overlap with other ships)
	//if valid return true, false otherwise
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
	
	//attempt to move or rotate the currently selected ship
	//actionString determines whether to move the ship up, down, left, right, or to rotate the ship 90 degrees
	//returns true if successful, false otherwise
	moveAction(actionString){
		var shipID = this.selectedShip;
		
		if(actionString == 'Rotate'){
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
		else if(actionString == 'Up'){
			if(this.checkPosition(this.moveableShips[shipID].checkMove('Up')) == true){
				this.moveableShips[shipID].move('Up');
				this.yAdj[shipID] = this.yAdj[shipID] - 70;
				this.draw()
				this.selectShip(shipID);
				return true;
			}
			else{
				return false;
			}
		}
		else if(actionString == 'Down'){
			if(this.checkPosition(this.moveableShips[shipID].checkMove('Down')) == true){
				this.moveableShips[shipID].move('Down');
				this.yAdj[shipID] = this.yAdj[shipID] + 70;
				this.draw()
				this.selectShip(shipID);
				return true;
			}
			else{
				return false;
			}
		}
		else if(actionString == 'Right'){
			if(this.checkPosition(this.moveableShips[shipID].checkMove('Right')) == true){
				this.moveableShips[shipID].move('Right');
				this.xAdj[shipID] = this.xAdj[shipID] + 70;
				this.draw()
				this.selectShip(shipID);
				return true;
			}
			else{
				return false;
			}
		}
		else if(actionString == 'Left'){
			if(this.checkPosition(this.moveableShips[shipID].checkMove('Left')) == true){
				this.moveableShips[shipID].move('Left');
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