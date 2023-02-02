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
    category_id  int          null,
    place_id int          null,
    description  text         null,
    photo        text         null,
    constraint item_category_id_fk
    foreign key (category_id) references category (id)
    on update cascade on delete set null,
    constraint item_place_id_fk
    foreign key (place_id) references place (id)
    on update cascade on delete set null
    );



INSERT INTO inventory.category (id, name, description)
VALUES (1, 'furniture', 'only big furniture');

INSERT INTO inventory.place (id, name, description)
VALUES (1, 'class 202', '2nd flour');

INSERT INTO inventory.item (id, name, category_id, place_id, description, photo)
VALUES (1, 'table', 1, 1, 'big computer table', null);
