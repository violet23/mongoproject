const express = require('express');
const app = express();

// retrieve the configuration
const Config = require(__dirname + '/config.json');

// adding loggin middleware
//const morgan = require('morgan');

// adding body-parser
const bodyParser = require('body-parser');

// adding cors header for Access-Control-Allow-Origin
const cors = require('cors');

// adding helmet for security
//const helmet = require('helmet');

// adding mongoose ORM for mongodb
const mongoose = require('mongoose');

// To handle all deprication warnings from mongoose
// https://mongoosejs.com/docs/deprecations.html
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

// connecting to mongodb using mongoclient 
mongoose.connect('mongodb://localhost/'+Config.monogodbName,{ useNewUrlParser: true });
mongoose.Promise = global.Promise;

// enable cors
app.use(cors());

// add routes
const reviewProteinRoutes = require('./routes/reviewProteins');
const reviewTopicRoutes = require('./routes/reviewTopics');
// adding static resources 
app.use('/',express.static(Config.datasetPath));

// adding helmet
//app.use(helmet());

// adding the logger
//app.use(morgan('dev'));

// adding the body-parser to handle request bodies
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// let express use the specific routes
app.use('/reviewProteins',reviewProteinRoutes);
app.use('/reviewTopics',reviewTopicRoutes);
// handling default route errors
app.use((req,res,next) => {
    const error = new Error('Not Found'); // adding your custom error message here
    error.status = 404;
    next(error);
})

// to trigger any above route errors you define, like a 404 page or something 
app.use((error,req,res,next)=>{
    res.status(error.status || 500);
    res.json({
        error : {
            message : error.message
        }
    });
});

//listen to port
app.listen(Config.port);
console.log('Listening on port ' + Config.port);
