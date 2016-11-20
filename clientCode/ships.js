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
	
	updateSpecialAttacksLeft() {
		if (this.shipName == 'Scanner' /*|| this.shipName == 'Defender'*/)
			this.specialAttacksLeft = 2;
		else if (this.shipName == 'Scrambler' || this.shipName == 'Defender' || this.shipName == 'Submarine' || 
				 this.shipName == 'Cruiser' || this.shipName == 'Carrier' || this.shipName == 'Executioner') {
			if (this.shipName == 'Cruiser') {
				this.firstHit = true;
			}
			this.specialAttacksLeft = 0;		
		}
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
			result.push(1); //1 attack code
			this.specialAttacksLeft--;
			return result;
		}
		else if (this.shipName == 'Scanner') {
			result.push(2); //2 attack code
			result.push(attackedCoordinate); //center (attack point)
			this.specialAttacksLeft--;
			return result;
		}
		else if (this.shipName == 'Submarine') {
			result.push(3); //3 error code
			this.specialAttacksLeft--;
			return result;
		}
		else if (this.shipName == 'Defender') {
			result.push(4); //4 error code
			this.specialAttacksLeft--;
			result.push(attackedCoordinate); //attack point
			return result;
		}
		else if (this.shipName == 'Cruiser') {
			result.push(5); //5 error code
			this.specialAttacksLeft--;
			return result;
		}
		else if (this.shipName == 'Carrier') {
			result.push(6); //6 attack code
			this.specialAttacksLeft--;
			return result;
		}
		else if (this.shipName == 'Executioner') {
			result.push(7); //7 attack code
			result.push(attackedCoordinate); //attack point
			this.specialAttacksLeft--;
			return result;
		}
		else if (this.shipName == 'Artillery') {
			result.push(8) //8 attack code
			result.push(attackedCoordinate);
			this.specialAttacksLeft--;
			return result;
		}
	}
}

//executed when player gets attacked, called in main
function processSpecialAttack(name, attackedCoordinate) {
	var result = new Array();
	var x = attackedCoordinate.posX;
	var y = attackedCoordinate.posY;
	if (name == "Scrambler") {
		return result;
	}
	else if (name == "Scanner") {
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
	else if (name == "Artillery") {
		result.push(attackedCoordinate);
		if (x+1 < 9) {
			if (!client.homeGrid.field[x+1][y].isShotAt())
				result.push(new orderedPair(x+1, y));
		}
		if (y+1 < 9) {
			if (!client.homeGrid.field[x][y+1].isShotAt())
				result.push(new orderedPair(x, y+1));
		}
		if (x-1 > -1) {
			if (!client.homeGrid.field[x-1][y].isShotAt())
				result.push(new orderedPair(x-1, y));
		}
		if (y-1 > -1) {
			if (!client.homeGrid.field[x][y-1].isShotAt())
				result.push(new orderedPair(x, y-1));
		}
		return result;
	}
}