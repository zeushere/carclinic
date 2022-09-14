--liquibase formatted sql
--changeset kard:2

CREATE TABLE ROLES
(
    id   VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE
);

INSERT INTO roles VALUES (gen_random_uuid(),'PLAYER');
INSERT INTO roles VALUES (gen_random_uuid(),'ADMIN');
