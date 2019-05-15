const express = require('express');
const server = express();
//get the configuration
const Config = require(__dirname+'/config.json');

//adding body-parser
const bodyParser = require('body-parser');

//adding mongoose for mongodb
const mongoose = require('mongoose');

//handle deprication warnings  ????
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

//connecting to mongodb
mongoose.connect('mongodb://localhost/'+Config.mongodbName, {useNewUrlParser: true});
mongoose.Promise = global.Promise;

//adding routes
const reviewSampleRoutes = require('./routes/testRoutes');

//adding static resources
server.use('/images',express.static(Config.datasetPath));

//adding the body-parser to handle request bodies
server.use(bodyParser.urlencoded({extended:false}));
server.use(bodyParser.json());

//specific routes
server.use('/reviewSamples', reviewSampleRoutes);

//handle default route error
server.use((req,res,next)=> {
    const error = new Error('Not Found');
    error.status - 404;
    next(error);
})

//trigger above error
server.use((error,req,res,next)=>{
  res.status(error.status || 500);
  res.json({
      error : {
          message : error.message
      }
  });
});

//listen to port
server.listen(Config.port);
console.log('listening on port '+ Config.port);

