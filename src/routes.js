const express = require('express');
const routes = express.Router();

const Heatmap = require('./Controller/Heatmap');
const User = require('./Controller/User');
const Page = require('./Controller/Page');

routes.post('/heatmap/notify', Heatmap.notify);
routes.get('/heatmaps', Heatmap.getHetmaps);
routes.get('/heatmap/:id', Heatmap.getHetmap);

routes.post('/user', User.create);
routes.get('/user/:email', User.getUser);
routes.put('/user/:id', User.update);
routes.delete('/user/:id', User.delete);

routes.post('/page', Page.create);
routes.get('/pages', Page.getPages);
routes.get('/page/:id', Page.getPage);
routes.put('/page/:id', Page.update);
routes.delete('/page/:id', Page.delete);

module.exports = routes;
