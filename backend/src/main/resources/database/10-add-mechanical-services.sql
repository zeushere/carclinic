--liquibase formatted sql
--changeset kard:10

ALTER TABLE mechanical_service RENAME COLUMN service_cost TO expected_service_cost;

INSERT INTO mechanical_service (id, name, expected_execution_time, expected_service_cost)
VALUES (1, 'Wymiana filtra paliwa', '0.5', '30');

INSERT INTO mechanical_service (id, name, expected_execution_time, expected_service_cost)
VALUES (2, 'Wymiana oleju i filtra oleju', '0.75', '70');

INSERT INTO mechanical_service (id, name, expected_execution_time, expected_service_cost)
VALUES (3, 'Kompleksowa wymiana filtrów i oleju', '1.5', '120');

INSERT INTO mechanical_service (id, name, expected_execution_time, expected_service_cost)
VALUES (4, 'Wymiana filtra powietrza', '0.25', '30');

INSERT INTO mechanical_service (id, name, expected_execution_time, expected_service_cost)
VALUES (5, 'Wymiana filtra kabinowego', '0.5', '40');

INSERT INTO mechanical_service (id, name, expected_execution_time, expected_service_cost)
VALUES (6, 'Wymiana rozrządu', '4', '450');

INSERT INTO mechanical_service (id, name, expected_execution_time, expected_service_cost)
VALUES (7, 'Wymiana pompy hamulcowej', '3', '200');

INSERT INTO mechanical_service (id, name, expected_execution_time, expected_service_cost)
VALUES (8, 'Wymiana tarczy hamulcowej', '1.5', '150');

INSERT INTO mechanical_service (id, name, expected_execution_time, expected_service_cost)
VALUES (9, 'Wymiana linki sprzęgła', '1.5', '150');

INSERT INTO mechanical_service (id, name, expected_execution_time, expected_service_cost)
VALUES (10, 'Wymiana klocków hamulcowych', '1', '80');

INSERT INTO mechanical_service (id, name, expected_execution_time, expected_service_cost)
VALUES (11, 'Wymiana końcówki drążka kierowniczego', '1', '80');

INSERT INTO mechanical_service (id, name, expected_execution_time, expected_service_cost)
VALUES (12, 'Wymiana sprzęgła', '3', '400');

INSERT INTO mechanical_service (id, name, expected_execution_time, expected_service_cost)
VALUES (13, 'Wymiana kolumny MacPhersona', '2', '150');

INSERT INTO mechanical_service (id, name, expected_execution_time, expected_service_cost)
VALUES (14, 'Wymiana łożyska amortyzatora', '2', '150');

INSERT INTO mechanical_service (id, name, expected_execution_time, expected_service_cost)
VALUES (15, 'Wymiana cylinderków hamulcowych', '1.5', '100');

INSERT INTO mechanical_service (id, name, expected_execution_time, expected_service_cost)
VALUES (16, 'Wymiana czujnika ABS', '1', '50');

INSERT INTO mechanical_service (id, name, expected_execution_time, expected_service_cost)
VALUES (17, 'Wymiana chłodnicy silnika', '4', '350');

INSERT INTO mechanical_service (id, name, expected_execution_time, expected_service_cost)
VALUES (18, 'Wymiana poduszki amortyzatora', '1.5', '120');

INSERT INTO mechanical_service (id, name, expected_execution_time, expected_service_cost)
VALUES (19, 'Wymiana pompy wody', '2', '200');

INSERT INTO mechanical_service (id, name, expected_execution_time, expected_service_cost)
VALUES (20, 'Kompleksowa wymiana zawieszenia', '6', '450');

INSERT INTO mechanical_service (id, name, expected_execution_time, expected_service_cost)
VALUES (21, 'Wymiana bębnów hamulcowych', '2', '200');

INSERT INTO mechanical_service (id, name, expected_execution_time, expected_service_cost)
VALUES (22, 'Wymiana pompy wtryskowej', '2.5', '350');

INSERT INTO mechanical_service (id, name, expected_execution_time, expected_service_cost)
VALUES (23, 'Wymiana przewodów paliwowych', '2.5', '250');

INSERT INTO mechanical_service (id, name, expected_execution_time, expected_service_cost)
VALUES (24, 'Wymiana rezystora nagrzewnicy', '2', '100');

