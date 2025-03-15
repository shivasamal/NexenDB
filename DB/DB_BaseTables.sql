-- create database
create database slnst_database; 

-- create sequences
create sequence tbl_admin_seq increment 1 start 1;

create sequence tbl_subscribers_seq increment 1 start 1;

create sequence tbl_contactUs_seq increment 1 start 1;

create sequence tbl_donation_types_seq increment 1 start 1;

create sequence tbl_donations_seq increment 1 start 1;

create sequence tbl_event_types_seq increment 1 start 1;

create sequence tbl_events_seq increment 1 start 1;

create sequence tbl_astrlgy_vastu_services_seq increment 1 start 1;

create sequence tbl_piligrim_services_seq increment 1 start 1;

create sequence tbl_user_seq increment 1 start 1;

create sequence tbl_panchangam_seq increment 1 start 1;

create sequence tbl_services_at_temple_seq increment 1 start 1;


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

DROP TABLE IF EXISTS tbl_donation_types;
create table tbl_donation_types(
  donation_type_id    INTEGER               NOT NULL       DEFAULT nextval('tbl_donation_types_seq'),
  donation_type       VARCHAR(50)           NOT NULL,
  donation_code       VARCHAR(50)           NOT NULL,
  created_date 			  DATE                  NOT NULL       DEFAULT CURRENT_DATE,
  created_by          VARCHAR(255)          NULL           DEFAULT 'Admin',
  modified_date 			DATE  				        NOT NULL       DEFAULT CURRENT_DATE,
  modified_by 				VARCHAR(255)          NULL,
  constraint          dntn_type_cons        PRIMARY KEY(donation_type_id)
);

DROP TABLE IF EXISTS tbl_donations;
create table tbl_donations(
  donation_id         INTEGER               NOT NULL       DEFAULT nextval('tbl_donations_seq'),
  dntn_type           SMALLINT              NOT NULL,
  first_name          VARCHAR(50)           NOT NULL,
  last_name           VARCHAR(255)          NOT NULL,
  email_id            VARCHAR(255)          NOT NULL,
  mobile              VARCHAR(20)           NOT NULL,
  gothram             VARCHAR(255)          NULL,
  dntn_amt            BIGINT                NOT NULL,
  is_display          BOOLEAN               NULL,
  is_approved         BOOLEAN               NOT NULL,
  created_date 			  DATE                  NOT NULL       DEFAULT CURRENT_DATE,
  created_by          VARCHAR(255)          NULL,
  modified_date 			DATE      				    NOT NULL       DEFAULT CURRENT_DATE,
  modified_by 				VARCHAR(255)          NULL,
  constraint          donation_cons         PRIMARY KEY(donation_id)
);

DROP TABLE IF EXISTS tbl_event_types;
create table tbl_event_types(
  event_type_id       INTEGER               NOT NULL       DEFAULT nextval('tbl_event_types_seq'),
  event_type          VARCHAR(50)           NOT NULL,
  created_date 			  DATE                  NOT NULL       DEFAULT CURRENT_DATE,
  created_by          VARCHAR(255)          NULL,
  modified_date 			DATE  				        NOT NULL       DEFAULT CURRENT_DATE,
  modified_by 				VARCHAR(255)          NULL,
  constraint          event_type_cons       PRIMARY KEY(event_type_id)
);

DROP TABLE IF EXISTS tbl_events;
create table tbl_events(
  event_id            INTEGER               NOT NULL       DEFAULT nextval('tbl_events_seq'),
  evnt_type           SMALLINT              NOT NULL,
  description         VARCHAR(500)          NOT NULL,
  event_date          DATE                  NOT NULL,
  event_name          VARCHAR(255)          NOT NULL,
  start_time          TIME                  NOT NULL,
  end_time            TIME                  NOT NULL,
  created_date 			  DATE                  NOT NULL       DEFAULT CURRENT_DATE,
  created_by          VARCHAR(255)          NULL,
  modified_date 			DATE      				    NOT NULL       DEFAULT CURRENT_DATE,
  modified_by 				VARCHAR(255)          NULL,
  constraint          event_cons            PRIMARY KEY(event_id)
);

