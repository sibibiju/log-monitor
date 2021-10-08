const fs = require('fs');
const eventEmitter = require('./event');

let startingCursor = 0;
let seperator = '/[\r]{0,1}\n/';

const readFile = (filePath) => {
    let data = fs.readFileSync(filePath).toString();
    let lines = data.split(seperator);
    for (let line of lines) {
        startingCursor += Buffer.byteLength(line);
    }
}

const watch = (filePath) => {
    readFile(filePath);
    fs.watch(filePath, (curr, prev) => {
        let readStream = fs.createReadStream(filePath, { start: startingCursor });
        readStream.on('error', (error) => next(error));
        readStream.on('data', (data) => {
            data = data.toString();
            startingCursor += Buffer.byteLength(data);

            let newLines = data.split(seperator);
            // console.log('New lines = ', newLines);
            // console.log('newLines length - ', newLines.length);
            let lastTenLines = newLines.slice(-10).join('\n');
            // console.log('lastTenLines lines = ', lastTenLines);

            // console.log('Last 10 lines length - ', lastTenLines.length);

            eventEmitter.emit('loggedNewContent', lastTenLines);
        });
    });
}

module.exports.watch = watch;