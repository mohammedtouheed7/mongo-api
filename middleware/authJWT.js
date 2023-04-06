const jwt = require('jsonwebtoken');
const secretkey = require('../libs/auth.config');

verifyToken = (req, res, next) => {
    let token = req.session.token;

    if(!token){
        return res.status(403).send({message:"No Token Provide !"});
    }

    jwt.verify(token, secretkey.secret, (err, decode) => {
        if(err){
            return res.status(401).send({ message: "Unauthorized!" });
        }
        req.userId = decode.id;
        next();
    })
}

isLoggedIn = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decode = jwt.verify(token,secretkey.secret);
        req.userData = decode;
        next();
    } catch (error) {
        return res.status(401).send({
            msg:"Your session is invalid!"
        })
    }
}
const TokenVerify = {
    verifyToken,
    isLoggedIn
};
module.exports = TokenVerify;