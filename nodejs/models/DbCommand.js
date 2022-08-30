module.exports = {
    creat_Table: {
        basket: "CREATE TABLE tbl_basket(id int NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,user_id INTEGER,item_id INTEGER, number INTEGER);",
        shop: "CREATE TABLE tbl_shop(id SERIAL NOT NULL,image_url character varying(255),name character varying(255),price numeric,PRIMARY KEY(id));",
        user: "CREATE TABLE tbl_user(id SERIAL NOT NULL,name character varying(20) NOT NULL,surname character varying(20) NOT NULL,username character varying(20) NOT NULL,password character varying(20) NOT NULL,money numeric,PRIMARY KEY(id));"
    },

    getAllBasket:"SELECT * FROM tbl_basket WHERE user_id = ",
    getBasket:"SELECT * FROM tbl_basket WHERE user_id = $1 and item_id = $2",
    creatBasket:"INSERT INTO tbl_basket(user_id, item_id, number) VALUES($1, $2, 1)",
    setIncrementBasket: "UPDATE tbl_basket SET number = number + 1 WHERE user_id = $1 and item_id = $2",
    setDecrementBasket: "UPDATE tbl_basket SET number = number - 1 WHERE user_id = $1 and item_id = $2",
    addItem: "INSERT INTO tbl_shop(image_url, name, price) VALUES($1, $2, $3)",
    getItem: "SELECT * FROM tbl_shop",
    getUserItem: "SELECT * FROM tbl_shop s INNER JOIN tbl_basket b ON s.id = b.item_id WHERE b.user_id = ",
    logUpUser: "INSERT INTO tbl_user(name, surname, username, password, money) VALUES($1, $2, $3, $4, 0)",
    logInUser: "SELECT * FROM tbl_user WHERE username = $1 and password = $2",
    getUserInformation: "SELECT * FROM tbl_user WHERE id = ",
    getItemInformation: "SELECT * FROM tbl_shop WHERE id = ",
    moneyIncrement: "UPDATE tbl_user SET money = money + $1 WHERE id = $2",
    moneyDecrement: "UPDATE tbl_user SET money = money - $1 WHERE id = $2",
    buyItem: "UPDATE tbl_user SET money = money - $1 WHERE id = $2" ,
    sellItem: "UPDATE tbl_user SET money = money + $1 WHERE id = $2" ,
}

