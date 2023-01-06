--liquibase formatted sql
--changeset kard:6

ALTER TABLE "user" ADD COLUMN first_name VARCHAR(255) NOT NULL DEFAULT 'test';
ALTER TABLE "user" ADD COLUMN last_name VARCHAR(255) NOT NULL DEFAULT 'test';
