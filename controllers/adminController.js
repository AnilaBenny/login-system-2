const userModel = require('../models/userModel');
const bcrypt=require('bcrypt');
const randomstring=require('randomstring');

const securePassword=async(password)=>{
    try {
        const passwordHash=await bcrypt.hash(password,10);
        return passwordHash;
    } catch (error) {
        console.log(error.message);
    }
};

const LoadAdmin=async(req,res)=>{
    try {
        res.render('adminlogin');
    } catch (error) {
        console.log(error.message);
    }

};

const verifyAdmin=async(req,res)=>{
    try {
        const email=req.body.email;
        const password=req.body.password;
        const userData=await userModel.findOne({email:email});
        if(userData){
            const passwordMatch=await bcrypt.compare(password,userData.password);
            if(passwordMatch)
            {
                if(userData.is_admin===0){
                    res.render('adminLogin',{message:'you are not Admin'});
                
                }
                else{
                    req.session.user_id=userData._id;
                        res.redirect('/admin/home');
                }
            }
            else{
                res.render('adminLogin',{message:'please verify password and Email!'})
            }

        }else{
            res.render('adminLogin',{message:'please verify password and Email!'})
            
        }
        
    } catch (error) {
        console.log(error.message);
    }
};

const loadDashboard = async (req, res) => {
    try {
        const userData = await userModel.findById(req.session.user_id);
        
        res.render('adminhome', { admin: userData });
    } catch (error) {
        console.log(error.message);
    }
};

    const logout=async(req,res)=>{
        try {
            req.session.destroy();
            res.redirect('/admin');
        } catch (error) {
            console.log(error.message);
        }
    };

    const loadDash=async(req,res)=>{
        try {
            const userData=await userModel.find({is_admin:0});
            res.render('dashboard',{users:userData});
        } catch (error) {
            console.log(error.message)
        }
    };

    const addUser=async(req,res)=>{
        try {
            res.render('adduser');
        } catch (error) {
            console.log(error.message);
        }

    };

    const addNew=async(req,res)=>{
        try {
            console.log(req.body); // Check if image is in req.body
            console.log(req.file); // Check if the file is in req.file
    
          
            const name=req.body.name;
            const address=req.body.address;
            const mobile=req.body.mobile;
            const email=req.body.email;
            const image=req.file.filename;
            const password=randomstring.generate(8);

            const spassword=await securePassword(password);
            const user= new userModel({
                name:name,
                address:address,
                mobile:mobile,
                email:email,
                image:image,
                password:spassword,
                is_admin:0
                
            });
            console.log(user);
            const userData=await user.save();
            if(userData){
                res.redirect('/admin/dashboard');
            }
            else{
                res.render('adduser',{message:'Failed!!! something wrong'});
            }

        } catch (error) {
            console.log(error.message)
            
        }
    }

module.exports={
    LoadAdmin,
    verifyAdmin,
    loadDashboard,
    logout,
    loadDash,
    addUser,
    addNew
}