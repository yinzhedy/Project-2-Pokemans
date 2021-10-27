<<<<<<< HEAD
const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
var routes = require('./controllers');
const helpers = require('./utils/helpers');

const sequelize = require('./config/configurations');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 9000;
// app.use(morgan("dev"));
// bodyParser no longer needed so commented out
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(cookieParser());
const hbs = exphbs.create({ helpers });

const sess = {
=======
const cookieParser = require("cookie-parser");
const session = require("express-session");
const morgan = require("morgan");
const User = require("./app/models/user");
const path = require("path")
const express = require("express");
const cors = require("cors");
const hbs = require("express-handlebars"); 

const app = express();
app.set('port', 9000);
app.use(morgan("dev"));
// bodyParser no longer needed so commented out
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(session({
    key: "user_sid",
>>>>>>> c1c3b9bac1822308d73cdf1ab60b41e8f79d0fa8
    secret: "somerandonstuffs",
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
}));

app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/layouts/'}));
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    if (req.cookies.user_sid && !req.session.user) {
        res.clearCookie('user_sid');
    }
    next();
});

var hbsContent = {userName: '', loggedIn: false, title: "You are not logged in today", body: "Hello World"};

var sessionChecker = (req, res, next) => {
    if (req.session.user && req.cookies.user_sid) {
        res.redirect('/dashboard');
    } else {
        next();
    }
};

// route for user signup

app.get('/', sessionChecker, (req, res) => {
    res.redirect('/login');
});

app.route('/signup')
    .get((req, res) => {
        res.render('signup', hbsContent);
    })
    .post((req, res) => {
        User.create({
            username: req.body.username,
            password: req.body.password
        })
            .then(user => {
                req.session.user = user.dataValues;
                res.redirect('/dashboard');
            })
            .catch(err => {
                res.redirect('/signup');
            });
    });

// route for user Login
app.route('/login')
    .get((req, res) => {
        res.render('login', hbsContent);
    })
    .post((req, res) => {
        var username = req.body.username,
        password = req.body.password;
        
        User.findOne({ where: { username: username } }).then(function (user) {
            if (!user) {
                res.redirect('/login');
            } else if (!user.validPassword(password)) {
                res.redirect('/login');
            } else {
                req.session.user = user.dataValues;
                res.redirect('/dashboard');
            }
        });
    });

app.get('/dashboard', (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
        hbsContent.loggedIn = true;
        hbsContent.userName = req.session.user.username;
        hbsContent.title = "You are logged in!";
        res.render('index', hbsContent);
    } else {
        res.redirect('/login');
    }
});

app.get('/logout', (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
        hbsContent.loggedIn = false;
        hbsContent.title = "You are logged out!";
        res.clearCookie('user_sid');
        res.redirect('/');
    } else {
        res.redirect('/login');
    }
});

// route for handling 404 requests(unavailable routes)
app.use(function (req, res, next) {
    res.status(404).send("Sorry can't find that!")
});

app.listen(app.get('port'), () => console.log(`Server started on port ${app.get('port')}`));



