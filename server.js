const path = require("path")
const express = require("express");
const cors = require("cors");

const app = express();

const db = require("./app/models");
db.sequelize.sync();
// drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

var corsOptions = {
    origin: "http://localhost:8080"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({extended: true}));

// simple route
// app.get("/", (req, res) => {
//     res.json({ message: "Welcome to bezkoder application." });
// })

require("./app/routes/tutorial.routes")(app);

// set port, listen for requests

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

// ********************HANDLEBARS

//Loads the handlebars module
const handlebars = require('express-handlebars');
const publicPath = path.resolve(__dirname, "public");

app.use(express.static(publicPath));

//Sets our app to use the handlebars engine
app.set('view engine', 'hbs');

//Sets handlebars configurations (we will go through them later on)
app.engine('hbs', handlebars({
    layoutsDir: __dirname + '/views/layouts',
    // renames the extension, hbs instead of handlebars
    extname: 'hbs',
    // default layout gives us a backup html incase the main doesnt load or isnt found for whatever reason
    defaultLayout: 'planB',
    // sets the directory for partials we will use to nest inside of the main html
    partialsDir: __dirname + '/views/partials/'
    }));

app.get('/', (req, res) => {
//Serves the body of the page aka "main.handlebars" to the container //aka "index.handlebars"
// res.render('main', {layout : 'index'});
// uses planB instead of main
// res.render('main');
// uses the index.hbs file instead of planB
res.render('main', {layout: 'index'});});