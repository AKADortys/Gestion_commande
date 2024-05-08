const express = require('express');
const Product = require('../model/Product');
const router = express.Router();

router.get('/addProduct', (req,res) => {
    const infoUser = req.session.user;
    if(req.query.id){
        const productID= req.query.id;
        const product = Product.getProduct(productID);
        res.render('pages/addProduct',{product, infoUser})
    } else {
        const product = {};
        res.render('pages/addProduct',{product, infoUser})
    }
})

router.post('/add-product', (req,res) => {
    const {id, designation, description, prix, info} = req.body;
    if (!designation || !description || !prix || !info) {res.status(400).send('Veillez remplir tout les champs !')}
    const data = {
        id:id,
        designation: designation,
        description: description,
        prix: parseFloat(prix),
        info:info
    }
    Product.save(data);
    res.redirect('/main')
})

router.get('/getProduct', (req,res) => {
    const infoUser = req.session.user;
    const productID = req.query.id;
    const produits = Product.getProduct(productID);
    res.render('pages/getProduct', {produits,infoUser})
})

router.get('/delete-product', (req,res) => {
    const productID = req.query.id;
    Product.delete(productID);
    res.redirect('/main');
})

module.exports = router;