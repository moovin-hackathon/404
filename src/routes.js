const express = require('express');
const routes = express.Router();

const Heatmap = require('./Controller/Heatmap');
const User = require('./Controller/User');


routes.post('/heatmap/notify', Heatmap.notify);

routes.post('/user', User.create);
routes.get('/user/:email', User.getUser);
routes.put('/user/:id', User.update);
routes.delete('/user/:id', User.delete);

module.exports = routes;
