const express = require('express');
const app = express();
const port = 3000;
const session = require('express-session');
const bodyParser = require('body-parser');

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.use(session({
  name: 'sid',
  secret: 'Keyboard cat',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    secure: false
  }
}));

app.use('/',require('./route/home'))
app.use('/',require('./route/sign-in'))
app.use('/',require('./route/main'))
app.use('/',require('./route/addProduct'))
app.use('/',require('./route/addCommand'))

app.listen(port, () => {
    console.log(`Serveur en cours d'exécution sur le port http://localhost:${port}`);
  });
  