var db = require('../db');

module.exports = {
  messages: {
    get: function (req, res) {
      db.Message.findAll({
        attributes: [
          'text',
          'createdAt',
          [db.Sequelize.col('username'), 'username'],
          [db.Sequelize.col('roomname'), 'roomname']
        ],
        include: [
          {model: db.User, attributes: ['username']},
          {model: db.Room, attributes: ['roomname']}
        ]
      })
        .then(function(messages) {
          res.json({results: messages});
        });
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
      db.User.findAll()
        .then(function(users) {
          res.json({results: users});
        });
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

