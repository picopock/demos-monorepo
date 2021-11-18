const Koa = require('koa');
const app = new Koa();
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const json = require('koa-json');
const static = require('koa-static');
const jwt = require('koa-jwt');
const cors = require('kcors');
const logUtil = require('./utils/log_util');
const jwtConfig = require('./config/jwt_config');
const router = require('./routers/route');
// error handler
onerror(app);

// middlewares
app.use(bodyparser({
	enableTypes: ['json', 'form', 'text']		// parser will only parse when request type hits enableTypes, default is ['json', 'form'].
}));

app.use(json({
	pretty: true,		// default to pretty response, default to true
	param: 'pretty',	// optional query-string param for pretty responses, default to none
	spaces: 4			// JSON spaces, default to 2
}));

app.use(cors({
	origin: 'http://localhost:3001/',							// {String|Function(ctx)} origin `Access-Control-Allow-Origin`, default is '*'
	allowMethods: ['GET', 'HEAD', 'PUT', 'POST', 'DELETE', 'PATCH', 'OPTIONS'],		// {String|Array} allowMethods `Access-Control-Allow-Methods`, default is 'GET,HEAD,PUT,POST,DELETE,PATCH'
}))

// jwt
app.use(jwt({secret: jwtConfig.secret}).unless({
	path: [/^(?!\/api).*/,/^\/api\/login/, /^\/api\/register/]		// 数据中的路径不需要要通过jwt验证
}));

app.use(static(__dirname + '/public'));

// logger
app.use(async (ctx, next) => {
	// 响应开始时间
	const start = new Date();
	// 响应间隔时间
	var ms;
	try {
		// 开始进入到下一个中间件
		await next();
		ms = new Date() - start;
		// 记录响应日志
		logUtil.logResponse(ctx, ms);
	} catch (error) {
		ms = new Date() - start;
		// 记录异常日志
		logUtil.logError(ctx, error, ms);
	}
});

// 路由入口
app.use(router.routes())
	.use(router.allowedMethods());

// 404 重定向到/
app.use(async (ctx, next) => {
	if(ctx.status === 404) {
		ctx.redirect('/');
	}
	next();
})

// error-handling
app.on('error', (err, ctx) => {
	console.error('server error', err, ctx)
});

module.exports = app;