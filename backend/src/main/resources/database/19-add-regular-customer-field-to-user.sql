--liquibase formatted sql
--changeset kard:19

ALTER TABLE "user" ADD COLUMN regular_customer BOOLEAN DEFAULT false;

UPDATE "user" SET regular_customer = true WHERE id = 'cd354993-e308-4c8c-b887-d91a46b1cb32';