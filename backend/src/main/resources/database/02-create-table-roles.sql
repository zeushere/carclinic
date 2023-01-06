--liquibase formatted sql
--changeset kard:2

CREATE TABLE ROLES
(
    id   VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE
);

INSERT INTO roles (id, "name")
VALUES ('ea8eade6-dd65-4ba0-bfee-00d934dfa0a5', 'ADMIN'),
       ('5cde3594-c90f-4625-900a-9c2fe673d865', 'EMPLOYEE'),
       ('2d3fe1dc-9b20-42d2-9b59-a4397d5f4230', 'USER');

