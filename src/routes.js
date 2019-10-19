const express = require('express');
const routes = express.Router();

const Heatmap = require('./Controller/Heatmap');

routes.post('/heatmap/notify', Heatmap.notify);

module.exports = routes;
