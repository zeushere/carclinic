--liquibase formatted sql
--changeset kard:4

CREATE TABLE cars (
    id VARCHAR(255),
    brand VARCHAR(255) DEFAULT null,
    model VARCHAR(255) not null,
    year_production VARCHAR(4) DEFAULT null,
    engine_type VARCHAR(255) DEFAULT null,
    engine_capacity VARCHAR(20) DEFAULT null,
    description VARCHAR(1200) DEFAULT null,
    image_path VARCHAR(255) DEFAULT null,
    owner_id VARCHAR(255) not null,
    PRIMARY KEY (id)
);