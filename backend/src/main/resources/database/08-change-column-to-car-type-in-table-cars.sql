--liquibase formatted sql
--changeset kard:8

ALTER TABLE cars RENAME COLUMN engine_capacity TO car_type;
ALTER TABLE cars ALTER COLUMN car_type TYPE VARCHAR(255)