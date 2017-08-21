var db = require('../db');

module.exports = {
  messages: {
    get: function (cb) {
      db.query('SELECT messages.text, users.username, rooms.roomname, messages.createdAt FROM messages INNER JOIN users INNER JOIN rooms ON messages.user_id=users.id AND messages.room_id=rooms.id;', function(error, data) {
          cb(data);
      });
    },
    post: function () {} // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () {},
    post: function () {}
  }
};

//

