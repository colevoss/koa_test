var io = require('socket.io-emitter')({ host: 'localhost', port: 6379 });
module.exports.index = function *(next) {
  console.log(this.params);
  yield this.render('index', this.params);
};

module.exports.about = function *(next) {
  this.body = '<h1>Hello! This is the about page</h1>';
  yield next;
};


module.exports.socketTest = function *(next) {
  console.log(this.request.body);
  io.emit('a message', this.request.body);
  this.request.body = 'good job';
  yield next;
};
