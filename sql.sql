//postgres syntax﻿
create table Users (
id_user  SERIAL PRIMARY KEY,
pseudo varchar(50),
password varchar(50),
lastlogin date,
online boolean not null default false;
connectionNbr int not null default 0;
);