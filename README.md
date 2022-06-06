# https://webdeasy.de/en/complete-login-system-with-node-js-vue-js-restapi-jwt-part-1-2/#restapi

# Translated to React

# to do:

- add blacklist tokens database and expire tokens on logout
- make login persist through page refresh

# .env file variables:

- SECRET_KEY = "TOPSECRET"
- PASSWORD_MIN_LENGTH = 6
- USERNAME_MIN_LENGTH = 3
- TOKEN_EXPIRE_TIME = "7d"

- SERVER_PORT = 5000
- HOST: 'localhost'
- DATABASE_USER: 'usersManager'
- DATABASE: 'users'
- DATABASE_PASSWORD: 'node-jwt'

# SQL schemas:

    CREATE TABLE `users`.`blacklist_tokens` (
    `token` VARCHAR(255) NOT NULL,
    `expiration_date` DATETIME NOT NULL,
    PRIMARY KEY (`token`),
    UNIQUE INDEX `token_UNIQUE` (`token` ASC) VISIBLE)
    ENGINE = InnoDB;
