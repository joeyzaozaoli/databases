var db = require('../db');

module.exports = {
  messages: {
    get: function (req, res) {
      // models.messages.get(function(data) {
      //   res.json({results: data});
      // });
    },

    post: function (req, res) {
      var msgObj = req.body;
      // models.messages.post(msgObj.username, msgObj.roomname, msgObj.text, function() {
      //   res.sendStatus(201);
      // });
    }
  },

  users: {
    get: function (req, res) {
      // models.users.get(function(data) {
      //   res.json({results: data});
      // });
    },

    post: function (req, res) {
      var userObj = req.body;
      // models.users.post(userObj.username, function() {
      //   res.sendStatus(201);
      // });
    }
  }
};

