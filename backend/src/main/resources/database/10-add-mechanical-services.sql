--liquibase formatted sql
--changeset kard:10

INSERT INTO mechanical_services (name, expected_execution_time, service_cost)
    VALUES (1, 'Wymiana filtra paliwa', '0.5', '30')