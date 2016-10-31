"use strict";
// var app = require("http");
// var http = require('http').Server(app);
// var io = require('socket.io')(http);
// var fs = require('fs');
// var path = require('path');

// const requestHandler = (request, response) => {  
  // console.log(request.url)
  // response.end('Hello Node.js Server!')
// }

// const server = http.createServer(requestHandler)

var portNumber = 35000;
if (process.argv.length >= 2) {
	portNumber = process.argv[2];
}

class Grid {
	constructor() {
		this.area = new Array(9);
		for (var i = 0; i < 9; i++) {
			this.area[i] = new Array(9);
		}
	}
};

class Tile {
	
}

// http.listen(35008, function(){
  // console.log('listening on *: ' + portNumber);
// });