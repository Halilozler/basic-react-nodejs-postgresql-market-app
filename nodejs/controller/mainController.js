const db = require("../models/DbConnect");
const dbCommand = require("../models/DbCommand");
const fs = require("fs");
const { v4: uuidv4 } = require('uuid');

db.connect();

const getUser = (req, res) => {

    db.query(dbCommand.getUserInformation + req.params.id).then((user) => {
        db.query(dbCommand.getAllBasket + req.params.id).then((basket) => {
            return res.status(200).json({user: user.rows, basket: basket.rows, message:"User Gönderildi"})
        }).catch((err) =>{
            return res.status(400).json({message:"Sepet Alınırken Hata Oluştu", error: err})
        })
    }).catch((err) => {
        return res.status(400).json({message:"Kullanıcıya ulaşılamadı", error: err})
    })
}

const addMoney = (req, res) => {
    db.query(dbCommand.moneyIncrement, [req.params.money, req.params.id]).then((user) => {
        getUser(req, res);
    }).catch((err) => {
        return res.status(400).json({message:"Para Eklenemedi", error: err})
    })
}

const removeMoney = (req, res) => {
    db.query(dbCommand.moneyDecrement, [req.params.money, req.params.id]).then((user) => {
        getUser(req, res);
    }).catch((err) => {
        return res.status(400).json({message:"Para Düşülmedi", error: err})
    })
}

const logUp = (req, res) => {
    const userInformation = [req.body.name, req.body.surname, req.body.username, req.body.password];
    db.query(dbCommand.logUpUser, userInformation).then(() => {
        db.query(dbCommand.logInUser, [req.body.username, req.body.password]).then(user => {
            return res.status(201).json({user: user.rows, message:"Başarılı Kaydedildi"})
        }).catch(err => {
            return res.status(404).json({err, message:"Kayıt Olunamadı"})
        })
    }).catch(err => {
        return res.status(404).json({err, message:"Kayıt Olunamadı"})
    })
}

const logIn = (req, res) => {
    db.query(dbCommand.logInUser, [req.body.username, req.body.password]).then(user => {
        if(Object.keys(user.rows).length == 0){
            return res.status(401).send("Bilgiler yanlış")
        }
        else{
            //return res.status(201).json({user: user.rows, message:"Giriş Yapıldı"})
            req.params.id = user.rows[0].id;
            getUser(req,res);
        }
    }).catch(err => {
        return res.status(404).json(err)
    })
}

const addItem = (req, res) => {
    const uploadDir = "../milyondolar/src/img";
    if(!fs.existsSync(uploadDir)){
        fs.mkdirSync(uploadDir);
    }

    let uploadImage = req.files.image;
    let name = `${uuidv4()}.${uploadImage.mimetype.split("/")[1]}`
    let uploadPath = __dirname + "/../../milyondolar/src/img/" + name;

    uploadImage.mv(uploadPath, () => {
            db.query(dbCommand.addItem, [name, req.body.name, req.body.price]).then(() => {
                res.status(201).send("Ürün Başrılı Bir Şekilde Oluşturuldu")
            }).catch((err) => {
                res.status(400);
            })
        });
        
}

const getItem = (req, res) => {
    //item gönderirken user_id yede baksın eğer 
    // if(req.body.user_id !== undefined){
    //     db.query(dbCommand.getUserItem + req.body.user_id).then((item) => {
    //         res.status(201).json({items: item.rows})
    //     }).catch((err) => {
    //         res.status(404).send("İtem Getirme Başarısız")
    //     })
    // }else{
        db.query(dbCommand.getItem).then((item) => {
            res.status(201).json({items: item.rows})
        }).catch((err) => {
            res.status(404).send("İtem Getirme Başarısız")
        })
    //}
    
}

const getInformation = async(user_id, item_id) => {
    try {
        const user = await db.query(dbCommand.getUserInformation + user_id);
        const item = await db.query(dbCommand.getItemInformation + item_id);
        return {user, item};
    } catch (error) {
        throw error;
    }
}

const buyItem = async(req, res) => {
    const user_id = req.params.id;
    const item_id = req.params.item_id;
    const array = [user_id, item_id];
    try {
        const info = await getInformation(user_id, item_id);
        await db.query(dbCommand.buyItem, [info.item.rows[0].price, info.user.rows[0].id])
    } catch (error) {
        return res.status(400).json({message:"Ürün Alınamadı", error})
    }
    await db.query(dbCommand.getBasket, array).then((basket) => {
        if(basket.rows.length == 0){
            //hiç sepete oluşturulmadıysa
            db.query(dbCommand.creatBasket, array).catch((error) => {
                return res.status(400).json({message:"Sepet oluşturulurken hata oluştu", error})
            })
        }else{
            //sepete varsa update yapsın
            db.query(dbCommand.setIncrementBasket, array).catch((error) => {
                return res.status(400).json({message:"Sepet güncelenirken hata oluştu", error})
            })
        }
    }).catch((error) => {
        return res.status(400).json({message:"Sepete bakılırken hata oluştu", error})
    })
    
    getUser(req,res);
}

const sellItem = async(req, res) => {
    try {
        const info = await getInformation(req.params.id, req.params.item_id);
        await db.query(dbCommand.sellItem, [info.item.rows[0].price, info.user.rows[0].id])
        
    } catch (error) {
        return res.status(400).json({message:"Ürün Satılamadı", error})
    }
    //direk olarak basketen düşülecek
    await db.query(dbCommand.setDecrementBasket, [req.params.id, req.params.item_id]).catch((error) => {
        return res.status(400).json({message:"Ürün Sepeten Düşülürken Hata Oluştu", error})
    })

    getUser(req,res);
}


module.exports = {
    logUp,
    logIn,
    addItem,
    getUser,
    addMoney,
    removeMoney,
    getItem,
    buyItem,
    sellItem
}