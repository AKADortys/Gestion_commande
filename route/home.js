const express = require('express');
const User = require('../model/User');
const router = express.Router();
const bcrypt = require('bcrypt');

router.get('/login', (req, res) => {
    res.render('pages/home');
});

router.post('/log-in', async (req, res) => {
    try {
        const { mail, pwd } = req.body;

        // Validation des champs
        if (!mail || !pwd) {
            return res.status(400).send('Veuillez fournir une adresse e-mail et un mot de passe.');
        }

        const utilisateur = User.user.find(n => n.mail === mail);
        if (!utilisateur) {
            return res.status(404).send('L\'utilisateur n\'existe pas.');
        }

        // Comparaison des mots de passe hashés
        const passwordMatch = await bcrypt.compare(pwd, utilisateur.pwd);
        if (passwordMatch) {
            req.session.user = {
                id: utilisateur.id,
                nom: utilisateur.nom,
                prenom: utilisateur.prenom,
                telephone: utilisateur.telephone,
                mail: utilisateur.mail
            };
            res.redirect('/main');
        } else {
            res.status(400).send('Mot de passe incorrect.');
        }
    } catch (error) {
        res.status(500).send('Une erreur est survenue : ' + error);
    }
});

module.exports = router;
