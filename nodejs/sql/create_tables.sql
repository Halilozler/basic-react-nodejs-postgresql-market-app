CREATE TABLE IF NOT EXISTS tbl_basket(id int NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,user_id INTEGER,item_id INTEGER, number INTEGER);

CREATE TABLE IF NOT EXISTS tbl_shop(id SERIAL NOT NULL,image_url character varying(255),name character varying(255),price numeric,PRIMARY KEY(id));

CREATE TABLE IF NOT EXISTS tbl_user(id SERIAL NOT NULL,name character varying(20) NOT NULL,surname character varying(20) NOT NULL,username character varying(20) NOT NULL,password character varying(20) NOT NULL,money numeric,PRIMARY KEY(id));