const mongoose = require('mongoose');
const env = require('dotenv').config(); //Use Envoirnment Variables

const connect = () => {
    mongoose.set("strictQuery", false);
    mongoose.connect(env.parsed.MONGODBURL)
    .then(() => {
        console.log('Connected');
    })
    .catch((err)=>{
        console.log('Not Connected',err);
    });
}

module.exports  = connect();