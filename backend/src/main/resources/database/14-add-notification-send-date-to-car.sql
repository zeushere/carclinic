--liquibase formatted sql
--changeset kard:14

ALTER TABLE cars ADD COLUMN notification_send TIMESTAMP WITHOUT TIME ZONE DEFAULT null;
