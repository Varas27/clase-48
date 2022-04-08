const fs = require('fs');
const pinoms = require('pino-multi-stream')

const prettyStream = pinoms.prettyStream(
    {
        prettyPrint:
        {
            colorize: true,
            translateTime: "SYS:dd-mm-yyyy HH:MM:ss",
            ignore: "hostname"
        },
    }
);

const streams = [
    { stream: prettyStream },
    { level: 'warn', stream: fs.createWriteStream('logs/warn.log', { flags: 'a' }) },
    { level: 'error', stream: fs.createWriteStream('logs/error.log', { flags: 'a' }) }
]

const logger = pinoms(pinoms.multistream(streams));

module.exports = logger