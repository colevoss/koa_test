var router = require('koa-router')();

var indexController = require('./controllers/index');

module.exports = router
  .get('/index/:id', indexController.index)
  .get('/about', indexController.about)
  .post('/socket_test', indexController.socketTest)
;
