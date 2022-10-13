const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const jsonConfig = 'config.json';
let config = {}
if (fs.existsSync(path.join(__dirname, 'config.json'))) {
    configFile = JSON.parse(fs.readFileSync(path.resolve('config', jsonConfig)))
    if (Object.keys(configFile).length > 0) {
        config = configFile
    } else {
        const generateTime = (new Date()).getTime()
        const generateUniqueChar = Math.random()
        config = {
            id: generateTime.toString(36) + generateUniqueChar.toString(36).slice(2),
            time: generateTime
        }
        fs.writeFileSync(path.resolve('config', jsonConfig), JSON.stringify(config, null, 4));
    }
} else {
    const generateTime = (new Date()).getTime()
    const generateUniqueChar = Math.random()
    config = {
        id: generateTime.toString(36) + generateUniqueChar.toString(36).slice(2),
        time: generateTime
    }
    fs.writeFileSync(path.resolve('config', jsonConfig), JSON.stringify(config, null, 4));
}


module.exports = { ...config }