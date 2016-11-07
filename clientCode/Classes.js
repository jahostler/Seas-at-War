class Player {
    constructor() {
        this.homeGrid = new Grid();
		this.id = -1;
        this.fleet = new Array(4);
		this.fleet[0] = "Scrambler";
		this.fleet[1] = "Submarine";
		this.fleet[2] = "Cruiser";
		this.fleet[3] = "Executioner";
		
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
		this.background = new Image();
		this.background.src = 'images/gameBoard.png';
		//TODO: Unugly it
		
		this.class21 = new Image();
		this.class31 = new Image();
		this.class41 = new Image();
		this.class51 = new Image();
		this.class21Hor = new Image();
		this.class31Hor = new Image();
		this.class41Hor = new Image();
		this.class51Hor = new Image();
		this.class21.src = 'images/Ships/ship2Scrambler.png';
		this.class31.src = 'images/Ships/ship3Submarine.png';
		this.class41.src = 'images/Ships/ship4Cruiser.png';
		this.class51.src = 'images/Ships/ship5Executioner.png';
		this.class21Hor.src = 'images/Ships/ship2ScramblerHor.png';
		this.class31Hor.src = 'images/Ships/ship3SubmarineHor.png';
		this.class41Hor.src = 'images/Ships/ship4CruiserHor.png';
		this.class51Hor.src = 'images/Ships/ship5ExecutionerHor.png';
		this.class22 = new Image();
		this.class32 = new Image();
		this.class42 = new Image();
		this.class52 = new Image();
		this.class22Hor = new Image();
		this.class32Hor = new Image();
		this.class42Hor = new Image();
		this.class52Hor = new Image();
		this.class22.src = 'images/Ships/ship2Scanner.png';
		this.class32.src = 'images/Ships/ship3Destroyer.png';
		this.class42.src = 'images/Ships/ship4Carrier.png';
		this.class52.src = 'images/Ships/ship5Artillery.png';
		this.class22Hor.src = 'images/Ships/ship2ScannerHor.png';
		this.class32Hor.src = 'images/Ships/ship3DestroyerHor.png';
		this.class42Hor.src = 'images/Ships/ship4CarrierHor.png';
		this.class52Hor.src = 'images/Ships/ship5ArtilleryHor.png';
	}
	
	adjust(dimension) {
		return dimension * this.scale;
	}
	
	drawButton() {
		var norm = document.getElementById('normalAttack');
		var spec = document.getElementById('specialAttack');
		
		norm.style.left = this.adjust(norm.offsetLeft)+"px";
		norm.style.top = this.adjust(norm.offsetTop)+"px";
		spec.style.left = this.adjust(spec.offsetLeft)+"px";
		spec.style.top = this.adjust(spec.offsetTop)+"px";
	}
	
	draw() {
		this.context.drawImage(this.background, 0, 0, this.adjust(this.background.width), this.adjust(this.background.height));

		//class 2 display
		if(client.fleet[0].shipName == "Scrambler"){
			if(client.fleet[0].vert){
				this.context.drawImage(this.class21, this.adjust(client.fleet[0].mainX * 70 + 40), this.adjust(client.fleet[0].mainY * 70 + 30), this.adjust(this.class21.width), this.adjust(this.class21.height));
			}
			else{
				this.context.drawImage(this.class21Hor, this.adjust(client.fleet[0].mainX * 70 + 40), this.adjust(client.fleet[0].mainY * 70 + 30), this.adjust(this.class21.height), this.adjust(this.class21.width));
			}
		}
		else if(client.fleet[0].shipName == "Scanner"){
			if(client.fleet[0].vert){
				this.context.drawImage(this.class22, this.adjust(client.fleet[0].mainX * 70 + 40), this.adjust(client.fleet[0].mainY * 70 + 30), this.adjust(this.class22.width), this.adjust(this.class22.height));
			}
			else{
				this.context.drawImage(this.class22Hor, this.adjust(client.fleet[0].mainX * 70 + 40), this.adjust(client.fleet[0].mainY * 70 + 30), this.adjust(this.class22.height), this.adjust(this.class22.width));
			}
		}
		//class 3 display
		if(client.fleet[1].shipName == "Submarine"){
			if(client.fleet[1].vert){
				this.context.drawImage(this.class31, this.adjust(client.fleet[1].mainX * 70 + 40), this.adjust(client.fleet[1].mainY * 70 + 30), this.adjust(this.class31.width), this.adjust(this.class31.height));
			}
			else{
				this.context.drawImage(this.class31Hor, this.adjust(client.fleet[1].mainX * 70 + 40), this.adjust(client.fleet[1].mainY * 70 + 30), this.adjust(this.class31.height), this.adjust(this.class31.width));
			}
		}
		else if(client.fleet[1].shipName == "Destroyer"){
			if(client.fleet[1].vert){
				this.context.drawImage(this.class32, this.adjust(client.fleet[1].mainX * 70 + 40), this.adjust(client.fleet[1].mainY * 70 + 30), this.adjust(this.class32.width), this.adjust(this.class32.height));
			}
			else{
				this.context.drawImage(this.class32Hor, this.adjust(client.fleet[1].mainX * 70 + 40), this.adjust(client.fleet[1].mainY * 70 + 30), this.adjust(this.class32.height), this.adjust(this.class32.width));
			}
		}
		
		//class 4 display
		if(client.fleet[2].shipName == "Cruiser"){
			if(client.fleet[2].vert){
				this.context.drawImage(this.class41, this.adjust(client.fleet[2].mainX * 70 + 40), this.adjust(client.fleet[2].mainY * 70 + 30), this.adjust(this.class41.width), this.adjust(this.class41.height));
			}
			else{
				this.context.drawImage(this.class41Hor, this.adjust(client.fleet[2].mainX * 70 + 40), this.adjust(client.fleet[2].mainY * 70 + 30), this.adjust(this.class41.height), this.adjust(this.class41.width));
			}
		}
		else if(client.fleet[2].shipName == "Carrier"){
			if(client.fleet[2].vert){
				this.context.drawImage(this.class42, this.adjust(client.fleet[2].mainX * 70 + 40), this.adjust(client.fleet[2].mainY * 70 + 30), this.adjust(this.class42.width), this.adjust(this.class42.height));
			}
			else{
				this.context.drawImage(this.class42Hor, this.adjust(client.fleet[2].mainX * 70 + 40), this.adjust(client.fleet[2].mainY * 70 + 30), this.adjust(this.class42.height), this.adjust(this.class42.width));
			}
		}
		//class 5 display
		if(client.fleet[3].shipName == "Executioner"){
			if(client.fleet[3].vert){
				this.context.drawImage(this.class51, this.adjust(client.fleet[3].mainX* 70 + 40), this.adjust(client.fleet[3].mainY* 70 + 30), this.adjust(this.class51.width), this.adjust(this.class51.height));
			}
			else{
				this.context.drawImage(this.class51Hor, this.adjust(client.fleet[3].mainX* 70 + 40), this.adjust(client.fleet[3].mainY* 70 + 30), this.adjust(this.class51.height), this.adjust(this.class51.width));
			}
		}
		if(client.fleet[3].shipName == "Artillery"){
			if(client.fleet[3].vert){
				this.context.drawImage(this.class52, this.adjust(client.fleet[3].mainX * 70 + 40), this.adjust(client.fleet[3].mainY * 70 + 30), this.adjust(this.class52.width), this.adjust(this.class52.height));
			}
			else{
				this.context.drawImage(this.class52Hor, this.adjust(client.fleet[3].mainX * 70 + 40), this.adjust(client.fleet[3].mainY * 70 + 30), this.adjust(this.class52.height), this.adjust(this.class52.width));
			}
		}

		
	}
}

