const express = require('express');

const router = express.Router();

//Include DB Config
const db = require('../libs/config');

//Include Multer to accept multipart/form-data
const multer = require('multer');
const upload = multer();

//Inclue Create Student Controller
const UserController = require('../controller/UserController');

//Call Middleware

const RegisterMiddleware = require('../middleware/authJWT');

router.post('/signup',upload.none(),UserController.signup);
router.post('/signin',upload.none(),UserController.login);
router.post('/createUser',upload.none(),UserController.create);
router.get('/getAllUser',UserController.findall);
router.get('/getSingleUser/:id',UserController.findsingle);
router.delete('/deleteSingleUser/:id',UserController.deleteSingle);
router.post('/updateSingleUser/:id',upload.none(),UserController.updateSingle);
router.post('/signout',UserController.logout);
module.exports = router;    
