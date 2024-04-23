DROP DATABASE IF EXISTS hrvibe;
CREATE DATABASE hrvibe;
USE hrvibe;

CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
);

CREATE TABLE user_data (
    data_id INT AUTO_INCREMENT PRIMARY KEY
    user_id INT,
    username VARCHAR(50) NOT NULL UNIQUE,
    height FLOAT NOT NULL,
    weight FLOAT NOT NULL,
    age INT NOT NULL,
    gender VARCHAR(10) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- CREATE TABLE entries (
--     entry_id INT AUTO_INCREMENT PRIMARY KEY,
--     user_id INT,
--     diary_entry TEXT,
--     created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
--     notes TEXT,
--     FOREIGN KEY (user_id) REFERENCES users(user_id)
-- );

-- mostly comes from kubios?!?!?!?!?!?!?!?!?!?!?!?!?!?!?!?!?!???
CREATE TABLE measurements (
    measurement_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    hrv FLOAT,
    pns FLOAT,
    sns FLOAT,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);
