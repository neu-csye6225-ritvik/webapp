const statsdClient = require('../../config/statsd.js');
const logger = require('../../config/logger.js');


const reqCounter = (req, res, next) => {
    res.on('finish', () => {
        var statsdTag = req.method + req.baseUrl + req.route.path + ".reqCount";
        statsdTag = statsdTag.replace(/[^a-zA-Z0-9/]+/g, ".").replace(/\//g, '.').replace(/\.{2,}/g, '.');
        logger.info("Incrementing statsd tag: " + statsdTag);
        statsdClient.increment(statsdTag);
        logger.debug("Incremented statsd tag: " + statsdTag);
    });
    next();
}


const reqTimer = (req, res, next) => {
    const start = Date.now();
    // console.log(res);
    res.on('finish', () => {
        const duration = Date.now() - start;
        var url = req.baseUrl + req.route.path.replace(/\:/g, '');
        var statsdTag = req.method + url.replace(/\//g, '.') + ".reqTime";
        statsdTag = statsdTag.replace(/\.\./g, '.');
        logger.info("Timing Request using statsd tag: " + statsdTag);
        statsdClient.timing(statsdTag, duration);
        logger.debug("Timed Request using statsd tag: " + statsdTag);
    });
    next();
}

const responseCodeCounter = (req, res, next) => {
    res.on('finish', () => {
        var url = req.baseUrl + req.route.path.replace(/\:/g, '');
        var statsdTag = req.method + url.replace(/\//g, '.') + ".resCode." + res.statusCode;
        statsdTag = statsdTag.replace(/\.\./g, '.');
        logger.info("Incrementing statsd tag: " + statsdTag);
        statsdClient.increment(statsdTag);
        logger.debug("Incremented statsd tag: " + statsdTag);
    });
    next();
}

module.exports = {reqCounter, reqTimer, responseCodeCounter};