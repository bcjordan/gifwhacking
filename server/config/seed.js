/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Thing = require('../api/thing/thing.model');
var User = require('../api/user/user.model');
var Game = require('../api/game/game.model');

Game.find({}).remove(function() {
  Game.create({
      name: 'Game 1',
      info: 'This one has some gifs',
      state: 'open'
  }, {
      name: 'Another game',
      info: 'Me too',
      state: 'ended'
  }, {
      name: 'Hey, trying to game over heah!',
      info: 'Me too',
      state: 'in progress'
  }, function() {
    Game.findOne({name: 'Game 1'},
      function (err, game) {
        game.messages.push(
            { text: 'a game message' },
            { text: 'another game message' },
            { text: 'a great game message' },
            { text: 'a good game message' }
        );
        game.save();
        console.log(game);
      });
  });
});


Thing.find({}).remove(function() {
  Thing.create({
    name : 'Discover Sweet Gifs',
    info : 'Just think of your collection after playing'
  }, {
    name : 'Prove your intelligence',
    info : 'You always thought you were great at Googling stuff'
  }, {
    name : 'LOL WUT',
    info : "You'll say that sometimes"
  }, {
    name : 'Huh, interesting...',
    info : 'Discover corners of the internet, scary and wonderful'
  });
});

User.find({}).remove(function() {
  User.create({
    provider: 'local',
    name: 'Test User',
    email: 'test@test.com',
    password: 'test'
  }, {
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'admin@admin.com',
    password: 'admin'
  }, function() {
      console.log('finished populating users');
    }
  );
});
