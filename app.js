express = module.exports = require('express');

path = module.exports = require('path');
APP_PATH = module.exports = __dirname

fs = module.exports = require('fs');

JWT = module.exports = require('jsonwebtoken');


var cors = require('cors');

const app = express()
app.use(cors({
  origin: '*',
  optionsSuccessStatus: 200
}));



randomstring = module.exports = require("randomstring");

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static(path.join(__dirname, 'public'), { maxAge: "365d" }));
app.use(express.static(path.join(__dirname, 'public', 'images'), { maxAge: "365d" }));
app.use(express.static(path.join(__dirname, 'public', 'static'), { maxAge: "365d" }));


//CONFIG
CONFIG = module.exports = require('./config/config.json')
require('./comman/upload')
require('./comman/csvUpload')

// MAIL
_Mail = module.exports = require('./mails/mail');

// COMMON
_ = module.exports = require('./comman/common')
require('./comman/upload')
require('./comman/csvUpload')

//DATABASE
mongoose = module.exports = require('mongoose');

mongoose.connect('mongodb+srv://mohit:JHrUPabqHjkKhlFt@cluster0.zpihi.mongodb.net/prime_shopper?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('DATABASE CONNECTED');
});

//Schemas
require('./models/schemas');
Model = module.exports = require('./models/Model');


//Controllers
require('./controllers/__controllers__');


ONLINE_USERS = module.exports = [];

//Routes
const apiRoutes = require('./routes/api');
const sellerRoutes = require('./routes/seller');
const adminRoutes = require('./routes/adminApis');
// const admin = require('./routes/admin');


// api/v1 == PREFIX
app.use('/api/v1', apiRoutes);
app.use('/api/v1/seller', sellerRoutes);
app.use('/api/v1/admin', adminRoutes);
// app.use('/admin', admin);

module.exports = app;