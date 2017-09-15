
require("colors").setTheme({ silly: 'rainbow', input: 'grey', verbose: 'cyan', prompt: 'grey', info: 'green', data: 'grey', help: 'cyan', warn: 'yellow', debug: 'blue', error: 'red' });
const util = require('util')
const crypto = require('crypto');
class TradePortalUtil {
    static random(n = 8) {
        return crypto.randomBytes(n).toString('hex');
    }
}

exports.crypto = crypto;
exports.util = util;
exports.TradePortalUtil = TradePortalUtil;