--liquibase formatted sql
--changeset kard:3

CREATE TABLE USER_ROLES (

    user_id VARCHAR(255) REFERENCES "user"(id) ON DELETE CASCADE,
    role_id   VARCHAR(255) REFERENCES roles(id) ON DELETE CASCADE,
    PRIMARY KEY (user_id,role_id)
);