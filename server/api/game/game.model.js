'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    UserSchema = require('../user/user.model.js');

var MessageSchema = new Schema({
  text: String,
  gif: String
});

var PlayerSchema = new Schema({
  userId: Schema.Types.ObjectId,
  name: String
});

var GameSchema = new Schema({
  name: String,
  info: String,
  state: String, // 'open', 'in progress', 'ended',
  messages: [MessageSchema],
  players: [PlayerSchema],
  turnPlayerIndex: { type: Number, default: 0 }
});

module.exports = mongoose.model('Game', GameSchema);
