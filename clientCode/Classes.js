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
		this.class2.src = 'images/Ships/ship2' + client.fleet[0] + '.png';
		this.class3.src = 'images/Ships/ship3' + client.fleet[1] + '.png';
		this.class4.src = 'images/Ships/ship4' + client.fleet[2] + '.png';
		this.class5.src = 'images/Ships/ship5' + client.fleet[3] + '.png';
		this.moveableShips = new Array(4);
		this.moveableShips[0] = new moveableShip(2, 2, 3);
		this.moveableShips[1] = new moveableShip(3, 3, 3);
		this.moveableShips[2] = new moveableShip(4, 4, 3);
		this.moveableShips[3] = new moveableShip(5, 5, 3);
		this.selectButtons = document.getElementsByClassName('shipSelectButton');
		this.moveButtons = document.getElementsByClassName('shipMoveButton');
		this.selectedShip = -1;

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
		this.context.drawImage(this.class2, this.adjust(180), this.adjust(240), this.adjust(this.class2.width), this.adjust(this.class2.height));
		this.context.drawImage(this.class3, this.adjust(250), this.adjust(240), this.adjust(this.class3.width), this.adjust(this.class3.height));
		this.context.drawImage(this.class4, this.adjust(320), this.adjust(240), this.adjust(this.class4.width), this.adjust(this.class4.height));
		this.context.drawImage(this.class5, this.adjust(390), this.adjust(240), this.adjust(this.class5.width), this.adjust(this.class5.height));
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
		this.context.beginPath();
		this.context.lineWidth="6";
		this.context.strokeStyle="red";
		this.context.rect(5,5,290,140); 
		this.context.stroke();
	}
	
	checkPosition(desiredMove) {
		var shipID = this.selectedShip;
		for(var i = 0; i < desiredMove.length; i++) {
			var current = desiredMove[i];
			//out of bounds X check
			if(current.getX() < 0){
				return false;
			}
			else if(current.getX() > 8){
				return false;
			}
			//out of bounds Y check
			if(current.getY() < 0){
				return false;
			}
			else if(current.getY() > 8){
				return false;
			}
			//ship collision check
			console.log(this.moveableShips);
			console.log(shipID);
			for(var j = 0; j < this.moveableShips.length; j++){
				if(j != shipID){
					var compareShip = this.moveableShips[j].currentPosArray();
					console.log(compareShip);
					for(var k = 0; k < compareShip.length; k++){
						var comparePos = compareShip[k];
						if(current.equals(comparePos)){
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
				return true;
			}
			else{
				return false;
			}
		}
		else if(actionString == "Up"){
			if(this.checkPosition(this.moveableShips[shipID].checkMove("Up")) == true){
				this.moveableShips[shipID].move("Up");
				return true;
			}
			else{
				return false;
			}
		}
		else if(actionString == "Down"){
			if(this.checkPosition(this.moveableShips[shipID].checkMove("Down")) == true){
				this.moveableShips[shipID].move("Down");
				return true;
			}
			else{
				return false;
			}
		}
		else if(actionString == "Right"){
			if(this.checkPosition(this.moveableShips[shipID].checkMove("Right")) == true){
				this.moveableShips[shipID].move("Right");
				return true;
			}
			else{
				return false;
			}
		}
		else if(actionString == "Left"){
			if(this.checkPosition(this.moveableShips[shipID].checkMove("Left")) == true){
				this.moveableShips[shipID].move("Left");
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
	constructor(shipSize,mainX,mainY) {
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
				console.log("Hello");
				pos.push(new orderedPair(this.mainX + xChange,this.mainY + 1 + i + yChange));
			}
			else{
				pos.push(new orderedPair(this.mainX + 1 + i + xChange,this.mainY + yChange));
			}
		}
		console.log(pos);
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