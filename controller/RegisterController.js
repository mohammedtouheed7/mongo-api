const { default: mongoose } = require('mongoose');
const RegisterModels = require('../models/Register')

const RegisterUser = new RegisterModels({
    _id : 1,
    first_name:"Taiyaba",
    last_name:"Iram",
    email:"taiyaba@gmail.com",
    address:{
        user_id:mongoose.SchemaTypes.ObjectId,
        state:"TN",
        city:"Pernambut",
        pincode:635810
    },
    phone:9944029801,
    createdAt:new Date(),

});

const Create = RegisterUser.save()

//Find By ID
//const Create = RegisterModels.findById(1) 

//Find By Name
//const Create = RegisterModels.find({first_name :'Mohammed' }) // Get All Data Using Name

//Get Single Data
//const Create = RegisterModels.findOne({first_name :'Mohammed' }) // Get Single Data Using Name

//Check User Exist
//const Create = RegisterModels.exists({first_name :'Mohammed' }) // Get All Data Using Name

//Delete One User
//const Create = RegisterModels.deleteOne({first_name :'Mohammed' }) // Get All Data Using Name

//Use Custom query
//const Create = RegisterModels.where("first_name").equals('Mohammed') // Get Data Using where and equal 

//const Create = RegisterModels.where("address.state").equals('TN') // Get Data Using where and equal  
//where('age').gt('18') // Greaterthan
//where('age').lt('18').where("first_name").equals('Mohammed'); // lesserthan and name check
//where('age').lt('18').where("first_name").equals('Mohammed').limit(10); // lesserthan and name check with limit
//.where("first_name").equals('Mohammed').select('first_name','last_name')limit(10); // lesserthan and name check with limit

//Join => populate() method 

//const Create = RegisterModels.where("first_name").equals('Mohammed').populate('userId').limit(2) // Get Data Using where and equal

//Select Column
//const Create = RegisterModels.where("first_name").equals('Mohammed').select(['first_name','last_name']).limit(2) // Get Data Using where and equal

//Own Schema Function
//const Create = RegisterModels.findOne({first_name :'Mohammed', last_name : "Tanseer"}) // Get Data Using where and equal

.then((res)=>{
    console.log(res)
    console.log(res.FirstnameLastname)
    res.sayHi()
    // res[0].userId = res._id;
    // res[0].save()
}).catch((err) => {
    console.log(err.message)
    if(err.index == 0){
        console.log('Email already exist');
    }
  
});

module.exports = Create;