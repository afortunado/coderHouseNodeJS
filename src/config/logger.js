import winston from "winston";
import config from './config.js'

const customLevelOptions = {
    levels:{
        debug: 0,
        http: 1,
        info: 2,
        warning: 3,
        error: 4,
        fatal: 5
    }
}

const devLogger = winston.createLogger({
    Levels: customLevelOptions.levels,
    transports: [
        new winston.transports.Console({level: "debug"})
    ]
})

const prodLogger = winston.createLogger({
    Levels: customLevelOptions.levels,
    transports: [
        new winston.transports.Console({level:"info"}),
        new winston.transports.File({filename:"./errors.log", level: "error"})
    ]
})

export const addLogger = (req, res, next) => {
    if(config.enviroment === "development"){
        req.logger = devLogger;

        req.logger.debug(`${req.method} through ${req.url} - at ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`)
        req.logger.http(`${req.method} through ${req.url} - at ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`)
        req.logger.info(`${req.method} through ${req.url} - at ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`)
        req.logger.warning(`${req.method} through ${req.url} - at ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`)
        req.logger.error(`${req.method} through ${req.url} - at ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`)
        req.logger.fatal(`${req.method} through ${req.url} - at ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`)

    } else {
        req.logger = prodLogger;

        req.logger.info(`${req.method} through ${req.url} - at ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`)
        req.logger.warning(`${req.method} through ${req.url} - at ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`)
        req.logger.error(`${req.method} through ${req.url} - at ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`)
        req.logger.fatal(`${req.method} through ${req.url} - at ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`)
    
    }
    
    next();

}
