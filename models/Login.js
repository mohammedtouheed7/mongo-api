const mongoose = require('mongoose')
//Include DB Config
const DB = require('../libs/config');

//Login Schema

const LoginSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String
})

const LoginCollection = mongoose.model('LoginTable',LoginSchema);

module.exports = LoginCollection;