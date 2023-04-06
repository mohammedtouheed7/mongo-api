const mongoose = require('mongoose');
const User = require('../models/UserModel');
const { findById } = require('../models/UserModel');

//Include User Model 
const { UserModel } = require('../models/UserModel');
//Include User Role Model
const { UserRoleModel } = require('../models/UserRole');
const LoginModel = require('../models/Login');

//SecretKey
const jwt = require('jsonwebtoken');
const secretkey = require('../libs/auth.config');
var bcrypt = require("bcryptjs");

//Register User
exports.signup = (req,res) => {

  const singupUser = new LoginModel({
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password,8),
  })

  singupUser.save()
  .then((result) => {
    res.send({ message: "User was registered successfully!" });
  })
  .catch((err) => {
    res.send({ message: err });
  });

}


//LoginUser
exports.login = (req,res) => {
  const checkUser = LoginModel.findOne({email: req.body.email});
  
  checkUser.exec((err, response) => {
    if(err){
      res.status(500).send({ message: err });
        return;
    }
    if(!response){
      return res.status(404).send({ message: "User Not found." });
    }

    //Validate Password
    
    var passwordIsValid = bcrypt.compareSync(
      req.body.password,
      response.password
    );

    if(!passwordIsValid){
      return res.status(401).send({ message: "Invalid Password!" });
    }

    var token = jwt.sign({ id: response.id }, secretkey.secret, {
      expiresIn:"120s", //24hours
    })

    req.session.token = token;

    res.status(200).send({
      id:response._id,
      name:response.name,
      email:response.email,
      token
    })
  })
  
}

//Logout
exports.logout = (req, res) => {
  try {
    req.session = null;
    return res.status(200).send({message:'User Logout Successfully'})
  } catch (error) {
    return res.status(404).send({message:error})
    
  }
}
//Create User
exports.create = (req, res) => {
  //Validate the request
  if (!req.body.name) {
    res.status(400).send({ message: "Name Field Required", status: false });
    return;
  }

  const CreateUser = new UserModel({
    _id: req.body.id,
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    userRole:req.body.userRole,
  })

  CreateUser.save()
    .then((data) => {
      console.log(data);
      const UserRole = new UserRoleModel({
        _id: 1,
        user_id: data._id,
        role: "User"
      })
      UserRole.save()
        .then((result) => {
          res.send(result);
        }).catch((er) => {
          res.status(500).send({
            messagex:
              er.message || "Some error occurred while creating the Tutorial."
          });
        })
    })
    .catch((err) => {
      res.status(500).send({
        messagex:
          err.message || "Some error occurred while creating the Tutorial."
      });
    });

};


//find all data
exports.findall = (req, res) => {
//const Create = RegisterModels.where("first_name").equals('Mohammed').populate('userId').limit(2) // Get Data Using where and equal
var pipeline = [
  {
    //Method 1 : Left Outer Join / Inner Join
    $lookup :{
      from: "userroles", //Left Join Table Name
      localField: "_id", //Users Table Id
      foreignField:"user_id", //Userrole Table Id
      as:"userRole" //Array Name
    },

    //Method 2 : Left Outer Join
    // $lookup :{
    //   from: "userroles", //Inner Join Table Name
    //   as: "userrole", // alias Table 
    //   let:{user_idd : "$_id"}, //Userrole Table Id
    //   pipeline:[
    //     {$match : {$expr : {$eq: ['$user_id', '$$user_idd']} }}, //filter user_id with user table _id
    //   ]
    // }
  
    //Method 3 Inner Join
    // $lookup :{
    //   from: "userroles", //Inner Join Table Name
    //   as: "users", // alias Table 
    //   let:{user_role : "$userRole"}, //Userrole Table Id
    //   pipeline:[
    //     {$match : {$expr : {$eq: ['$_id', '$$user_role']} }}, //filter user_id with user table _id
    //   ]
    // }
  },
  {
    $unwind: {
        path: "$userRole",
        preserveNullAndEmptyArrays: false //Remove Empty array
    }
  },
  {
    $project:{
      _id: 0, //Hide the Column from output
      __v:0,
      userRole:{
        _id:0,
        __v:0,
      }
    }
  },
  {$sort : {"_id" : -1}},
  {$limit : 2},
]

UserModel.aggregate(pipeline)
//UserRoleModel.find().populate('user_id')
    .then((data) => {
      res.send(data);
    }).catch((error) => {
      res.status(500).send({
        messagex:
          error.message || "Some error occurred while creating the Tutorial."
      });
    })
}

//find by id

exports.findsingle = (req, res) => {
  var user_id = req.params.id;

  UserModel.findById(user_id)
    .then((data) => {
      res.send(data.toJson())
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Something Went Wrong."
      })
    });
}


//Delete the Single Data using ID

exports.deleteSingle = (req, res) => {
  var user_id = req.params.id;
  UserModel.findByIdAndRemove(user_id)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "Data is not found / Data Already Deleted" })
      } else {
        res.status(200).send({ message: "Data is Deleted" })

      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Something Went Wrong."
      })
    });
}

//Edit User using ID

exports.updateSingle = (req, res) => {
  if (!req.body) {
    res.status(500).send({ message: "All Fields are required" })
  }
  var user_id = req.params.id
  UserModel.findByIdAndUpdate(user_id, req.body)
    .then((result) => {
      if (result) {
        res.send({ message: 'Data is updated!' })
      } else {
        res.send({ message: 'Data Not updated!' })

      }
    }).catch((err) => {
      res.status(500).send({
        message:
          err.message || "Something Went Wrong."
      })
    })
}