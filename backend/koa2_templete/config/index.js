var development_env = require('./development');
var test_env = require('./test');
var production_env = require('./production');

module.exports = {
    development: development_env,
    test: test_env,
    production: production_env
}[process.env.NODE_ENV&&process.env.NODE_ENV.trim() || 'development']