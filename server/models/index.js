var db = require('../db');

module.exports = {
  messages: {
    get: function (cb) {
      db.query('SELECT messages.text, users.username, rooms.roomname, messages.createdAt FROM messages INNER JOIN users INNER JOIN rooms ON messages.user_id=users.id AND messages.room_id=rooms.id;', function(error, data) {
        cb(data);
      });
    },
    post: function () {}
  },

  users: {
    // Ditto as above.
    get: function () {},
    post: function () {}
  }
};

// if user exists
  // get user's id
// if room exists
  // get room's id
// insert message into messages table

// db.query('SELECT id FROM users WHERE xxx;', function(error, data) {
//   if (!error && data.length > 0) {
//     data[0].id
//   }
// });


