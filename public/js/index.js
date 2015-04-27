console.log('here i am');

var socket = io.connect('http://localhost:3000');

socket.on('someone connected', function(msg) {console.log(msg);});
socket.on('a message', function(msg) {console.log(msg);});

socket.on('some_button click', function(data) {
  console.log(data);
});


function clickButton() {
  socket.emit('button click', {test: 'channel_1'});
}
