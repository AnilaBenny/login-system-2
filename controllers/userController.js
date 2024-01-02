const userModel = require('../models/userModel');
const bcrypt=require('bcrypt');

const securePassword=async(password)=>{
    try{
        const passwordHash=await bcrypt.hash(password,10);
        return passwordHash;
    }
    catch(error){
        console.log(error.message);
    }

};

const loadRegister =async(req,res)=>{
    try{
        res.render('signup');
    }
    catch(error){
        console.log(error.message);
    }

};

const insertUser=async (req,res)=>{
    try{
        const spassword= await securePassword(req.body.password);
        const user= new userModel({
            name:req.body.name,
            address:req.body.address,
            mobile:req.body.mobile,
            email:req.body.email,
            password:spassword,
            image:req.file.filename,
            is_admin:0
        });
     
        const userData=await user.save();
        if(userData){
            res.render('signup',{message:"Your registration has been sucessfully completed!!!,please verify your mail"});

        }
        else
        {
            res.render('signup',{message:"Your registration has been failed!!!"})
        }

    }
    catch(error){
        console.log(error.message);
    }


};
module.exports={
    loadRegister,
    insertUser
}