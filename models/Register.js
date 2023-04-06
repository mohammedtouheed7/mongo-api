const mongoose = require('mongoose')
//Include DB Config
const DB = require('../libs/config');

//User Address Schema 

const userAddress = new mongoose.Schema({

    state:String,
    city:String,
    pincode:Number,
});


//Create Schema
const RegisterSchema = new mongoose.Schema({
    _id:Number,
    first_name:String,
    last_name:String,
    email:{
        type:String,
        unique: true,
    },
    address:userAddress,
    userId:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'Users'
    },
    createdAt:String,
    phone:{
        type:Number,
        validate:{

            validator: value => value.toString().length == "10",
            message: props => `${props.value} is atleast 10`,

            },
        },
    updatedAt:{
        type:Date,
        default:() => Date.now()
    }
});

//Schema With Methods

RegisterSchema.methods.sayHi= function sayHi(name){
    console.log(`Say Hi to ${this.first_name} ${this.last_name} `);
}

RegisterSchema.statics.findByName = function (name){
   return this.find({first_name: new RegExp(name, 'i')})
}

//using query
RegisterSchema.query.ByName = function (name){
    return this.where({first_name: new RegExp(name, 'i')})
 }
 
//Virtual Property
RegisterSchema.virtual('FirstnameLastname').get(function (name){
    return `${this.first_name } ${this.last_name}`
 });




module.exports = mongoose.model('Users',RegisterSchema);