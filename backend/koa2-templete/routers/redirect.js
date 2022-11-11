const router = require('koa-router')()
const http = require('http')

const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

router.get('/req1', async (ctx, next) => {
  const response = await fetch('http://127.0.0.1:3001/redirect/req2', { redirect: 'manual' });
  if (response.status === 302) {
    const locationURL = new URL(response.headers.get('location'), response.url);
    ctx.redirect(locationURL);
    return
  }
  ctx.body = {
    message: "success"
  }
})

router.get('/req2', async (ctx, next) => {
  ctx.redirect('http://127.0.0.1:3001/redirect/req3');
})

router.get('/req3', async (ctx, next) => {
  // ctx.body = { message: "success" }
  await ctx.render('index', { title: 'request redirect test' }, true)
})

router.get('/req4', async (ctx, next) => {
  await new Promise((resolve, reject) => {
    const req = http.request('http://127.0.0.1:3001/redirect/req2', { method: 'GET' }, resp => {
      if (resp.statusCode === 302) {
        const locationURL = new URL(resp.headers.location, req.url);
        ctx.redirect(locationURL);
        resolve();
        return
      }

      let page = ''

      resp.on('data', function (chunk) {
        page += chunk;
      });

      resp.on('end', () => {
        ctx.body = page;
        resolve();
      })
    });
    req.write('string');
    req.end();
  })
})

module.exports = router;