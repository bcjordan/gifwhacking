'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');
var ImageFinder = require('./image_finder');
var assert = require('assert');

describe('GET /api/games', function() {

  it('should respond with JSON array', function(done) {
    request(app)
      .get('/api/games')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Array);
        done();
      });
  });
});

describe('ImageFinder', function() {
  it('should snag Google Image queries', function(done) {
    ImageFinder.imageMe('fart', function(url) {
      assert.notEqual(url, undefined);
      assert.equal(true, url.indexOf('gif') != -1);
      done();
    });
  });
});
