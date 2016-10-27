var KeyHandler = {};

KeyHandler.up = false;
KeyHandler.left = false;
KeyHandler.down = false;
KeyHandler.right = false;
KeyHandler.space = false;

KeyHandler.onKeyDown = function(event)
{
	//console.log(event.keyCode);
	switch(event.keyCode)
	{
		// W, Up Arrow
		case 87:
		case 38: 	KeyHandler.up = true;
					break;
		
		// A, Left Arrow
		case 65:
		case 37: 	KeyHandler.left = true;
					break;
		
		// S, Down Arrow
		case 83:
		case 40: 	KeyHandler.down = true;
					break;
		
		// D, Right Arrow
		case 68:
		case 39: 	KeyHandler.right = true;
					break;

		// Space
		case 32: 	KeyHandler.space = true;
					break;
	}
	
	//event.stopPropogation();
	//event.preventDefault();
	//return false;
};

KeyHandler.onKeyUp = function(event)
{
	switch(event.keyCode)
	{
		// W, Up Arrow
		case 87:
		case 38: 	KeyHandler.up = false;
					break;
		
		// A, Left Arrow
		case 65:
		case 37: 	KeyHandler.left = false;
					break;
		
		// S, Down Arrow
		case 83:
		case 40: 	KeyHandler.down = false;
					break;
		
		// D, Right Arrow
		case 68:
		case 39: 	KeyHandler.right = false;
					break;

		// Space
		case 32: 	KeyHandler.space = false;
					break;
	}
};
