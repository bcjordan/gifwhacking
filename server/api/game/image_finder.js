(function() {
  /**
   * Inspired by Hubot's Google Image Search utils
   * Translated to use the `request` library for the request
   * and lodash for randomization
   */
  var request = require('request');
  var _ = require('lodash');

  module.exports.imageMe = function(query, callback) {
    var queryParameters = {
      v: '1.0',
      rsz: '8',
      q: query,
      safe: 'active',
      imgtype: 'animated'
    };

    return request.get({
      url: 'http://ajax.googleapis.com/ajax/services/search/images',
      qs: queryParameters
    }, function(error, response, body) {
      var image, images, _ref;
      images = JSON.parse(body);
      images = (_ref = images.responseData) != null ? _ref.results : void 0;
      if ((images != null ? images.length : void 0) > 0) {
        image = _.shuffle(images)[0];
        return callback(image.unescapedUrl);
      }
    });
  };

}).call(this);