DROP TABLE IF EXISTS tbl_astrlgy_vastu_services;
create table tbl_astrlgy_vastu_services(
  av_id               INTEGER               NOT NULL      DEFAULT nextval('tbl_astrlgy_vastu_services_seq'),
  full_name           VARCHAR(50)           NOT NULL,
  service_type        VARCHAR(50)           NOT NULL,
  addres              VARCHAR(255)          NULL,
  email               VARCHAR(255)          NOT NULL,
  mobile              VARCHAR(20)           NULL,
  msg                 VARCHAR(255)          NULL,
  created_date 			  DATE                  NOT NULL       DEFAULT CURRENT_DATE,
  created_by          VARCHAR(255)          NULL,
  modified_date 			DATE      				    NOT NULL       DEFAULT CURRENT_DATE,
  modified_by 				VARCHAR(255)          NULL,
  constraint          av_cons               PRIMARY KEY(av_id)
);

DROP TABLE IF EXISTS tbl_piligrim_services;
create table tbl_piligrim_services(
  pilgrm_id           INTEGER               NOT NULL      DEFAULT nextval('tbl_piligrim_services_seq'),
  srvc_name           VARCHAR(50)           NOT NULL,
  srvc_date           DATE                  NOT NULL,
  no_of_persons       VARCHAR(255)          NOT NULL,
  mobile              VARCHAR(20)           NOT NULL,
  email               VARCHAR(255)          NULL,
  is_items_req        BOOLEAN               NULL,
  created_date 			  DATE                  NOT NULL       DEFAULT CURRENT_DATE,
  created_by          VARCHAR(255)          NULL,
  modified_date 			DATE      				    NOT NULL       DEFAULT CURRENT_DATE,
  modified_by 				VARCHAR(255)          NULL,
  constraint          pilgrm_cons           PRIMARY KEY(pilgrm_id)
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

DROP TABLE IF EXISTS tbl_panchangam;
create table tbl_panchangam(
  panchangam_id     INTEGER               NOT NULL       DEFAULT nextval('tbl_panchangam_seq'),
  tithi             VARCHAR(255)          NOT NULL,
  nakshatra         VARCHAR(255)          NOT NULL,
  yoga              VARCHAR(255)          NOT NULL,
  yamagandam        VARCHAR(255)          NOT NULL,
  rahukalam         VARCHAR(255)          NOT NULL,
  varjyam           VARCHAR(255)          NOT NULL,
  surodayam 			  VARCHAR(255)          NULL,
  suryastamam       VARCHAR(255)          NULL,
  panchangam_date   VARCHAR(255)          NOT NULL,
  created_date 			DATE                  NOT NULL       DEFAULT CURRENT_DATE,
  created_by        VARCHAR(255)          NULL           DEFAULT 'Admin',
  modified_date 		DATE      				    NOT NULL       DEFAULT CURRENT_DATE,
  modified_by 		  VARCHAR(255)          NULL,
  constraint        panchangam_cons       PRIMARY KEY(panchangam_id)
);

DROP TABLE IF EXISTS tbl_services_at_temple;
create table tbl_services_at_temple(
  service_at_temple_id     INTEGER               NOT NULL       DEFAULT nextval('tbl_services_at_temple_seq'),
  type_of_service          VARCHAR(255)          NOT NULL,
  service_date             DATE                  NULL,
  pooja_description        VARCHAR(255)          NOT NULL,
  amount                   INTEGER               NOT NULL,
  no_of_tickets            INTEGER               NOT NULL,
  pooja_name               VARCHAR(255)          NOT NULL,
  pooja_image 			       BYTEA                 NULL,
  created_date 			       DATE                  NOT NULL       DEFAULT CURRENT_DATE,
  created_by               VARCHAR(255)          NULL           DEFAULT 'Admin',
  modified_date 		       DATE      				     NOT NULL       DEFAULT CURRENT_DATE,
  modified_by 		         VARCHAR(255)          NULL           DEFAULT 'Admin',
  constraint               services_at_temple_cons              PRIMARY KEY(service_at_temple_id)
);