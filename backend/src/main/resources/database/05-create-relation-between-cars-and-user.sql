--liquibase formatted sql
--changeset kard:5

ALTER TABLE cars
    ADD CONSTRAINT user_id
        FOREIGN KEY (user_id) REFERENCES "user"(id);