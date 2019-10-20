const express = require('express');
const mongoose = require('mongoose');
const databaseConfigure = require('./Configure/Database');
const app = express();
const cors = require('cors');
const requireDirectory = require('require-dir');

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

app.use('/api', require('./routes'));

app.listen(process.env.PORT);

