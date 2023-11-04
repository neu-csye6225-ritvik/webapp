const winston = require('winston');

const { createLogger, format, transports } = require('winston');
require('dotenv').config();

const logger = createLogger({
    level: 'http',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),

    format.json(),
  ),
    defaultMeta: { service: 'webapp.service' },
    transports: [
      //
      // - Write all logs with importance level of `error` or less to `error.log`
      // - Write all logs with importance level of `info` or less to `combined.log`
      //
	new winston.transports.File({ filename: 'webapp.log', level: 'info' }),
	new winston.transports.File({ filename: 'error.log', level: 'error' }),
    ],
});
  
// If we're not in production then **ALSO** log to the `console`
// with the colorized simple format.
//
if (process.env.NODE_ENV !== 'production') {
  logger.add(
    // add development metadata
    new winston.transports.Console({
      format: format.combine(
        format.colorize(),
        format.simple()
      ),
    }),
    

  );
  logger.add(new winston.transports.File({ filename: 'logs/combined.log', level: 'info' }));
}
// TODO: CHANGE THIS WHEN DEPLOYING TO CLOUDTRAIL
else if (process.env.NODE_ENV === 'production') {
    logger.add(new transports.Console({
        format: format.combine(
          format.colorize(),
          format.simple()
      ),})
    );
  logger.add(new winston.transports.File({ filename: 'logs/webapp.log', level: 'info' }));
  
}


module.exports = logger;