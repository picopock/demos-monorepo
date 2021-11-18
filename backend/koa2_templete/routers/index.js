const router = require('koa-router')();

router.get('/', async (ctx, next) => {
  ctx.cookies.set(
    'cid',
    'hello world',
    {
      domain: 'localhost',
      path: '/',
      maxAge: 10*60*1000,
      expires: new Date('2017-9-21'),
      httpOnly: false,
      overwrite: false
    }
  )
  ctx.body = 'Hello Koa2!!';
});

module.exports = router;
