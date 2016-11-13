//TODO: add comments
class moveableShip {
	constructor(name,shipSize,mainX,mainY) {
		this.shipName = name;
		this.mainX = mainX;
		this.mainY = mainY;
		this.mainPoint = new orderedPair(mainX,mainY);
		this.vert = true;
		this.length = shipSize;
		this.alive = true;
	}
	updateAlive() {
		var posArray = this.currentPosArray();
		var counter = 0;
		for (var i = 0; i < posArray.length; i++) {
			if (client.homeGrid.field[posArray[i].posX][posArray[i].posY].shipHit)
				counter++;
		}
		if (counter == this.length) {
			this.alive = false;
		}
			
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