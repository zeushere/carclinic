--liquibase formatted sql
--changeset kard:12

CREATE TABLE working_period
(
    id                      BIGINT DEFAULT NULL,
    date                    TIMESTAMP WITHOUT TIME ZONE DEFAULT null,
    available VARCHAR(255) DEFAULT null,
    PRIMARY KEY (id)
);

CREATE SEQUENCE seq_working_period
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

INSERT INTO working_period(id, date, available) SELECT nextval('seq_working_period'),to_timestamp(to_char(tstamp , 'YYYY-MM-DD HH24:MI'),'YYYY-MM-DD HH24:MI'), 'WOLNE'
FROM generate_series(TIMESTAMP '2023-01-01', TIMESTAMP '2023-12-31', INTERVAL  '1 day') AS start_of_week
         CROSS JOIN generate_series(start_of_week::DATE, start_of_week::DATE+ '1 day'::INTERVAL, '15 min'::INTERVAL) AS tstamp
WHERE (tstamp- INTERVAL '7h')::TIME BETWEEN '0:00' AND '9:45' AND EXTRACT(dow FROM tstamp) BETWEEN 1 AND 5;