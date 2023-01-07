--liquibase formatted sql
--changeset kard:13

ALTER TABLE working_period ADD COLUMN appointment_id VARCHAR(255) DEFAULT null;

ALTER TABLE working_period ADD CONSTRAINT appointment_fk FOREIGN KEY (appointment_id) REFERENCES appointment(id);

