var self;
var enemy;

var loadGame = function() {
    var socket = io.connect();
    socket.on('new player', function(data) {
        self = data.player;
    });
	console.log(self.id);
    socket.emit('new player created', {'id' : self.id});
}