'use strict';

var _ = require('lodash');
var Game = require('./game.model');
var User = require('../user/user.model');
var ImageFinder = require('./image_finder');

// Get list of games
exports.index = function(req, res) {
  Game.find(function (err, games) {
    if(err) { return handleError(res, err); }
    return res.json(200, games);
  });
};

// Get a single game
exports.show = function(req, res) {
  Game.findById(req.params.id, function (err, game) {
    if(err) { return handleError(res, err); }
    if(!game) { return res.send(404); }
    return res.json(game);
  });
};

// Join a game
exports.join = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Game.findById(req.params.id, function (err, game) {
    if (err) { return handleError(res, err); }
    if(!game) { return res.send(404); }
    var userId = req.user._id;
    User.findById(userId, function(err, user) {
      if (err) { return handleError(res, err); }
      if(!user) { return res.send(404); }
      find_or_create_player(game, user, res);
    });
  });
  Game.find(function (err, games) {
    if(err) { return handleError(res, err); }
    return res.json(200, games);
  });
};


function find_or_create_player(game, user, res) {
  var exists = false;
  for (var i = 0; i < game.players.length; i++) {
    if (game.players[i].userId.toString() == user._id.toString()) {
      game.players[i].name = user.name;
      exists = true;
    }
  }
  if (!exists) {
    game.players.push({
      userId: user._id,
      name: user.name
    });
  }
  game.save(function (err) {
    if (err) {
      return handleError(res, err);
    }
  });
}

// Creates a new game in the DB.
exports.create = function(req, res) {
  Game.create(req.body, function(err, game) {
    if(err) { return handleError(res, err); }
    return res.json(201, game);
  });
};

// Updates an existing game in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Game.findById(req.params.id, function (err, game) {
    if (err) { return handleError(res, err); }
    if(!game) { return res.send(404); }
    var updated = _.merge(game, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, game);
    });
  });
};

// Adds a message to an existing game in the DB.
exports.createMessage = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Game.findById(req.params.id, function (err, game) {
    if (err) { return handleError(res, err); }
    if(!game) { return res.send(404); }
    var index = game.messages.length;
    game.messages.push({ text: req.body.message });
    ImageFinder.imageMe(req.body.message, function(url){
      game.messages[index].gif = url;
      game.save(function(err){});
    });
    game.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, game);
    });
  });
};

// Deletes a game from the DB.
exports.destroy = function(req, res) {
  Game.findById(req.params.id, function (err, game) {
    if(err) { return handleError(res, err); }
    if(!game) { return res.send(404); }
    game.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
