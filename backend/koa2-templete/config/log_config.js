var path = require('path');

// 日志根目录
var baseLogPath = path.resolve(__dirname, '../logs');
// 日志保存时间(day)
var daysToKeep = 7;
// 编码
var encoding = 'utf-8';
// 错误日志目录
var errorPath = '/error';
// 错误日志文件名
var errorFileName = 'error';
// 错误日志输出完整路径
var errorLogPath = baseLogPath + errorPath + '/' + errorFileName;
// 响应日志目录
var responsePath = '/response';
// 响应日志文件名
var responseFileName = 'response';
// 响应日志输出完整路径
var responseLogPath = baseLogPath + responsePath + '/' + responseFileName;

module.exports = {
    "appenders": {
        "out": {
            "type": "console"
        },
        "errorLogger": {
            "type": "dateFile",
            "filename": errorLogPath,
            "alwaysIncludePattern": true,
            "pattern": '-yyyy-MM-dd.log',
            "daysToKeep": daysToKeep,
            "encoding": encoding
        },
        "resLogger": {
            "type": "dateFile",
            "filename": responseLogPath,
            "alwaysIncludePattern": true,
            "pattern": "-yyyy-MM-dd.log",
            "daysToKeep": daysToKeep,
            "encoding": encoding
        }
    },
    "categories": {
        "default": {
            "appenders": ["out"],
            "level": "info"
        },
        "errorLogger": {
            "appenders": ["errorLogger"],
            "level": "error"
        },
        "resLogger": {
            "appenders": ["resLogger"],
            "level": "info"
        }
    }
};