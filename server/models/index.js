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
      db.query('SELECT message.text, user.username, room.roomname, message.createdAt FROM message INNER JOIN user INNER JOIN room ON message.userId=user.id AND message.roomId=room.id;', function(error, data) {
        if (!error) { cb(data); }
      });
    },

    post: function (username, roomname, text, cb) {
      getIdFromTable('user', 'username', username, function(userId) {
        getIdFromTable('room', 'roomname', roomname, function(roomId) {
          db.query(`INSERT INTO message (text, userId, roomId) VALUES ('${text}', ${userId}, ${roomId});`, function(error) {
            if (!error) { cb(); }
          });
        });
      });
    }
  },

  users: {
    get: function (cb) {
      db.query('SELECT username FROM user;', function(error, data) {
        if (!error) { cb(data); }
      });
    },

    post: function (username, cb) {
      getIdFromTable('user', 'username', username, function() {
        cb();
      });
    }
  }
};


