const express = require('express');
const router = express.Router();
const User = require('../model/User');
const bcrypt = require('bcrypt');

router.post('/sign-in', async (req, res) => {
    try {
        const { id, nom, prenom, pass, passc, telephone, mail } = req.body;

        if (!nom || !prenom || !telephone || !mail) {
            return res.status(400).send('Veuillez remplir tous les champs du formulaire.');
        }

        if (pass !== passc) {
            return res.status(400).send('Les mots de passe fournis ne sont pas identiques !');
        }
        const hashedPassword = await bcrypt.hash(pass, 10);

        if (pass === '' && passc === '') {

            const userData = {
                id: id,
                nom: nom,
                prenom: prenom,
                telephone: telephone,
                mail: mail,
            };
            User.save(userData);
        } else {
            const userData = {
                id: id,
                nom: nom,
                prenom: prenom,
                telephone: telephone,
                mail: mail,
                pwd: hashedPassword
            }
            User.save(userData);
        }
        res.redirect('/login');
    } catch (error) {
        console.error('An error occurred:', error);
        res.status(500).send('Une erreur est survenue lors de l\'inscription.');
    }
});

router.get('/signin', (req, res) => {
    try {
        if (req.query.id) {
            const infoUser = req.session.user;
            const utilisateur = User.user.find(n => n.id === req.query.id);
            res.render('pages/sign-in', { utilisateur, infoUser });
        } else {
            const utilisateur = {};
            const infoUser = {};
            res.render('pages/sign-in', { utilisateur, infoUser });
        }
    } catch (error) {
        console.error('An error occurred:', error);
        res.status(500).send('Une erreur est survenue lors du chargement de la page d\'inscription.');
    }
});

module.exports = router;
