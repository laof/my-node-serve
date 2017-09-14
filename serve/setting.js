const fs = require('fs');
const path = require('path');
const webConfig = require('../src/config.json');

module.exports = () => {

    webConfig.lastTime = new Date().toLocaleString();
    webConfig.datatime = new Date().getTime();

    fs.writeFileSync(path.join(__dirname, '../src/config.json'), JSON.stringify(webConfig));

}