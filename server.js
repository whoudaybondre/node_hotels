const express = require('express')
const app = express()
const db = require('./db');
require('dotenv').config();
const passport = require('./auth');




const bodyParser = require('body-parser');
app.use(bodyParser.json()); //req.body


//middleware function
const logRequest = (req, res, next) => {
        console.log(`${new Date().toLocaleString()} Request made to this url: ${req.originalUrl}`);
        next(); //move on to the next phase
    }
    //use middleware
app.use(logRequest);

app.use(passport.initialize());

const localAuthMiddleWare = passport.authenticate('local', { session: false });






//import router files
const personRoutes = require('./routes/personRoutes');
const menuRoutes = require('./routes/menuItemRotes');

//use the router
app.use('/person', personRoutes);
app.use('/menu', menuRoutes);






app.get('/', function(req, res) {
    res.send('Hello page')
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => { console.log("server is listening on port 3000"); })