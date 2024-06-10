const express = require('express')
const app = express()
const db = require('./db');
require('dotenv').config();


const bodyParser = require('body-parser');
app.use(bodyParser.json()); //req.body

//import router files
const personRoutes = require('./routes/personRoutes');

//use the router
app.use('/person', personRoutes);



//import menuItemRoutes
const menuRoutes = require('./routes/menuItemRotes');

//use the menu router
app.use('/menu', menuRoutes);



app.get('/', function(req, res) {
    res.send('Hello page')
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => { console.log("server is listening on port 3000"); })