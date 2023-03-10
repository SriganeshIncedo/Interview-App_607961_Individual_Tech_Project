CREATE DATABASE interviewdb;

USE interviewdb;

CREATE TABLE interviews (
  id INT NOT NULL AUTO_INCREMENT,
  interviewer VARCHAR(255) NOT NULL,
  grade VARCHAR(255) NOT NULL,
  interviewee VARCHAR(255) NOT NULL,
  recruiter VARCHAR(255) NOT NULL,
  project VARCHAR(255) NOT NULL,
  position VARCHAR(255) NOT NULL,
  date DATE NOT NULL,
  photo BLOB,
  result VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
);