const mongoose = require('mongoose');

//Define the mongodb connection url

const mongoURL = 'mongodb://127.0.0.1:27017/hotels';

//setting up connection

mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

//get the default connection
//mongoose maintain a deafault connecton object representing theongodb conncetion

const db = mongoose.connection;

db.on('connected', () => { console.log("connected to mongodb"); });
db.on('disconnected', () => { console.log("disconnected to mongodb"); });
db.on('error', (err) => { console.error('mongobd connection error', err); });

module.exports = db;