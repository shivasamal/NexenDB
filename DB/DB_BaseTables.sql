-- create database
create database nexen_database; 

-- create sequences
create sequence tbl_admin_seq increment 1 start 1;

create sequence tbl_subscribers_seq increment 1 start 1;

create sequence tbl_contactUs_seq increment 1 start 1;

create sequence tbl_user_seq increment 1 start 1;



--create tables
DROP TABLE IF EXISTS tbl_admin;
create table tbl_admin(
    admin_id          INTEGER               NOT NULL       DEFAULT nextval('tbl_admin_seq'),
    first_name        VARCHAR(50)           NOT NULL,
    last_name         VARCHAR(50)           NOT NULL,
    mobile            VARCHAR(50)           NOT NULL,
    email             VARCHAR(50)           NOT NULL,
    pwd               VARCHAR(50)           NOT NULL,
    created_date 			DATE                  NOT NULL       DEFAULT CURRENT_DATE,
    created_by        VARCHAR(255)          NULL           DEFAULT 'Admin',
    modified_date 		DATE      				    NOT NULL       DEFAULT CURRENT_DATE,
    modified_by 		  VARCHAR(255)          NULL,
    constraint        admin_cons            PRIMARY KEY(admin_id)
);
ALTER TABLE tbl_admin ADD UNIQUE (email);

DROP TABLE IF EXISTS tbl_subscribers;
create table tbl_subscribers(
    sub_id            INTEGER               NOT NULL       DEFAULT nextval('tbl_subscribers_seq'),
    email             VARCHAR(255)          NOT NULL,
    created_date 			DATE                  NOT NULL       DEFAULT CURRENT_DATE,
    created_by        VARCHAR(255)          NULL           DEFAULT 'User',
    modified_date 		DATE      				    NOT NULL       DEFAULT CURRENT_DATE,
    modified_by 		  VARCHAR(255)          NULL,
    constraint        subs_cons             PRIMARY KEY(sub_id)
);
ALTER TABLE tbl_subscribers ADD UNIQUE (email);

DROP TABLE IF EXISTS tbl_contactUs;
create table tbl_contactUs(
  contact_id          INTEGER               NOT NULL      DEFAULT nextval('tbl_contactUs_seq'),
  full_name           VARCHAR(50)           NOT NULL,
  subject             VARCHAR(255)          NOT NULL,
  location            VARCHAR(255)          NULL,
  email               VARCHAR(255)          NOT NULL,
  mobile              VARCHAR(20)           NULL,
  msg                 VARCHAR(255)          NULL,
  created_date 			  DATE                  NOT NULL       DEFAULT CURRENT_DATE,
  created_by          VARCHAR(255)          NULL           DEFAULT 'User',
  modified_date 			DATE      				    NOT NULL       DEFAULT CURRENT_DATE,
  modified_by 				VARCHAR(255)          NULL,
  constraint          contact_cons          PRIMARY KEY(contact_id)
);


DROP TABLE IF EXISTS tbl_user;
create table tbl_user(
    user_id           INTEGER               NOT NULL       DEFAULT nextval('tbl_user_seq'),
    first_name        VARCHAR(50)           NOT NULL,
    last_name         VARCHAR(50)           NOT NULL,
    mobile            VARCHAR(50)           NOT NULL,
    email             VARCHAR(50)           NOT NULL,
    pwd               VARCHAR(50)           NOT NULL,
    is_approved       BOOLEAN               NOT NULL       DEFAULT false,
    created_date 			DATE                  NOT NULL       DEFAULT CURRENT_TIMESTAMP,
    created_by        VARCHAR(255)          NULL           DEFAULT 'User',
    modified_date 		DATE      				    NOT NULL       DEFAULT CURRENT_TIMESTAMP,
    modified_by 		  VARCHAR(255)          NULL,
    constraint        user_cons             PRIMARY KEY(user_id)
);
ALTER TABLE tbl_user ADD UNIQUE (email);