class Player {
    constructor() {
        this.homeGrid = new Grid();
		this.id = -1;
        this.fleet = new Array(4);
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

class BattleShip {
    
}