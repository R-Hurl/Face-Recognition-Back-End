const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

/*
    I used Sql Server for my database connection. You can use any relational database supported
    by knex. See https://knexjs.org/ for more info.

    Also, if you choose not to use sql server, run npm uninstall mssql --save to uninstall from package.json file.

    Replace the instance of knex() below with your database credentials. Refer to README document for recommended tables
    and data types.
*/
const db = knex({
    client: 'mssql',
    connection: {
        host: '127.0.0.1',
        user: 'SmartBrainAdmin',
        password: 'password',
        database: 'smartbrain'
    }
});

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('it is working!');
})

app.post('/signin', (req, res) => { signin.signInUser(req, res, db, bcrypt) });
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })
app.get('/profile/:id', (req, res) => { profile.retrieveProfile(req, res, db) });
app.put('/image', (req, res) => { image.updateEntries(req, res, db) });
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) });

app.listen(process.env.PORT || 3000, () => {
    console.log(`app is running on port ${process.env.PORT}`);
})