INSERT INTO mechanical_service (id, name, expected_execution_time, expected_service_cost)
VALUES (25, 'Wymiana pompy ABS', '3', '200');

INSERT INTO mechanical_service (id, name, expected_execution_time, expected_service_cost)
VALUES (26, 'Wymiana przepływomierza', '1.5', '150');

INSERT INTO mechanical_service (id, name, expected_execution_time, expected_service_cost)
VALUES (27, 'Wymiana uszczelki pod głowicą', '4', '400');

INSERT INTO mechanical_service (id, name, expected_execution_time, expected_service_cost)
VALUES (28, 'Wymiana uszczelki kolektora dolotowego', '2.5', '150');

INSERT INTO mechanical_service (id, name, expected_execution_time, expected_service_cost)
VALUES (29, 'Wymiana tłumika środkowego', '1.5', '150');

INSERT INTO mechanical_service (id, name, expected_execution_time, expected_service_cost)
VALUES (30, 'Wymiana rolki napinacza', '1', '100');

INSERT INTO mechanical_service (id, name, expected_execution_time, expected_service_cost)
VALUES (31, 'Wymiana sondy lambda', '1.5', '180');

INSERT INTO mechanical_service (id, name, expected_execution_time, expected_service_cost)
VALUES (32, 'Wymiana sprzęgła wiskotycznego', '2.5', '200');

INSERT INTO mechanical_service (id, name, expected_execution_time, expected_service_cost)
VALUES (33, 'Wymiana uszczelki pokrywy zaworów', '1', '100');

INSERT INTO mechanical_service (id, name, expected_execution_time, expected_service_cost)
VALUES (34, 'Wymiana piasty', '1.5', '120');

INSERT INTO mechanical_service (id, name, expected_execution_time, expected_service_cost)
VALUES (35, 'Wymiana płynu chłodniczego', '2', '150');

INSERT INTO mechanical_service (id, name, expected_execution_time, expected_service_cost)
VALUES (36, 'Wymiana linki gazu', '1.5', '100');

INSERT INTO mechanical_service (id, name, expected_execution_time, expected_service_cost)
VALUES (37, 'Wymiana półosi', '2', '300');

INSERT INTO mechanical_service (id, name, expected_execution_time, expected_service_cost)
VALUES (38, 'Wymiana zwrotnicy koła', '2', '200');

INSERT INTO mechanical_service (id, name, expected_execution_time, expected_service_cost)
VALUES (39, 'Wymiana termostatu', '2', '150');

INSERT INTO mechanical_service (id, name, expected_execution_time, expected_service_cost)
VALUES (40, 'Wymiana wycieraczek', '1', '70');

INSERT INTO mechanical_service (id, name, expected_execution_time, expected_service_cost)
VALUES (41, 'Wymiana płynu wspomagania kierownicy', '1', '100');

INSERT INTO mechanical_service (id, name, expected_execution_time, expected_service_cost)
VALUES (42, 'Wymiana wałka rozrządu', '6', '500');

INSERT INTO mechanical_service (id, name, expected_execution_time, expected_service_cost)
VALUES (43, 'Wymiana silnika regulacji biegu jałowego', '1.5', '120');

INSERT INTO mechanical_service (id, name, expected_execution_time, expected_service_cost)
VALUES (44, 'Wymiana pompy wspomagania', '2', '150');

INSERT INTO mechanical_service (id, name, expected_execution_time, expected_service_cost)
VALUES (45, 'Wymiana maglownicy', '4', '300');

INSERT INTO mechanical_service (id, name, expected_execution_time, expected_service_cost)
VALUES (46, 'Wymiana zbiornika paliwa', '3', '250');

INSERT INTO mechanical_service (id, name, expected_execution_time, expected_service_cost)
VALUES (47, 'Wymiana sprężyn zawieszenia', '3', '300');

INSERT INTO mechanical_service (id, name, expected_execution_time, expected_service_cost)
VALUES (48, 'Inna', null, null);

INSERT INTO mechanical_service (id, name, expected_execution_time, expected_service_cost)
VALUES (49, 'Diagnostyka samochodowa', null, null);

INSERT INTO mechanical_service (id, name, expected_execution_time, expected_service_cost)
VALUES (50, 'Dojazd do klienta', '1', '70');