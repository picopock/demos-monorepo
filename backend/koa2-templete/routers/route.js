const router = require('koa-router')();

const index = require('./index');
const users = require('./users');
const login = require('./login');
const redirect = require('./redirect');

router.use('/', index.routes(), index.allowedMethods());
router.use('/api', login.routes(), login.allowedMethods());
router.use('/user', users.routes(), users.allowedMethods());
router.use('/redirect', redirect.routes(), redirect.allowedMethods());

module.exports = router;