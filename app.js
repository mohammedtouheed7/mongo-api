const express = require('express');
const cors = require('cors');
const cookieSession = require('cookie-session');
const app = express();

//const RegisterController  = require('./controller/RegisterController');
//const checkdb  = require('./libs/config');

//Include Routes
const routers = require('./routes/router')

//Use Session
app.use(cookieSession({
    name:'touheed-session',
    secret:"COOKIE_SECRET", //Envoirnment variable
    httpOnly:true,
})
);

//Use Routes
app.use('/api',routers);

// parse requests of content-type - application/json
app.use(express.json())

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use("/", (req, res)=>{
    res.json({message :'Hello From Express Application!'});
});
//Create Virtual Server
var server = app.listen(8087,function(){
    var host = server.address().address;
    var port = server.address().port;

    console.log('Server is Running at http://127.0.0.1:8087/',host,port);

});

module.exports = app;
