'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var GameSchema = new Schema({
  name: String,
  info: String,
  state: String // 'open', 'in progress', 'ended'
});

module.exports = mongoose.model('Game', GameSchema);
