--liquibase formatted sql
--changeset kard:18

CREATE TABLE rabat_code
(
    id                      BIGINT DEFAULT NULL,
    code                    VARCHAR(255) DEFAULT NULL,
    discount_size           NUMERIC(15,4),
    PRIMARY KEY (id)
);

INSERT INTO rabat_code (id, code, discount_size) VALUES (
                                                         1, 'zima', 25
                                                        );

CREATE SEQUENCE seq_rabat_code
    INCREMENT 1
    START 2
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;
