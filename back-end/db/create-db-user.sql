CREATE USER 'username'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON `database-name`.* TO 'username'@'localhsot';
FLUSH PRIVILEGES;