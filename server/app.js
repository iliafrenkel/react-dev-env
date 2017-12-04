/* eslint max-params: ["error", 4] */
/* eslint no-unused-vars: ["error", { "args": "none" }] */

const bodyParser = require('body-parser');
const express = require('express');

const app = express();
const path = require('path');

const apiRouter = new express.Router();
const uiRouter = new express.Router();

/**
 * GET /data
 * Returns data from the API as a JSON string.
 */
apiRouter.route('/data').get((req, res) => {
    res.json({
        'count': 3,
        'data': [{
            'id': 1,
            'text': 'Data item 1'
        }, {
            'id': 2,
            'text': 'Data item 2'
        }, {
            'id': 3,
            'text': 'Data item 3'
        }]
    });
});

uiRouter.route('/').get((req, res) => {
    res.sendFile(path.join(__dirname, '../static/index.html'));
});

uiRouter.route('/favicon.ico').get((req, res) => {
    res.sendFile(path.join(__dirname, '../static/favicon.ico'));
});

app.use('/assets',
    express.static(path.join(__dirname, '../static/assets')));

app.use(bodyParser.json({'type': 'application/json'}));
app.use('/api/v1', apiRouter);
app.use('/', uiRouter);

// Error handling
app.use((req, res, next) => {
    let err = new Error(`Cannot find requested resource: ${req.url}`);
    err.status = 404;
    next(err);
});
if (app.get('env') === 'development') {
    app.use((err, req, res, next) => {
        console.error(err.stack);
        res.status(err.status || 500);
        res.send({
            'error': err,
            'message': err.message
        });
    });
}
// Production error handler - no stacktraces leaked to user
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
        'error': {},
        'message': err.message
    });
});

console.log('API endpoints for /api/v1:');
apiRouter.stack.forEach((item) => {
    if (item.route && item.route.path) {
        console.log('\t-> ',
            Object.keys(item.route.methods)[0].toUpperCase(),
            '\t',
            item.route.path
        )
    }
})

module.exports = app;
