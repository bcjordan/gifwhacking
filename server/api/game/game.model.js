'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var MessageSchema = new Schema({
  text: String
});

var GameSchema = new Schema({
  name: String,
  info: String,
  state: String, // 'open', 'in progress', 'ended',
  messages: [MessageSchema]
});

module.exports = mongoose.model('Game', GameSchema);
