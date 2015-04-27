var koa = require('koa');
var router = require('koa-router')();
var routes = require('./routes')
var koa_static = require('koa-static')
var bodyParser = require('koa-bodyparser');
var views = require('koa-views')
var socks = require('./io/socks')
var redis = require('socket.io-redis');
var app = koa();


app.use(koa_static(__dirname + '/public'));
app.use(bodyParser());

app.use(views('views', {
  map: {jade: 'jade'},
  default: 'jade'
}));

app
  .use(responseTime)
  .use(routes.routes())
  .use(router.allowedMethods());


function *responseTime(next) {
  var start = new Date;
  yield next;
  var ms = new Date - start;
  this.set('X-Response-Time', ms + 'ms');
}

var server = require('http').createServer(app.callback())

var io = require('socket.io')(server);
io.adapter(redis({host: 'localhost', port: 6379}));

socks(io);

server.listen(3000);
console.log('Koa is listening on port 3000!')
