--liquibase formatted sql
--changeset kard:11

CREATE TABLE appointment
(
    id       VARCHAR(255),
    date     DATE DEFAULT null,
    from_time TIME WITHOUT TIME ZONE DEFAULT null,
    to_time TIME WITHOUT TIME ZONE DEFAULT null,
    description VARCHAR(1200) DEFAULT null,
    image_path VARCHAR(255) DEFAULT null,
    repair_type VARCHAR(255) DEFAULT null,
    repair_status VARCHAR(255) DEFAULT null,
    payment_type VARCHAR(255) DEFAULT null,
    payment_status VARCHAR(255) DEFAULT null,
    user_id VARCHAR(255) DEFAULT null,
    mechanical_service_id BIGINT DEFAULT null,
    car_id VARCHAR(255) DEFAULT null,

    CONSTRAINT appointment_pkey primary key (id),
    CONSTRAINT appointment_user_fk foreign key (user_id) references "user" (id),
    CONSTRAINT appointment_mechanical_services_fk foreign key (mechanical_service_id) references mechanical_service (id),
    CONSTRAINT appointment_cars_fk foreign key (car_id) references cars (id)
);