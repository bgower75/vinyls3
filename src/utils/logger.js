const winston = require('winston');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(winston.format.timestamp({format: 'DD-MM-YYYY HH:mm:ss'}), winston.format.json()),
    defaultMeta: {service: 'user-service'},
    transports: [
        new winston.transports.File({filename: './logs/errorLog.log', level: 'error'}),
        new winston.transports.File({filename: './logs/warnLog.log', level: 'warn'}),
        new winston.transports.File({filename: './logs/infoLog.log', level: 'info'})
    ]
});

if(process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple()
    }));
}

module.exports = logger;