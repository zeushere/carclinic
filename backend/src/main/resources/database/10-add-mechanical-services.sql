--liquibase formatted sql
--changeset kard:10

ALTER TABLE mechanical_service RENAME COLUMN service_cost TO expected_service_cost;

INSERT INTO mechanical_service (id, name, expected_execution_time, expected_service_cost)
VALUES (1, 'Wymiana filtra paliwa', '00:30', '30');

INSERT INTO mechanical_service (id, name, expected_execution_time, expected_service_cost)
VALUES (2, 'Wymiana oleju i filtra oleju', '0:45', '70');

INSERT INTO mechanical_service (id, name, expected_execution_time, expected_service_cost)
VALUES (3, 'Kompleksowa wymiana filtrów i oleju', '01:30', '120');

INSERT INTO mechanical_service (id, name, expected_execution_time, expected_service_cost)
VALUES (4, 'Wymiana filtra powietrza', '00:15', '30');

INSERT INTO mechanical_service (id, name, expected_execution_time, expected_service_cost)
VALUES (5, 'Wymiana filtra kabinowego', '00:30', '40');

INSERT INTO mechanical_service (id, name, expected_execution_time, expected_service_cost)
VALUES (6, 'Wymiana rozrządu', '04:00', '450');

INSERT INTO mechanical_service (id, name, expected_execution_time, expected_service_cost)
VALUES (7, 'Wymiana pompy hamulcowej', '03:00', '200');

INSERT INTO mechanical_service (id, name, expected_execution_time, expected_service_cost)
VALUES (8, 'Wymiana tarczy hamulcowej', '01:30', '150');

INSERT INTO mechanical_service (id, name, expected_execution_time, expected_service_cost)
VALUES (9, 'Wymiana linki sprzęgła', '01:30', '150');

INSERT INTO mechanical_service (id, name, expected_execution_time, expected_service_cost)
VALUES (10, 'Wymiana klocków hamulcowych', '01:00', '80');

INSERT INTO mechanical_service (id, name, expected_execution_time, expected_service_cost)
VALUES (11, 'Wymiana końcówki drążka kierowniczego', '01:00', '80');

INSERT INTO mechanical_service (id, name, expected_execution_time, expected_service_cost)
VALUES (12, 'Wymiana sprzęgła', '03:00', '400');

INSERT INTO mechanical_service (id, name, expected_execution_time, expected_service_cost)
VALUES (13, 'Wymiana kolumny MacPhersona', '02:00', '150');

INSERT INTO mechanical_service (id, name, expected_execution_time, expected_service_cost)
VALUES (14, 'Wymiana łożyska amortyzatora', '02:00', '150');

INSERT INTO mechanical_service (id, name, expected_execution_time, expected_service_cost)
VALUES (15, 'Wymiana cylinderków hamulcowych', '01:30', '100');

INSERT INTO mechanical_service (id, name, expected_execution_time, expected_service_cost)
VALUES (16, 'Wymiana czujnika ABS', '01:30', '50');

INSERT INTO mechanical_service (id, name, expected_execution_time, expected_service_cost)
VALUES (17, 'Wymiana chłodnicy silnika', '04:00', '350');

INSERT INTO mechanical_service (id, name, expected_execution_time, expected_service_cost)
VALUES (18, 'Wymiana poduszki amortyzatora', '01:30', '120');

INSERT INTO mechanical_service (id, name, expected_execution_time, expected_service_cost)
VALUES (19, 'Wymiana pompy wody', '02:00', '200');

INSERT INTO mechanical_service (id, name, expected_execution_time, expected_service_cost)
VALUES (20, 'Kompleksowa wymiana zawieszenia', '06:00', '450');

INSERT INTO mechanical_service (id, name, expected_execution_time, expected_service_cost)
VALUES (21, 'Wymiana bębnów hamulcowych', '02:00', '200');

INSERT INTO mechanical_service (id, name, expected_execution_time, expected_service_cost)
VALUES (22, 'Wymiana pompy wtryskowej', '02:30', '350');

INSERT INTO mechanical_service (id, name, expected_execution_time, expected_service_cost)
VALUES (23, 'Wymiana przewodów paliwowych', '02:30', '250');

INSERT INTO mechanical_service (id, name, expected_execution_time, expected_service_cost)
VALUES (24, 'Wymiana rezystora nagrzewnicy', '02:00', '100');

