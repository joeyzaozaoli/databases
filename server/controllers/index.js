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
      db.User.findOrCreate({where: {username: msgObj.username}})
        .then(function(users) {
          db.Room.findOrCreate({where: {roomname: msgObj.roomname}})
            .then(function(rooms) {
              db.Message.create({text: msgObj.text, userId: users[0].id, roomId: rooms[0].id})
                .then(function() {
                  res.sendStatus(201);
                });
            });
        });
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
      db.User.findOrCreate({where: {username: msgObj.username}})
        .then(function() {
          res.sendStatus(201);
        });
    }
  }
};

