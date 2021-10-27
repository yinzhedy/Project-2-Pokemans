const express = require('express');
const session = require('express-session');
const path = require('path');
const routes = require('./controllers');


const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;





const hbs = exphbs.create({ helpers });

const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

// Inform Express.js on which template engine to use
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

// Template engine. PUG
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');

// // session
// app.use(session({
//     secret:'youtube_video',
//     resave: false,
//     saveUninitialized: false,
//     store: new SequelizeStore({
//         db: sequelize
//       }),
//     cookie: {}
// }));


// // Routers
// app.use(routes);


// // Errors => page not found 404
// app.use((req, res, next) =>  {
//     var err = new Error('Page not found');
//     err.status = 404;
//     next(err);
// })

// // Handling errors (send them to the client)
// app.use((err, req, res, next) => {
//     res.status(err.status || 500);
//     res.send(err.message);
// });

// Setting up the server

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
  });

module.exports = app;