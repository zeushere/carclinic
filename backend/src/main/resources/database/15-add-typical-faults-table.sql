--liquibase formatted sql
--changeset kard:15

CREATE TABLE typical_faults
(
    id                      BIGINT DEFAULT NULL,
    name                    VARCHAR(255) DEFAULT NULL,
    brand                   VARCHAR(255) DEFAULT null,
    model                   VARCHAR(255) DEFAULT null,
    year_production_from    INTEGER DEFAULT NULL,
    year_production_to      INTEGER DEFAULT NULL,
    engine_type             VARCHAR(255) DEFAULT null,
    PRIMARY KEY (id)
);

CREATE SEQUENCE seq_typical_faults
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;