INSERT INTO mechanical_service (id, name, expected_execution_time, expected_service_cost)
VALUES (25, 'Wymiana pompy ABS', '03:00', '200');

INSERT INTO mechanical_service (id, name, expected_execution_time, expected_service_cost)
VALUES (26, 'Wymiana przepływomierza', '01:30', '150');

INSERT INTO mechanical_service (id, name, expected_execution_time, expected_service_cost)
VALUES (27, 'Wymiana uszczelki pod głowicą', '04:00', '400');

INSERT INTO mechanical_service (id, name, expected_execution_time, expected_service_cost)
VALUES (28, 'Wymiana uszczelki kolektora dolotowego', '02:30', '150');

INSERT INTO mechanical_service (id, name, expected_execution_time, expected_service_cost)
VALUES (29, 'Wymiana tłumika środkowego', '01:30', '150');

INSERT INTO mechanical_service (id, name, expected_execution_time, expected_service_cost)
VALUES (30, 'Wymiana rolki napinacza', '01:00', '100');

INSERT INTO mechanical_service (id, name, expected_execution_time, expected_service_cost)
VALUES (31, 'Wymiana sondy lambda', '01:30', '180');

INSERT INTO mechanical_service (id, name, expected_execution_time, expected_service_cost)
VALUES (32, 'Wymiana sprzęgła wiskotycznego', '02:30', '200');

INSERT INTO mechanical_service (id, name, expected_execution_time, expected_service_cost)
VALUES (33, 'Wymiana uszczelki pokrywy zaworów', '01:00', '100');

INSERT INTO mechanical_service (id, name, expected_execution_time, expected_service_cost)
VALUES (34, 'Wymiana piasty', '01:30', '120');

INSERT INTO mechanical_service (id, name, expected_execution_time, expected_service_cost)
VALUES (35, 'Wymiana płynu chłodniczego', '02:00', '150');

INSERT INTO mechanical_service (id, name, expected_execution_time, expected_service_cost)
VALUES (36, 'Wymiana linki gazu', '01:30', '100');

INSERT INTO mechanical_service (id, name, expected_execution_time, expected_service_cost)
VALUES (37, 'Wymiana półosi', '02:00', '300');

INSERT INTO mechanical_service (id, name, expected_execution_time, expected_service_cost)
VALUES (38, 'Wymiana zwrotnicy koła', '02:00', '200');

INSERT INTO mechanical_service (id, name, expected_execution_time, expected_service_cost)
VALUES (39, 'Wymiana termostatu', '02:00', '150');

INSERT INTO mechanical_service (id, name, expected_execution_time, expected_service_cost)
VALUES (40, 'Wymiana wycieraczek', '01:00', '70');

INSERT INTO mechanical_service (id, name, expected_execution_time, expected_service_cost)
VALUES (41, 'Wymiana płynu wspomagania kierownicy', '01:00', '100');

INSERT INTO mechanical_service (id, name, expected_execution_time, expected_service_cost)
VALUES (42, 'Wymiana wałka rozrządu', '06:00', '500');

INSERT INTO mechanical_service (id, name, expected_execution_time, expected_service_cost)
VALUES (43, 'Wymiana silnika regulacji biegu jałowego', '01:30', '120');

INSERT INTO mechanical_service (id, name, expected_execution_time, expected_service_cost)
VALUES (44, 'Wymiana pompy wspomagania', '02:00', '150');

INSERT INTO mechanical_service (id, name, expected_execution_time, expected_service_cost)
VALUES (45, 'Wymiana maglownicy', '04:00', '300');

INSERT INTO mechanical_service (id, name, expected_execution_time, expected_service_cost)
VALUES (46, 'Wymiana zbiornika paliwa', '03:00', '250');

INSERT INTO mechanical_service (id, name, expected_execution_time, expected_service_cost)
VALUES (47, 'Wymiana sprężyn zawieszenia', '03:00', '300');

INSERT INTO mechanical_service (id, name, expected_execution_time, expected_service_cost)
VALUES (48, 'Diagnostyka samochodowa', '01:00', 150);

INSERT INTO mechanical_service (id, name, expected_execution_time, expected_service_cost)
VALUES (49, 'Dojazd do klienta', '01:00', '70');