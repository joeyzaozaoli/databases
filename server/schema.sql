CREATE DATABASE chat;

USE chat;

CREATE TABLE user (
  id INT NOT NULL AUTO_INCREMENT,
  username CHAR(35),

  PRIMARY KEY (id)
);

CREATE TABLE room (
  id INT NOT NULL AUTO_INCREMENT,
  roomname CHAR(35),

  PRIMARY KEY (id)
);

CREATE TABLE message (
  id INT NOT NULL AUTO_INCREMENT,
  text TEXT(135),
  userId INT,
  roomId INT,
  createdAt TIMESTAMP,

  PRIMARY KEY (id),
  FOREIGN KEY (userId) REFERENCES user(id),
  FOREIGN KEY (roomId) REFERENCES room(id)
);

/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

