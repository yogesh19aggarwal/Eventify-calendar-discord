import winston from "winston";

const customColors = {
    error: "red",
    warn: "yellow",
    info: "cyan",
    http: "magenta",
    debug: "green",
};

winston.addColors(customColors);

const logFormat = winston.format.printf(({ level, message, timestamp }) => {
    return `[${timestamp}] ${level}: ${message}`;
}); 

const consoleTransport = new winston.transports.Console({
    format: winston.format.combine(
        winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        winston.format.colorize(),
        logFormat
    )
});

const errorFileTransport = new winston.transports.File({
    filename: 'logs/error.log',
    level: 'error',
    format: winston.format.combine(
        winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        winston.format.uncolorize(),
        logFormat
    )
});

export const logger = winston.createLogger({
    level: "debug",
    transports: [
        consoleTransport,
        errorFileTransport
    ],
});
