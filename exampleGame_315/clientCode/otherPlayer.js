
function OtherPlayer(id) 
{
	this.id = id;
	
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

OtherPlayer.prototype.loadImages = function()
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

OtherPlayer.prototype.update = function()
{	
	// updates happen async from incoming socket io messages	
};

OtherPlayer.prototype.draw = function()
{
	// draw colored circle around the player so you know who is who haha
	drawCircle(this.id, this.position.x - 3, this.position.y + 33, 16, 16);

	// dude shadow
	//drawImage(this.dudeShadow, this.position.x - 3, this.position.y + 33, 21, 12);
	
	var f = this.facing + 4;
	var m = this.frameIndex;
				
	drawImageRect(this.dude_sheet, this.dude_sprites[m][f].x, this.dude_sprites[m][f].y, this.dude_sprites[m][f].w, this.dude_sprites[m][f].h, this.position.x - 36, this.position.y-25, this.dude_sprites[m][f].w, this.dude_sprites[m][f].h);
};

OtherPlayer.prototype.getVisualBottom = function()
{
	return this.position.y + DEFAULT_GUY_OFFSET_BOTTOM - 2;
};

