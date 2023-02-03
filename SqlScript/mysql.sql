create schema inventory collate utf8mb3_general_ci;

use inventory;

create table if not exists category
(
    id          int auto_increment
    primary key,
    name        varchar(50) not null,
    description text        null
    );

create table if not exists place
(
    id          int auto_increment
    primary key,
    name        varchar(50) not null,
    description text        null
    );

create table if not exists item
(
    id           int auto_increment
    primary key,
    name         varchar(100) not null,
    category_id  int          not null,
    place_id int          not null,
    description  text         null,
    photo        text         null,
    constraint item_category_id_fk
    foreign key (category_id) references category (id)
    on update cascade on delete no action ,
    constraint item_place_id_fk
    foreign key (place_id) references place (id)
    on update cascade on delete no action
    );



INSERT INTO inventory.category (id, name, description)
VALUES (1, 'furniture', 'only big furniture');
INSERT INTO inventory.category (id, name, description)
VALUES (2, 'food', '');
INSERT INTO inventory.category (id, name, description)
VALUES (3, 'technique', '');

INSERT INTO inventory.place (id, name, description)
VALUES (1, 'class 202', '2nd flour');
INSERT INTO inventory.place (id, name, description)
VALUES (2, 'class 102', '1st flour');
INSERT INTO inventory.place (id, name, description)
VALUES (3, 'class 302', '3rd flour');
INSERT INTO inventory.place (id, name, description)
VALUES (4, 'kitchen', '2nd flour');

INSERT INTO inventory.item (id, name, category_id, place_id, description, photo)
VALUES (1, 'table', 1, 1, 'big computer table', null);
INSERT INTO inventory.item (id, name, category_id, place_id, description, photo)
VALUES (2, 'table', 1, 2, 'big computer table', null);
INSERT INTO inventory.item (id, name, category_id, place_id, description, photo)
VALUES (3, 'table', 1, 3, 'big computer table', null);
INSERT INTO inventory.item (id, name, category_id, place_id, description, photo)
VALUES (4, 'pizza', 2, 4, '', null);
INSERT INTO inventory.item (id, name, category_id, place_id, description, photo)
VALUES (5, 'coffee', 2, 4, 'big can', null);
INSERT INTO inventory.item (id, name, category_id, place_id, description, photo)
VALUES (6, 'computer', 3, 2, 'Intel Pentium i8', null);
INSERT INTO inventory.item (id, name, category_id, place_id, description, photo)
VALUES (7, 'projector', 3, 1, '', null);
