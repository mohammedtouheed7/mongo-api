const mongoose = require('mongoose');

//Include DB Config
const DB = require('../libs/config');

var UserRoleSchema = mongoose.Schema({
    _id:Number,
    user_id:{
        type:Number,
        ref:"User",  
    },
    role:String,
    createdAt:{
        type:Date,
        default:() => Date.now()
    }
    
})

const UserRole = mongoose.model('UserRole',UserRoleSchema);

module.exports = {
    UserRoleModel:UserRole,
}