var config = require('../../config');

var terceros = [];

module.exports = function(app, express) {

  var apiRouter = express.Router();

  // test route to make sure everything is working
  // accessed at GET http://localhost:8080/api
  apiRouter.get('/', function(req, res) {
    res.json({
      message: 'Welcome to our api!'
    });
  });

  // on routes that end in /menu/findAll
  // ----------------------------------------------------
  apiRouter.route('/menu/findAll')
    .post(function(req, res) {
      var menu = require('../models/menu.json');
      res.json(menu);
    });

  // on routes that end in /tercero/tiposDocumento
  // ----------------------------------------------------
  apiRouter.route('/tercero/tiposDocumento')
    .post(function(req, res) {
      var menu = require('../models/terceros/tipos.json');
      res.json(menu);
    });

  // on routes that end in /tercero/save
  // ----------------------------------------------------
  apiRouter.route('/tercero/save')
    .post(function(req, res) {
      terceros.push(req.body);
      res.send({
        message: 'Exito'
      });
    });

  // on routes that end in /tercero/findAll
  // ----------------------------------------------------
  apiRouter.route('/tercero/findAll')
    .post(function(req, res) {
      res.json(terceros);
    });

  // on routes that end in /users
  // ----------------------------------------------------
  apiRouter.route('/users')
    // get all the users (accessed at GET http://localhost:8080/api/users)
    .get(function(req, res) {
      User.find(function(err, users) {
        if (err) res.send(err);
        // return the users
        res.json(users);
      });
    });

  // on routes that end in /users/:user_id
  // ----------------------------------------------------
  apiRouter.route('/users/:user_id')
    // get the user with that id
    .get(function(req, res) {
      User.findById(req.params.user_id, function(err, user) {
        if (err) res.send(err);
        // return that user
        res.json(user);
      });
    })
    // update the user with this id
    .put(function(req, res) {
      User.findById(req.params.user_id, function(err, user) {
        if (err) res.send(err);

        //set the new user information if it exists in the request
        if (req.body.name) user.name = req.body.name;
        if (req.body.email) user.email = req.body.email;
        if (req.body.password) user.password = req.body.password;

        // save the user
        user.save(function(err) {
          if (err) res.send(err);
          // return a message
          res.json({
            message: 'User updated!'
          });
        });
      });
    })
    // delete the user with this id
    .delete(function(req, res) {
      User.remove({
        _id: req.params.user_id
      }, function(err, user) {
        if (err) res.send(err);
        res.json({
          message: 'Successfully deleted'
        });
      });
    });

  // on routes that end in /candidates/:candidate_id
  // ----------------------------------------------------
  apiRouter.route('/candidates/:candidate_id')
    // get the user with that id
    .get(function(req, res) {
      var candidate = require('../models/phones/' + req.params.candidate_id);
      res.json(candidate);
    });

  // Return api router
  return apiRouter;
};
