--liquibase formatted sql
--changeset kard:9

CREATE TABLE mechanical_service
(
    id                      BIGINT DEFAULT NULL,
    name                    VARCHAR(255) DEFAULT null,
    expected_execution_time TIME WITHOUT TIME ZONE DEFAULT null,
    service_cost            NUMERIC(15,2) DEFAULT null,
    PRIMARY KEY (id)
);

CREATE SEQUENCE seq_mechanical_service
    INCREMENT 1
    START 50
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;