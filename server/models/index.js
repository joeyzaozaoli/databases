var db = require('../db');

var getIdFromTable = function(tableName, columnHeader, value, cb) {
  db.query(`SELECT id FROM ${tableName} WHERE ${columnHeader}='${value}';`, function(error, data) {
    if (!error) {
      if (data.length > 0) {
        var id = data[0].id;
        cb(id);
      } else {
        db.query(`INSERT INTO ${tableName} (${columnHeader}) VALUES ('${value}');`, function(error) {
          if (!error) { getIdFromTable(tableName, columnHeader, value, cb); }
        });
      }
    }
  });
};

module.exports = {
  messages: {
    get: function (cb) {
      db.query('SELECT messages.text, users.username, rooms.roomname, messages.createdAt FROM messages INNER JOIN users INNER JOIN rooms ON messages.user_id=users.id AND messages.room_id=rooms.id;', function(error, data) {
        if (!error) { cb(data); }
      });
    },

    post: function (username, roomname, text, cb) {
      getIdFromTable('users', 'username', username, function(userId) {
        getIdFromTable('rooms', 'roomname', roomname, function(roomId) {
          db.query(`INSERT INTO messages (text, user_id, room_id) VALUES ('${text}', ${userId}, ${roomId});`, function(error) {
            if (!error) { cb(); }
          });
        });
      });
    }
  },

  users: {
    // Ditto as above.
    get: function () {},
    post: function () {}
  }
};


