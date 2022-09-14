--liquibase formatted sql
--changeset kard:5

ALTER TABLE cars
    ADD CONSTRAINT owner_id
        FOREIGN KEY (owner_id) REFERENCES "user"(id);