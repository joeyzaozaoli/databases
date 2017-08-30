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
      db.query('SELECT messages.text, users.username, rooms.roomname, messages.createdAt FROM messages INNER JOIN users INNER JOIN rooms ON messages.userId=users.id AND messages.roomId=rooms.id;', function(error, data) {
        if (!error) { cb(data); }
      });
    },

    post: function (username, roomname, text, cb) {
      getIdFromTable('users', 'username', username, function(userId) {
        getIdFromTable('rooms', 'roomname', roomname, function(roomId) {
          db.query(`INSERT INTO messages (text, userId, roomId) VALUES ('${text}', ${userId}, ${roomId});`, function(error) {
            if (!error) { cb(); }
          });
        });
      });
    }
  },

  users: {
    get: function (cb) {
      db.query('SELECT username FROM users;', function(error, data) {
        if (!error) { cb(data); }
      });
    },

    post: function (username, cb) {
      getIdFromTable('users', 'username', username, function() {
        cb();
      });
    }
  }
};


