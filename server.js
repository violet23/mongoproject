var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000;
  mongoose = require('mongoose'),
  Task = require('./api/models/testModel'),
  bodyParser = require('body-parser');

  mongoose.Promise = global.Promise;
  mongoose.connect('mongodb://localhost/test');

  app.use(bodyParser.urlencoded({extended:true}));
  app.use(bodyParser.json());

  var routes = require('./api/routes/testRoutes');
  routes(app);

app.listen(port);

console.log('Test RESTful API server started on: ' + port);