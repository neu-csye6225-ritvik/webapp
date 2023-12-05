const healthRouter = require('./route-health.js');

const assignRouter = require('./assign-route.js');
const submissionRouter = require('./submission-route.js');

const route = (app) => {
    app.use('/healthz', healthRouter);

    app.use('/v3/assignments', assignRouter)

    app.use('/v3/assignments', submissionRouter)

    app.all('*', (req, res) => {
        if (req.method === 'PATCH') {
            res.status(405).json();
        }
        res.status(404).json();
    });
}

module.exports = route;