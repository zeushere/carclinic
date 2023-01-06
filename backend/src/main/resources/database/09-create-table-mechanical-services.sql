--liquibase formatted sql
--changeset kard:9

CREATE TABLE mechanical_services
(
    id                      BIGINT DEFAULT NULL,
    name                    VARCHAR(255) DEFAULT null,
    expected_execution_time DOUBLE PRECISION DEFAULT null,
    service_cost            DOUBLE PRECISION DEFAULT null,
    PRIMARY KEY (id)
);