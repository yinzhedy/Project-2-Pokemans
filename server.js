const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
var routes = require('./controllers');
const helpers = require('./utils/helpers');

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 9000;
app.use(morgan("dev"));
// bodyParser no longer needed so commented out
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());


const sess = {
    secret: "somerandonstuffs",
    cookie: {},
    // key: "user_sid",
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
})}

app.use(session(sess));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});

// app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/layouts/'}));
// app.set('view engine', 'hbs');

// app.use((req, res, next) => {
//     if (req.cookies.user_sid && !req.session.user) {
//         res.clearCookie('user_sid');
//     }
//     next();
// });

// var hbsContent = {userName: '', loggedIn: false, title: "You are not logged in today", body: "Hello World"};

// var sessionChecker = (req, res, next) => {
//     if (req.session.user && req.cookies.user_sid) {
//         res.redirect('/dashboard');
//     } else {
//         next();
//     }
// };

// // route for user signup

// app.get('/', sessionChecker, (req, res) => {
//     res.redirect('/login');
// });

// app.route('/signup')
//     .get((req, res) => {
//         res.render('signup', hbsContent);
//     })
//     .post((req, res) => {
//         User.create({
//             username: req.body.username,
//             password: req.body.password
//         })
//             .then(user => {
//                 req.session.user = user.dataValues;
//                 res.redirect('/dashboard');
//             })
//             .catch(err => {
//                 res.redirect('/signup');
//             });
//     });

// // route for user Login
// app.route('/login')
//     .get((req, res) => {
//         res.render('login', hbsContent);
//     })
//     .post((req, res) => {
//         var username = req.body.username,
//         password = req.body.password;
        
//         User.findOne({ where: { username: username } }).then(function (user) {
//             if (!user) {
//                 res.redirect('/login');
//             } else if (!user.validPassword(password)) {
//                 res.redirect('/login');
//             } else {
//                 req.session.user = user.dataValues;
//                 res.redirect('/dashboard');
//             }
//         });
//     });

// app.get('/dashboard', (req, res) => {
//     if (req.session.user && req.cookies.user_sid) {
//         hbsContent.loggedIn = true;
//         hbsContent.userName = req.session.user.username;
//         hbsContent.title = "You are logged in!";
//         res.render('index', hbsContent);
//     } else {
//         res.redirect('/login');
//     }
// });

// app.get('/logout', (req, res) => {
//     if (req.session.user && req.cookies.user_sid) {
//         hbsContent.loggedIn = false;
//         hbsContent.title = "You are logged out!";
//         res.clearCookie('user_sid');
//         res.redirect('/');
//     } else {
//         res.redirect('/login');
//     }
// });

// // route for handling 404 requests(unavailable routes)
// app.use(function (req, res, next) {
//     res.status(404).send("Sorry can't find that!")
// });

// app.listen(app.get('port'), () => console.log(`Server started on port ${app.get('port')}`));






// all of jacks login and user profile code ^^^^^

// const db = require("./app/models");
// db.sequelize.sync();
// // drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

// var corsOptions = {
//     origin: "http://localhost:8080"
// };

// app.use(cors(corsOptions));

// // parse requests of content-type - application/json
// app.use(express.json());

// // parse requests of content-type - application/x-www-form-urlencoded
// app.use(express.urlencoded({extended: true}));

// // simple route
// // app.get("/", (req, res) => {
// //     res.json({ message: "Welcome to bezkoder application." });
// // })

// require("./app/routes/tutorial.routes")(app);

// // set port, listen for requests

// const PORT = process.env.PORT || 8080;
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}.`);
// });

// // // ********************HANDLEBARS

// //Loads the handlebars module
// const handlebars = require('express-handlebars');
// // const { log } = require("console");
// const publicPath = path.resolve(__dirname, "public");

// app.use(express.static(publicPath));

// //Sets our app to use the handlebars engine
// app.set('view engine', 'hbs');

// //Sets handlebars configurations (we will go through them later on)
// app.engine('hbs', handlebars({
//     layoutsDir: __dirname + '/views/layouts',
//     // renames the extension, hbs instead of handlebars
//     extname: 'hbs',
//     // default layout gives us a backup html incase the main doesnt load or isnt found for whatever reason
//     defaultLayout: 'planB',
//     // sets the directory for partials we will use to nest inside of the main html
//     partialsDir: __dirname + '/views/partials/'
//     }));

// app.get('/', (req, res) => {
// //Serves the body of the page aka "main.handlebars" to the container //aka "index.handlebars"
// // res.render('main', {layout : 'index'});
// // uses planB instead of main
// // res.render('main');
// // uses the index.hbs file instead of planB
// res.render('main', {layout: 'index'});});