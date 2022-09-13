--liquibase formatted sql
--changeset kard:1
CREATE TABLE "user" (
    id VARCHAR(255),
    email VARCHAR( 255 ) not null UNIQUE,
    login VARCHAR ( 24 ) not null UNIQUE,
    password VARCHAR (255) not null,
    PRIMARY KEY (id)
);