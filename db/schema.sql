DROP TABLE IF EXISTS movies;

CREATE TABLE movies (
  ID SERIAL UNIQUE PRIMARY KEY,
  title VARCHAR(255),
  description TEXT,
  year INT,
  director VARCHAR(255),
  actors VARCHAR(255),
  showtimes VARCHAR(255),
  img_url VARCHAR(255),
  imdbID VARCHAR(255)
);