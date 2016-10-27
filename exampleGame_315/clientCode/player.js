var PLAYER_SPEED = 1.2;
var PLAYER_ACCEL = 0.5;
var PLAYER_SPEED_FRICTION = 0.3;

var PLAYER_TURN_SPEED = 10;

var DEFAULT_GUY_OFFSET_TOP	 	= 36;
var DEFAULT_GUY_OFFSET_BOTTOM	= 42;
var DEFAULT_GUY_OFFSET_LEFT		= 3;
var DEFAULT_GUY_OFFSET_RIGHT	= 14;

function Player() 
{
	this.id = "";
	
	this.position = {
		x: 100,
		y: 500
	};	
	
	this.vector = Math.PI/2;
	
	this.velocity = 0;
	
	this.frameIndex = 0;
	this.facing = 3;
	
	this.loadImages();
};

Player.prototype.loadImages = function()
{
	this.dude_sheet = document.createElement('img');
	this.dude_sheet.src = "http://projects.cs.tamu.edu/nlupfer/art/dentler_sheet.png";
	
	
	/* Facing
	 * 
	 * 	0	Down
	 * 	1	Up
	 * 	2	Left
	 *	3	Right
	 * 
	 * Movement
	 * 
	 *	0	Standing
	 *	1	Walking
	 * 	2	Running
	 *  3	Sprinting
	 * 	4	Back Jump
	 * 	5	Rolling
	 * 	6	Side Stepping
	 *  7	Sneaking
	 *	8	Right Slap Prep
	 *	9	Right Slap Attack
	 * 	10	Left Slap Pre
	 *  11	Left Slap Attack
	 * 	12	Overhead Whack Prep
	 * 	13	Overhead Whack Attack
	 * 	14	Get Hit Hands
	 *  15	Drink Mouth Wash
	 *  16	Rest At Lamp
	 */
	
	// standing
	this.dude_sprites = [];

	//emty handed sprites
	for( var m = 0; m < 16; m++)
	{
		this.dude_sprites[m] = [];
		for( var f = 0; f < 9; f++)
		{
			var spriteX = m * 90;
			var spriteY = (f * 90) + 0;
			
			var sprite = {
					x: spriteX,
					y: spriteY,
					w: 90,
					h: 90
			};
			this.dude_sprites[m][f] = sprite;
		}
	}	
	
		
	this.dudeShadow = document.createElement('img');
	this.dudeShadow.src = "http://projects.cs.tamu.edu/nlupfer/art/dude_shadow.png";
};

Player.prototype.update = function()
{	
	var moving = false;
	var speed = PLAYER_SPEED;
	
	var vX = 0;
	var vY = 0;
	
	// set the default frame to standing
	this.frameIndex = 0;

	if(KeyHandler.up)
	{
		vY -= 1;
		moving = true;
	}
	if(KeyHandler.down)
	{
		vY += 1;
		moving = true;
	}
	if(KeyHandler.left)
	{
		vX -= 1;
		moving = true;
	}
	if(KeyHandler.right)
	{
		vX += 1;
		moving = true;
	}
	
	var newPos;

	// do basic movement
	if(moving)
	{
		// set the frame to walking
		this.frameIndex = 1; 
		
		newPos = {
			x: this.position.x + Math.sin(this.vector ) * speed * Math.abs(vX),
			y: this.position.y + Math.cos(this.vector ) * speed * Math.abs(vY)
		};		
		
		this.vector = Math.atan2(vX, vY);
		
		// set the new position	
		this.position.x = newPos.x;	
		this.position.y = newPos.y;
	}	
		
	// update facing
	var angle = this.vector * (180 / Math.PI) + 180;
	
	if(angle >= 45 && angle < 135)
		this.facing = 2;
	else if(angle >= 135 && angle < 225)
		this.facing = 0;		
	else if(angle >= 225 && angle < 315)
		this.facing = 3;
	else if(angle >= 315 && angle < 45)
		this.facing = 1;				
	else
		this.facing = 1;	
		
	// send info to the server
	var playerData = {
		id: this.id,
		pos: this.position,
		frame: this.frameIndex,
		facing: this.facing
	};
	 socket.emit("updatePlayer", playerData);
	
};

Player.prototype.draw = function()
{
	// draw colored circle around the player so you know who is who haha
	drawCircle(this.id, this.position.x - 3, this.position.y + 33, 16, 16);

	// dude shadow
	//drawImage(this.dudeShadow, this.position.x - 3, this.position.y + 33, 21, 12);
	
	var f = this.facing + 4;
	var m = this.frameIndex;
				
	drawImageRect(this.dude_sheet, this.dude_sprites[m][f].x, this.dude_sprites[m][f].y, this.dude_sprites[m][f].w, this.dude_sprites[m][f].h, this.position.x - 36, this.position.y-25, this.dude_sprites[m][f].w, this.dude_sprites[m][f].h);
	
};

Player.prototype.getVisualBottom = function()
{
	return this.position.y + DEFAULT_GUY_OFFSET_BOTTOM - 2;
};

