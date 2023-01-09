--liquibase formatted sql
--changeset kard:17

ALTER TABLE appointment ADD COLUMN cost NUMERIC(15,4) DEFAULT null;
