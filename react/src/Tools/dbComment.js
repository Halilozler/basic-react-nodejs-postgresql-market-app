import axios from 'axios';
import store from "../Store";
import { setItem, setUser } from './../Store/Site';

const baseUrl = "http://localhost:8000/";

//State Alma işlemi
//store.getState().Site.user

export const getItem = () => {
    axios.get(baseUrl + "getItem").then((req) => {
        store.dispatch(setItem({...req.data}))
    }).catch((err) => {
        console.log(err);
    })
}

export const addItem = async(formData) => {
    await axios.post(baseUrl + "addItem", formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then(() => {
        getItem();
    }).catch((err) => {
        console.log(err);
    })
}

export const getUser = (user_id) => {
    axios.get(baseUrl + "getUser/" + user_id).then((req) => {
        store.dispatch(setUser({...req.data}))
    }).catch((err) => {
        console.log(err);
    })
}

export const addMoney = (amount) => {
    axios.get(baseUrl + `addMoney/${amount}/${store.getState().Site.user.user[0].id}`).then((req) => {
        store.dispatch(setUser({...req.data}))
    }).catch((err) => {
        console.log(err);
    })
}

export const removeMoney = (amount) => {
    axios.get(baseUrl + `removeMoney/${amount}/${store.getState().Site.user.user[0].id}`).then((req) => {
        store.dispatch(setUser({...req.data}))
    }).catch((err) => {
        console.log(err);
    })
}

export const logUp = (user) => {
    axios.post(baseUrl + "logUp",user).then((req) => {
        store.dispatch(setUser({...req.data}))
    }).catch((err) => {
        console.log(err);
    })
}

export const logIn = (user) => {
    axios.post(baseUrl + "logIn",user).then((req) => {
        store.dispatch(setUser({...req.data}))
    }).catch((err) => {
        console.log(err);
    })
} 

export const buy = (item_id) => {
    axios.get(baseUrl + `buy/${store.getState().Site.user.user[0].id}/${item_id}`).then((req) => {
        store.dispatch(setUser({...req.data}))
    }).catch((err) => {
        console.log(err);
    })
}

export const sell = (item_id) => {
    axios.get(baseUrl + `sell/${store.getState().Site.user.user[0].id}/${item_id}`).then((req) => {
        store.dispatch(setUser({...req.data}))
    }).catch((err) => {
        console.log(err);
    })
}


