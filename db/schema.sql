CREATE DATABASE IF NOT EXISTS pokemans;
USE pokemans;
CREATE TABLE users ( 
	id int AUTO_INCREMENT,
	username varchar(20),
	fullname varchar(20),
	password varchar(128),
	PRIMARY KEY (id)
);


-- USE pokemans;

-- DROP TABLE IF EXISTS user;
-- CREATE TABLE user (
--   id INT NOT NULL AUTO_INCREMENT,
--   name VARCHAR(30) NOT NULL,
--   PRIMARY KEY (id)
-- );

-- DROP TABLE IF EXISTS collection;
-- CREATE TABLE collection (
--   id INT NOT NULL AUTO_INCREMENT,
--   collection_name VARCHAR(30) NOT NULL,
--   name VARCHAR(255) NOT NULL,
--   PRIMARY KEY (id)
--   FOREIGN KEY (collection_id)
--   REFERENCES pokemon(id)
-- );

-- DROP TABLE IF EXISTS cards;
-- CREATE TABLE cards (
--   id INT NOT NULL AUTO_INCREMENT,
--   card_name VARCHAR(30) NOT NULL,
--   card_type VARCHAR(30) NOT NULL,
--   card_number INT NOT NULL,
--   PRIMARY KEY (id)
--   FOREIGN KEY (cards_id) 
--   REFERENCES cards(id)

--   ON DELETE SET NULL
-- );

-- possible working schema for database tables, referencing for future use, and testing for api calls for card infor via pokemontcg key
-- if table breaks then update collection database in models route
