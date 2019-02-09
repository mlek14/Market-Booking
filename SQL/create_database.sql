CREATE DATABASE cpt4yn5718 CHARACTER SET utf8 COLLATE utf8_general_ci;

USE `cpt4yn5718`;

CREATE TABLE `admin`
(
    `ID` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `firstname` VARCHAR(100) NOT NULL,
    `lastname` VARCHAR(100) NOT NULL,
    `email` VARCHAR(100) NOT NULL UNIQUE,
    `username` VARCHAR(50) NULL,
    `password` VARCHAR(255) NOT NULL,
    `create_dt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `update_dt` TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE `user_type`
(
    `ID` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `name` VARCHAR(20) NOT NULL UNIQUE,
    `create_dt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `update_dt` TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE `user`
(
    `ID` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `firstname` VARCHAR(100) NOT NULL,
    `lastname` VARCHAR(100) NOT NULL,
    `email` VARCHAR(100) NOT NULL UNIQUE,
    `username` VARCHAR(50) NULL,
    `password` VARCHAR(255) NOT NULL,
    `phone_no` VARCHAR(20)  NULL,
    `status` CHAR(3) NOT NULL DEFAULT 'new',
    `create_dt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `update_dt` TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
    `user_typeId` INT NOT NULL
);

CREATE TABLE market
(
    `ID` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL UNIQUE,
    `detail` TEXT NULL,
    `phone_no` VARCHAR(20) NULL,
    `email` VARCHAR(100) NULL,
    `line_id` VARCHAR(50) NULL,
    `status` CHAR(3) NOT NULL DEFAULT 'new',
    `address` TEXT NULL,
    `create_dt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `update_dt` TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
    `userId` INT NOT NULL
);

CREATE TABLE `market_booth`
(
    `ID` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `name` VARCHAR(20) NOT NULL UNIQUE,
    `price` DECIMAL(10,2) NOT NULL DEFAULT 0,
    `status` TINYINT(1) NOT NULL DEFAULT 0, 
    `create_dt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `update_dt` TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
    `marketId` INT NOT NULL
);

CREATE TABLE `market_open`
(
    `ID` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `marketId` INT NOT NULL,
    `day_name` VARCHAR(20) NOT NULL,
    `create_dt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE `market_payment`
(
    `ID` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `marketId` INT NOT NULL,
    `payment_name` VARCHAR(20) NOT NULL,
    `create_dt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE `transaction_booking`
(
    `ID` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `market_boothId` INT NOT NULL,
    `market_booth_price` DECIMAL(10,2) NOT NULL,
    `payment_name` VARCHAR(20) NOT NULL,
    `store_userId` INT NOT NULL,
    `active_day` DATE NOT NULL,
    `status` CHAR(3) NOT NULL DEFAULT 'new',
    `create_dt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `update_dt` TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO `admin` (`firstname`, `lastname`, `email`, `username`, `password`) 
VALUE ('Admin', 'Admin', 'admin@mail.com', 'admin', '1234');

INSERT INTO `user_type` (`name`) 
VALUES ('Market'), ('Store');