class buildAFleetWindow {
	constructor(canvas, scale) {
		this.scale = scale;
		this.canvas = canvas;
		this.canvas.width = this.adjust(1920);
		this.canvas.height = this.adjust(1080);
		this.context = canvas.getContext('2d');
		this.background = new Image();
		this.background.src = 'images/Ships/shipSelect.png';
		this.class2 = new Image();
		this.class2.src = 'images/Ships/ship2temp.png';
		this.class3 = new Image();
		this.class3.src = 'images/Ships/ship3temp.png';
		this.class4 = new Image();
		this.class4.src = 'images/Ships/ship4temp.png';
		this.class5 = new Image();
		this.class5.src = 'images/Ships/ship5temp.png';
		this.buildButtons = document.getElementsByClassName('buildButton');
	}
	adjust(dimension) {
		return dimension * this.scale;
	}
	drawButtons() {
		document.getElementById('finishShipSelect').style.left = this.adjust(document.getElementById('finishShipSelect').offsetLeft)+'px';
		document.getElementById('finishShipSelect').style.top = this.adjust(document.getElementById('finishShipSelect').offsetTop)+'px';
		var window = this;
		[].forEach.call(this.buildButtons, function(element) {
			element.style.left = window.adjust(element.offsetLeft)+'px';
			element.style.top = window.adjust(element.offsetTop)+'px';
		});
	}
	draw() {
		this.context.drawImage(this.background, 0, 0, this.adjust(this.background.width), this.adjust(this.background.height));
		this.context.drawImage(this.class2, this.adjust(180), this.adjust(240), this.adjust(this.class2.width), this.adjust(this.class2.height));
		this.context.drawImage(this.class3, this.adjust(250), this.adjust(240), this.adjust(this.class3.width), this.adjust(this.class3.height));
		this.context.drawImage(this.class4, this.adjust(320), this.adjust(240), this.adjust(this.class4.width), this.adjust(this.class4.height));
		this.context.drawImage(this.class5, this.adjust(390), this.adjust(240), this.adjust(this.class5.width), this.adjust(this.class5.height));
		this.context.font = 'bold 32px Arial';
		this.context.fillStyle = 'white';
		this.context.shadowColor = 'black';
		this.context.shadowOffsetX = 3;
		this.context.shadowOffsetY = 3;
		this.context.fillText('Build Fleet Menu', this.adjust(850), this.adjust(100));
		this.context.font = '22px Arial';
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
		this.background = new Image();
		this.background.src = 'images/Ships/shipSelect.png';
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
		this.context.fillText('Waiting for other player...', this.adjust(200), this.adjust(950));
		client.fleet = this.moveableShips;
		var buttons = document.getElementById('positionFleet').querySelectorAll('button');
		[].forEach.call(buttons, function(element) {
			element.onclick = "";
		});
	}
	
