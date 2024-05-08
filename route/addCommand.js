const express = require('express');
const Product = require('../model/Product');
const Command = require('../model/Command');
const router = express.Router();

router.get('/historic', async(req,res) => {
    const infoUser = req.session.user;
    const allCommand =  await Command.getCommandsByUser(infoUser.id);
    Command.showAll()
    res.render('pages/historic', {allCommand, infoUser});
})

router.get('/addCommand', (req, res) => {
const infoUser = req.session.user;
const userID = req.session.user.id;
const allProduct = Product.getAll();
const exist_command = Command.command.find(n => n.id_user === userID && n.confirm === false);
if(exist_command === undefined) {
    const data = {
        id_user: userID,
        date: new Date().toLocaleString(),
        prix: 0,
        recup: null,
        confirm: false,
        products: []
    };
    Command.save(data)
}
command = Command.command.find(n => n.id_user === userID && n.confirm === false);
res.render('pages/addCommand', {command, allProduct, infoUser})
});

router.post('/confirmCommand', (req,res) => {
    const {commandID, date} = req.body;
    const command = Command.getCommand(commandID)
    if (command) {
        command.recup = date;
        command.confirm = true;
        Command.save(command);
        res.redirect('/main');
    } else {
        res.status(404).send("La commande n'existe pas")
    }
})

router.post('/addArticle', (req, res) => {
    const { id_command, id_prod, quantite } = req.body;
    const existCommand = Command.getCommand(id_command);
    const produitOriginal = Product.getProduct(id_prod);

    // Créer une copie de l'objet produitOriginal
    const produit = { ...produitOriginal };
    
    // Modifier les propriétés de la copie
    produit.quantite = parseInt(quantite);
    produit.total = produit.quantite * produit.prix;

    if (!existCommand) {
        res.status(404).send("Nous n'avons pas trouvé cette commande.");
    } else {
        Command.addArticle(id_command, produit);
        res.redirect('/addCommand'); // Redirection après avoir ajouté l'article
    }
});




router.get('/removeArticle', (req, res) => {
    const commandID = req.query.id_command;
    const articleID = req.query.id_product;
    Command.removeArticle(commandID, articleID);
    res.redirect('/addCommand')
})


module.exports = router ;