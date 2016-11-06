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
		var window = this;
		[].forEach.call(this.buildButtons, function(element) {
			console.log(element.offsetLeft);
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
		this.context = canvas.getContext('2d');
		this.background = new Image();
		this.background.src = 'images/Ships/shipSelect.png';
		this.class2 = new Image();
		this.class2.src = 'images/Ships/ship2' + client.fleet[0] + '.png';
		this.class3 = new Image();
		this.class3.src = 'images/Ships/ship3' + client.fleet[1] + '.png';
		this.class4 = new Image();
		this.class4.src = 'images/Ships/ship4' + client.fleet[2] + '.png';
		this.class5 = new Image();
		this.class5.src = 'images/Ships/ship5' + client.fleet[3] + '.png';
		this.moveableShips[0] = new moveableShip(2, 2, 3);
		this.moveableShips[1] = new moveableShip(3, 3, 3);
		this.moveableShips[2] = new moveableShip(4, 4, 3);
		this.moveableShips[3] = new moveableShip(5, 5, 3);
	}
	adjust(dimension) {
		return dimension * this.scale;
	}
	checkPosition(shipID, desiredMove){
		for(i = 0; i < desiredMove.length){
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
			for(j = 0; j < moveableShips.length; j++){
				if(j != shipID){
					var compareShip = moveableShips[j];
					for(k = 0; k < compareShip.length; k++){
						var comparePos = compareShip[k];
						if(current.equals(comparePos) == true){
							return false;
						}
					}//end comparePos
				}
				
			}//end ship loop
		}//desiredMove loop end; 
		return true;
	}
	moveAction(shipID, actionString){
		if(actionString == "Rotate"){
			if(checkPosition(shipID, moveableShips[shipID].checkRotate()) == true){
				moveableShips[shipID].rotate();
				return true;
			}
			else{
				return false;
			}
		}
		else if(actionString == "Up"){
			if(checkPosition(shipID, moveableShips[shipID].checkMove("Up")) == true){
				moveableShips[shipID].move("Up");
				return true;
			}
			else{
				return false;
			}
		}
		else if(actionString == "Down"){
			if(checkPosition(shipID, moveableShips[shipID].checkMove("Down")) == true){
				moveableShips[shipID].move("Down");
				return true;
			}
			else{
				return false;
			}
		}
		else if(actionString == "Right"){
			if(checkPosition(shipID, moveableShips[shipID].checkMove("Right")) == true){
				moveableShips[shipID].move("Right");
				return true;
			}
			else{
				return false;
			}
		}
		else if(actionString == "Left"){
			if(checkPosition(shipID, moveableShips[shipID].checkMove("Left")) == true){
				moveableShips[shipID].move("Left");
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
		var pos = [mainPoint];
		for (i = 0; i < this.shipsize-1; i++){
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
		var pos = [mainPoint];
		for (i = 0; i < this.shipsize-1; i++){
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
		for (i = 0; i < this.shipsize-1; i++){
			if(this.vert == true){
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