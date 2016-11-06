class Player {
    constructor() {
        this.homeGrid = new Grid();
		this.id = -1;
        this.fleet = new Array(4);
    }
}

class buildAFleetWindow {
	
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