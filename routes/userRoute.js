const express = require('express');
const user_route=express();


const bodyParser=require('body-parser');
user_route.use(bodyParser.json());
user_route.use(bodyParser.urlencoded({extended:true}));

user_route.set('views','./views')

user_route.set('view engine','ejs');


const userController=require('../controllers/userController');


const multer = require('multer');
const path=require('path');

const storage=multer.diskStorage({
    destination:function(req,file,cb){
      cb(null,path.join(__dirname,'../public/userImages'));
    
    },
    filename:function(req,file,cb){
      const name=Date.now()+'-'+file.originalname;
      cb(null,name);
    }
    });
    
    const upload=multer({storage:storage});

user_route.get('/signup',userController.loadRegister);
user_route.post('/signup',upload.single('image'),userController.insertUser);




module.exports=user_route;