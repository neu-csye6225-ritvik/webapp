var StatsD = require('node-statsd');
const logger = require('./logger.js');

client = new StatsD();
// client = new StatsD({mock:true});

client.socket.on('error', function (error) {
    logger.error(`Error in socket:  ${error}`);
    return console.error("Error in socket: ", error);
});
    
module.exports = client;