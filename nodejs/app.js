const express = require('express');
const cors = require('cors')
require("dotenv").config();
const fileUpload = require("express-fileupload");
const mainController = require("./controller/mainController");



const app = express();

//dışardan HTTP istekleri almamız için şart
app.use(cors())

app.use(express.urlencoded({extended:true}));
app.use(express.json());

//resimleri almamız için:
app.use(fileUpload());

app.post("/logUp", mainController.logUp);

app.post("/logIn", mainController.logIn);

app.post("/addItem", mainController.addItem);

app.get("/getItem", mainController.getItem);

app.get("/getUser/:id", mainController.getUser);

app.get("/addMoney/:money/:id", mainController.addMoney);

app.get("/removeMoney/:money/:id", mainController.removeMoney);

app.get("/buy/:id/:item_id", mainController.buyItem);

app.get("/sell/:id/:item_id", mainController.sellItem);


const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log('Sunucu başlatıldı');
});