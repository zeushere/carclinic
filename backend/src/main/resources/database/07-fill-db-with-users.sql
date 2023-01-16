--liquibase formatted sql
--changeset kard:7


INSERT INTO "user" (id, email, login, "password", first_name, last_name, address)
VALUES ('4c48fd56-c995-40d8-a62b-c5fb4e0c2eaa', 'carclinic.superuser@gmail.com', 'admin',
        '$2a$10$WLTkJpCmni/A8FCxIfPmv.9QbVe5Bg2aDWb.xpx13upjGnygkGHIG', 'admin', 'admin', 'Pigonia 1 Rzeszów'),
       ('ed3f0b7d-ef0d-43a3-9eed-e5fa2699abc4', 'carclinic.employee@gmail.com', 'employee',
        '$2a$10$BRWEGlT18f1/i2xLFVA1vujQ2gXcuwtshDc8j9anjn4FCdeuXYv9S', 'employee', 'employee', 'Pigonia 1 Rzeszów'),
       ('cd354993-e308-4c8c-b887-d91a46b1cb32', 'carclinic.user@gmail.com', 'user',
        '$2a$10$mpTaN8UHRhxZihGu1GkO3eKYYaC3fNXxNfYk.o8Dl32VYbTaflvJW', 'user', 'user', 'Pigonia 1 Rzeszów');

INSERT INTO user_roles(user_id,role_id) VALUES ('4c48fd56-c995-40d8-a62b-c5fb4e0c2eaa','ea8eade6-dd65-4ba0-bfee-00d934dfa0a5');
INSERT INTO user_roles(user_id,role_id) VALUES ('ed3f0b7d-ef0d-43a3-9eed-e5fa2699abc4','5cde3594-c90f-4625-900a-9c2fe673d865');
INSERT INTO user_roles(user_id,role_id) VALUES ('cd354993-e308-4c8c-b887-d91a46b1cb32','2d3fe1dc-9b20-42d2-9b59-a4397d5f4230');