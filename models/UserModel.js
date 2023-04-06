const mongoose = require('mongoose');

//Include DB Config
const DB = require('../libs/config');

//Create Schema For User
var UserSchema = mongoose.Schema({
    _id:Number,
    name:{
      type:String,
      require:true,
    },
    email:{
      type:String,
      require:true,
      lowercase: true,
      unique: true,
      validate: {
        validator: function(v) {
            return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
        },
        message: "Please enter a valid email"
    },
    required: [true, "Email required"]
    },
    phone:{
        type:Number,
        validate:{
            validator: value => value.toString().length == "10",
            message: props => `${props.value} is atleast 10`,
            }
    },
    userRole:{
        type:Number,
        ref:"UserRole"
    },
    createdAt:{
        type:Date,
        default:() => Date.now()
    },
    updatedAt:{
        type:Date,
        default:() => Date.now()
    },
});

//ToJson
UserSchema.methods.toJson = function(){
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
}

const User = mongoose.model('User',UserSchema);



module.exports = {
    UserModel: User
};
