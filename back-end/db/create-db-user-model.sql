CREATE USER 'username'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON `hrvibe`.* TO 'username'@'localhost';
FLUSH PRIVILEGES;
