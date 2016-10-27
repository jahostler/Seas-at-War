
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var fs = require('fs');
var path = require('path');

app.get('/', function(request, response){
    console.log('request starting...');

    var filePath = '.' + request.url;
    if (filePath == './')
        filePath = './index.html';

    var extname = path.extname(filePath);
    var contentType = 'text/html';
    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;      
        case '.jpg':
            contentType = 'image/jpg';
            break;
        case '.wav':
            contentType = 'audio/wav';
            break;
    }

    fs.readFile(filePath, function(error, content) {
        if (error) {
            if(error.code == 'ENOENT'){
                fs.readFile('./404.html', function(error, content) {
                    response.writeHead(200, { 'Content-Type': contentType });
                    response.end(content, 'utf-8');
                });
            }
            else {
                response.writeHead(500);
                response.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
                response.end(); 
            }
        }
        else {
            response.writeHead(200, { 'Content-Type': contentType });
            response.end(content, 'utf-8');
        }
    });

});


var players = new Map();

io.on('connection', function(socket){
 	 console.log('a user connected');
  
  	// set unique user id back to the client
  	var newID = createNewID();
  	socket.emit("welcome", {id: newID});

    // create array of players
    var playersArray = [];
    for(var i of players.values())
    {
        playersArray.push(i);
    }

  	socket.emit("allPlayers", {players: playersArray});

    socket.on('addPlayer', function(msg)
	{
		console.log("adding a player");
        players.set(msg.id, msg);
		socket.broadcast.emit("addPlayer", msg);
	});
	
	socket.on('removePlayer', function(msg)
	{
        console.log("removing player");
        players.delete(msg.id);
		socket.broadcast.emit("removePlayer", msg);
	});
	
	socket.on('updatePlayer', function(msg)
	{
		socket.broadcast.emit("updatePlayer", msg);
	});
  
});


http.listen(13372, function(){
  console.log('listening on *:13372');
});


// very bad unique id function, plz fixerino
// just creates a random color to use as the ID
function createNewID()
{
	return getRandomColor();
}

function getRandomColor()
{
    var r = Math.floor(Math.random() * 255);
    var g = Math.floor(Math.random() * 255);
    var b = Math.floor(Math.random() * 255);
    
    return "rgb("+r+", "+g+", "+b+")";
};

