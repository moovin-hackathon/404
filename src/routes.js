const express = require('express');
const routes = express.Router();

const Heatmap = require('./Controller/Heatmap');
const Page = require('./Controller/Page');

routes.post('/heatmap/notify', Heatmap.notify);

routes.post('/page', Page.create);
routes.get('/pages', Page.getPages);
routes.get('/page/:id', Page.getPage);
routes.put('/page/:id', Page.update);
routes.delete('/page/:id', Page.delete);

module.exports = routes;
