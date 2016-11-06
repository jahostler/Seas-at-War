class Player {
    constructor() {
        this.homeGrid = new Grid();
		this.id = -1;
        this.fleet = new Array(4);
    }
}

class buildAFleetWindow {
	constructor(canvas, FPS, scale) {
		this.scale = scale;
		this.FPS = 1000/FPS;
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
		console.log(this.buildButtons);
	}
	adjust(dimension) {
		return dimension * this.scale;
	}
	draw() {
		this.context.drawImage(this.background, 0, 0, this.adjust(this.background.width), this.adjust(this.background.height));
		this.context.drawImage(this.class2, this.adjust(50), this.adjust(50), this.adjust(this.class2.width), this.adjust(this.class2.height));
		this.context.drawImage(this.class3, this.adjust(80), this.adjust(80), this.adjust(this.class3.width), this.adjust(this.class3.height));
		this.context.drawImage(this.class4, this.adjust(110), this.adjust(110), this.adjust(this.class4.width), this.adjust(this.class4.height));
		this.context.drawImage(this.class5, this.adjust(140), this.adjust(140), this.adjust(this.class5.width), this.adjust(this.class5.height));
		[].forEach.call(this.buildButtons, function(element) {
			console.log(element.style.left);
//			element.style.left = this.adjust(element.style.left);
//			element.style.top = this.adjust(element.style.top);
		})
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