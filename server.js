// BASE SETUP
// ======================================

// CALL THE PACKAGES --------------------
var express = require('express'), // call express
  bodyParser = require('body-parser'), // get body-parser
  cors = require('cors'),
  morgan = require('morgan'), // used to see requests
  path = require('path'),
  config = require('./config'),
  app = express(); // define our app using express

// APP CONFIGURATION ==================
// ====================================
// use body parser so we can grab information from POST requests
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// configure our app to handle CORS requests
app.use(cors());

// log all requests to the console
app.use(morgan('dev'));

// set static files location
// used for requests that our frontend will make
app.use('/', express.static(__dirname + '/public'));

// ROUTES FOR OUR API =================
// ====================================

// API ROUTES ------------------------
var apiRoutes = require('./app/routes/api')(app, express);
app.use('/api', apiRoutes);

// MAIN CATCHALL ROUTE ---------------
// SEND USERS TO FRONTEND ------------
// has to be registered after API ROUTES
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});

// START THE SERVER
// ====================================
app.listen(config.port);
console.log('Magic happens on port ' + config.port);
