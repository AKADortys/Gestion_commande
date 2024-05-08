const express = require('express');
const User = require('../model/User');
const router = express.Router();
const Product = require('../model/Product');


router.get('/main', (req ,res) => {
    console.log(req.session.user)
    const idUser = req.session.user.id;
    const infoUser = User.getUser(idUser);
    const allUser = User.getAll();
    const allProduct = Product.getAll();
    res.render('pages/main',{infoUser, allUser, allProduct});
})


router.get('/deleteUser', (req,res) => {
    const idUser = req.query.id;
    if(idUser) {
            User.delete(idUser)
            res.redirect('/login')
    }
})

module.exports = router;