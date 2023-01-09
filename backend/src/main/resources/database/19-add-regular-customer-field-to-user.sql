--liquibase formatted sql
--changeset kard:19

ALTER TABLE "user" ADD COLUMN regular_customer BOOLEAN DEFAULT false;