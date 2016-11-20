/*
moveableShip class
---------------------
Battleship representation in our game.
Stores important data such as current position, alive status and ship type
Also handles moving and special attacks for each battleship.

*/
class moveableShip {
	constructor(name,shipSize,mainX,mainY) {
		this.shipName = name;
		this.mainX = mainX;
		this.mainY = mainY;
		this.mainPoint = new orderedPair(mainX,mainY);
		this.vert = true;
		this.length = shipSize;
		this.alive = true;
		this.posArray = this.currentPosArray();
		this.shotCounter = 0;  //if counter reaches ship's length, it sank
		this.specialAttacksLeft = 1;
		if (this.shipName == 'Scanner')
			this.specialAttacksLeft = 2;
	}
	updateAlive() {
		if (this.alive) {
			if (this.shotCounter == this.length) {
				this.alive = false;
				return true;
			}
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
		if(direction == 'Up'){
			xChange = 0;
			yChange = -1;
		}
		else if(direction == 'Down'){
			xChange = 0;
			yChange = 1;
		}
		else if(direction == 'Right'){
			xChange = 1;
			yChange = 0;
		}
		else if(direction == 'Left'){
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
		if(direction == 'Up'){
			xChange = 0;
			yChange = -1;
		}
		else if(direction == 'Down'){
			xChange = 0;
			yChange = 1;
		}
		else if(direction == 'Right'){
			xChange = 1;
			yChange = 0;
		}
		else if(direction == 'Left'){
			xChange = -1;
			yChange = 0;
		}
		this.mainX = this.mainX + xChange;
		this.mainY = this.mainY + yChange;
		this.mainPoint.move(this.mainX,this.mainY);
		this.posArray = this.currentPosArray();
	}
	specialAttack(attackedCoordinate) {
			var result = new Array();
		if (this.shipName == 'Scrambler') {
			result.push(new orderedPair(11, 11)); //11,11 attack code
			return result;
		}
		else if (this.shipName == 'Scanner') {
			var x = attackedCoordinate.posX;
			var y = attackedCoordinate.posY;
			result.push(new orderedPair(12, 12)); //12,12 attack code
			result.push(new orderedPair(x, y)); //center (attack point)
			//this section only selects the location that are in bounds
			if(x-1 > -1 && y-1 > -1){
				result.push(new orderedPair(x-1, y-1)); //top left
			}
			if(y-1 > -1){
				result.push(new orderedPair(x, y-1)); //top mid
			}
			if(x+1 < 9 && y-1 > -1){
				result.push(new orderedPair(x+1, y-1)); //top right
			}
			if(x-1 > -1){
				result.push(new orderedPair(x-1, y)); // mid left
			}
			if(x+1 < 9){
				result.push(new orderedPair(x+1, y)); //mid right
			}
			if(x-1 > -1 && y+1 < 9){
				result.push(new orderedPair(x-1, y+1)); //top left
			}
			if(y+1 < 9){
				result.push(new orderedPair(x, y+1)); //top mid
			}
			if(x+1 < 9 && y+1 < 9){
				result.push(new orderedPair(x+1, y+1)); //top right
			}
			
			return result;
		}
		else if (this.shipName == 'Submarine') {
			result.push(new orderedPair(-1, -1)); //-1,-1 error code
			return result;
		}
		else if (this.shipName == 'Destroyer') {
			result.push(new orderedPair(-1, -1)); //-1,-1 error code
			return result;
		}
		else if (this.shipName == 'Cruiser') {
			result.push(new orderedPair(-1, -1)); //-1,-1 error code
			return result;
		}
		else if (this.shipName == 'Carrier') {
			result.push(new orderedPair(13, 13)); //13,13 attack code
			return result;
		}
		else if (this.shipName == 'Executioner') {
			var x = attackedCoordinate.posX;
			var y = attackedCoordinate.posY;
			result.push(new orderedPair(14, 14)); //14,14 attack code
			result.push(new orderedPair(x, y)); //attack point
			return result;
		}
		else if (this.shipName == 'Artillery') {
			var x = attackedCoordinate.posX;
			var y = attackedCoordinate.posY;
			result.push(new orderedPair(x, y));
			if (x+1 < 9) {
				if (!client.targetGrid.field[x+1][y].isShotAt())
					result.push(new orderedPair(x+1, y));
			}
			if (y+1 < 9) {
				if (!client.targetGrid.field[x][y+1].isShotAt())
					result.push(new orderedPair(x, y+1));
			}
			if (x-1 > -1) {
				if (!client.targetGrid.field[x-1][y].isShotAt())
					result.push(new orderedPair(x-1, y));
			}
			if (y-1 > -1) {
				if (!client.targetGrid.field[x][y-1].isShotAt())
					result.push(new orderedPair(x, y-1));
			}
			return result;
		}
		else {
			console.log("invalid ship name");
		}
			this.specialAttacksLeft--;
	}
}