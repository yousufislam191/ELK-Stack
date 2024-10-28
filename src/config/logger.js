const winston = require('winston');
const LogstashTransport = require('winston-logstash/lib/winston-logstash-latest');

// Define log levels and colors
const logLevels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4
};

const logColors = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'blue'
};

// Create custom format
const customFormat = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.metadata({ fillExcept: ['message', 'level', 'timestamp'] }),
    winston.format.colorize({ all: true }),
    winston.format.printf(({ level, message, timestamp, metadata }) => {
        return `${timestamp} [${level}]: ${message} ${Object.keys(metadata).length ? JSON.stringify(metadata) : ''}`;
    })
);

// Create the logger
const logger = winston.createLogger({
    levels: logLevels,
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        // Console transport
        new winston.transports.Console({
            format: customFormat
        }),
        // Logstash transport
        new LogstashTransport({
            port: 5000,
            host: 'localhost',
            node_name: 'nodejs_app',
            protocol: 'tcp'
        }),
        // File transport for errors
        new winston.transports.File({
            filename: 'logs/error.log',
            level: 'error',
            format: winston.format.json()
        }),
        // File transport for all logs
        new winston.transports.File({
            filename: 'logs/combined.log',
            format: winston.format.json()
        })
    ]
});

// Add colors to Winston
winston.addColors(logColors);

module.exports = logger;