// import healthRouter from './route-health.js';
const healthRouter = require('./route-health.js');

const assignRouter = require('./assign-route.js');

const route = (app) => {
    app.use('/healthz',healthRouter);

    app.use('/v1/assignments',assignRouter)

    app.all('*', (req, res) => {
        res.status(404).json();
    });
}

module.exports = route;