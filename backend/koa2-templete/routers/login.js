const router = require('koa-router')();
const jwtConfig = require('../config/jwt_config');
const util = require('util');
const jwt = require('jsonwebtoken');
const verify = util.promisify(jwt.verify);      // 解密

router.post('/login', async (ctx, next) => {
    const user = ctx.request.body;
    if(user && user.name) {
        let userToken = {
            name: user.name
        };
        const token = jwt.sign(userToken, jwtConfig.secret, {
            expiresIn: '1h'     // token 签名有效期为1小时
        });
        ctx.body = {
            message: '获取token成功',
            code: 1,
            token
        };
    } else {
        ctx.body = {
            message: '参数错误',
            code: -1
        };
    }
});

router.get('/userInfo', async (ctx) => {
    const token = ctx.header.authorization;     // 获取jwt
    let payload;
    if(token) {
        payload = await verify(token.split(' ')[1], jwtConfig.secret);  // 解密， 获取payload
        ctx.body = {
            payload
        };
    } else {
        ctx.body = {
            message: 'token 错误',
            code: -1
        }
    }
});

module.exports = router;