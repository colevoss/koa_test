module.exports = function(io) {
  io.on('connection', function(socket) {
    socket.broadcast.emit('someone connected', 'someone connected')

    var buttonClicks = 0;
    socket.on('button click', function(id, data) {
      console.log(id);
      buttonClicks++;
      socket.broadcast.emit('some_button click', {clickCount: buttonClicks});
    });

  });

};
