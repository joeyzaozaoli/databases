CREATE DATABASE chat;

USE chat;

CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT,
  username CHAR(35) NOT NULL,

  PRIMARY KEY (id)
);

CREATE TABLE rooms (
  id INT NOT NULL AUTO_INCREMENT,
  roomname CHAR(35) NOT NULL,

  PRIMARY KEY (id)
);

CREATE TABLE messages (
  id INT NOT NULL AUTO_INCREMENT,
  text TEXT(135) NOT NULL,
  user_id INT NOT NULL,
  room_id INT NOT NULL,
  createdAt TIMESTAMP,

  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (room_id) REFERENCES rooms(id)
);

/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

