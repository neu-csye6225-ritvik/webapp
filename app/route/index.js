// import healthRouter from './route-health.js';
const healthRouter = require('./route-health.js');
const route = (app) => {
    app.use('/healthz',healthRouter);

    // app.all('*', (req, res) => {
    //     res.status(404).json();
    // });
}

module.exports = route;