	adjust(dimension) {
		return dimension * this.scale;
	}
	
	drawButtons() {
		document.getElementById('finishFleet').style.left = this.adjust(document.getElementById('finishFleet').offsetLeft)+'px';
		document.getElementById('finishFleet').style.top = this.adjust(document.getElementById('finishFleet').offsetTop)+'px';
		var window = this;
		[].forEach.call(this.selectButtons, function(element) {
			element.style.left = window.adjust(element.offsetLeft)+'px';
			element.style.top = window.adjust(element.offsetTop)+'px';
		});
		[].forEach.call(this.moveButtons, function(element) {
			element.style.left = window.adjust(element.offsetLeft)+'px';
			element.style.top = window.adjust(element.offsetTop)+'px';
		});
	}
	draw() {
		this.context.drawImage(this.background, 0, 0, this.adjust(this.background.width), this.adjust(this.background.height));
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
		
		this.context.font = 'bold 32px Arial';
		this.context.fillStyle = 'white';
		this.context.shadowColor = 'black';
		this.context.shadowOffsetX = 3;
		this.context.shadowOffsetY = 3;
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



class Grid {
	constructor() {
		this.field = new Array(9);
		for (var i = 0; i < 9; i++) {
			this.field[i] = new Array(9);
		}
	}
}

class Tile {
	constructor() {
		this.hasShip = false; //whether or not a ship occupies this tile
		this.hasBeenShot = false; //whether or not enemy has fired on this tile
		this.shipHit = undefined; //true = "hit", false = "miss"
	}
	
	shipPresent() {
		return this.hasShip;
	}
	
	shot() {
		return this.hasBeenShot;
	}
	
	updateTile() {} //TODO
	
	fire() {
		this.hasBeenShot = true;
		if(shipPresent()) {
			this.shipHit = true;
		}
		else {
			this.shipHit = false;
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

class moveableShip {
	constructor(name,shipSize,mainX,mainY) {
		this.shipName = name;
		this.mainX = mainX;
		this.mainY = mainY;
		this.mainPoint = new orderedPair(mainX,mainY);
		this.vert = true;
		this.length = shipSize;
	}
	currentPosArray(){
		var pos = [this.mainPoint];
		for (var i = 0; i < this.length-1; i++){
			if(this.vert == true){
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