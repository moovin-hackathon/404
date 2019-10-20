const express = require('express');
const mongoose = require('mongoose');
const databaseConfigure = require('./Configure/Database');
const app = express();
const cors = require('cors');
const requireDirectory = require('require-dir');
const path = require('path');
process.env.PORT = 3030

requireDirectory('./Entity');

mongoose.connect(
    databaseConfigure.url, 
    {
        useNewUrlParser: true, 
        useUnifiedTopology: true 
    }
);

app.use(express.json());
app.use(cors());
app.use('/files', express.static(path.resolve(__dirname, '..', 'assets')));
app.use('/pixel', express.static(path.resolve(__dirname, 'pixel.js')));

app.use('/api', require('./routes'));

app.listen(process.env.PORT);

