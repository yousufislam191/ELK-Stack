const logger = require('../config/logger');

const requestLogger = (req, res, next) => {
    const startTime = new Date();

    res.on('finish', () => {
        const duration = new Date() - startTime;
        logger.http('Request processed', {
            method: req.method,
            url: req.url,
            status: res.statusCode,
            duration: `${duration}ms`,
            userAgent: req.get('user-agent'),
            ip: req.ip
        });
    });

    next();
};

module.exports = requestLogger;