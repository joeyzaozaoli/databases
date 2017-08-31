var Sequelize = require('sequelize');

// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".

var ORM = new Sequelize('chat', 'root', '');

var User = ORM.define('users', {
  username: Sequelize.STRING
});

var Room = ORM.define('rooms', {
  roomname: Sequelize.STRING
});

var Message = ORM.define('messages', {
  text: Sequelize.TEXT
});

User.hasMany(Message);
Room.hasMany(Message);
Message.belongsTo(User);
Message.belongsTo(Room);

User.sync();
Room.sync();
Message.sync();

module.exports = {User: User, Room: Room, Message: Message, Sequelize: Sequelize};
