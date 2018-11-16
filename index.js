const express = require('express');
const next = require('next');
const bodyParser = require('body-parser');
const shortid = require('shortid');
const _isEmpty = require('lodash.isempty');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const tempStore = {};

app.prepare().then(() => {
  const server = express();

  server.use(bodyParser.json());

  server.post('/dashboard', (req, res) => {
    const body = req.body;
    if (!body) return res.json({ status: 'ERROR', message: 'No data sent.' });
    const randomId = shortid.generate();
    tempStore[randomId] = req.body;
    return res.json({ status: 'OK', id: randomId });
  });

  server.get('/dashboard/:id/json', (req, res) => {
    const dashboardInfo = tempStore[req.params.id] || {};
    if (_isEmpty(dashboardInfo)) return res.json({ status: 'OK', message: 'No dashboard exists.' });

    return res.json({ status: 'OK', dashboard: dashboardInfo });
  });

  server.get('/dashboard/:id', (req, res) => {
    const dashboardInfo = tempStore[req.params.id] || {};
    if (_isEmpty(dashboardInfo)) return res.json({ status: 'OK', message: 'No dashboard exists.' });

    return app.render(req, res, '/index', { dashboard: dashboardInfo });
  });

  server.get('*', (req, res) => handle(req, res));

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
