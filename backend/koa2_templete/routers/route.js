const router = require('koa-router')();

const index = require('./index');
const users = require('./users');
const login = require('./login');

router.use('/', index.routes(), index.allowedMethods());
router.use('/api', login.routes(), login.allowedMethods());
router.use('/user', users.routes(), users.allowedMethods());

module.exports = router;