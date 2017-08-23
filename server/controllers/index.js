var models = require('../models');

var headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-headers': 'content-type, accept'
};

module.exports = {
  messages: {
    get: function (req, res) {
      models.messages.get(function(data) {
        headers['Content-Type'] = 'application/json';
        res.writeHead(200, headers);
        res.end(JSON.stringify({results: data}));
      });
    },

    post: function (req, res) {
      var msgObj = req.body;
      models.messages.post(msgObj.username, msgObj.roomname, msgObj.text, function() {
        res.writeHead(201, headers);
        res.end(JSON.stringify(null));
      });
    },

    options: function(req, res) {
      res.writeHead(200, headers);
      res.end();
    }
  },

  users: {
    // Ditto as above
    get: function (req, res) {},
    post: function (req, res) {}
  }
};

