
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
            res.render('signup',{message:"Your registration has been sucessfully completed!!!"});

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

//login user 
const loginLoad=async(req,res)=>{
    try{
        res.render('login');
    }
    catch(error){
        console.log(error.message);
    }

};


//login  verify
const verifyLogin=async(req,res)=>{
    try{
     
        console.log('Full Request Body:', req.body);
        
        const email=req.body.email;
        const password=req.body.password;
        console.log('Attempting login for email:', email);
        const userData = await userModel.findOne({ email: email });

        console.log(userData);
        if(userData){
           const passwordMatch= await bcrypt.compare(password,userData.password);
           if(passwordMatch){
            if(userData.is_varified===0){
                res.render('login',{message:"please verify yor email"})
            }
            req.session.user_id=userData._id;
            res.redirect('/home');
           }
           else{
            res.render('login',{message:"Login Failed!!!,please verify your email and password"});
           }

        }
        else{
            res.render('login',{message:"Login Failed!!!,please verify your email and password"});
        }

    }
    catch(error){
        console.log(error.message);
        res.render('login',{message: "An error occurred during login"});
    }

};
   


const loadHome=async(req,res)=>{
    try {
        const user=await userModel.findById({_id:req.session.user_id});
        console.log(user);
       res.render('home',{user}); 
    } catch (error) {
        console.log(error.message);
    }

};

const userLogout=async(req,res)=>{
    try{
        req.session.destroy();
        res.redirect('/');
    }
    catch(error){
        console.log(error.message);
    }

};

//user profile edit and update

const editLoad=async(req,res)=>{
    try{
        const id=req.query.id;
        const userData=await userModel.findById({_id:id});
        if(userData){
            res.render('edit',{user:userData});
        }
        else{
            res.redirect('/home');
        }
    }
    catch(error){
        console.log(error.message);
    }

};

const updateProfile=async(req,res)=>{
    try {
        if(req.file){

            const userData=await userModel.findOneAndUpdate({_id:req.body.user_id},{$set:{name:req.body.name,email:req.body.email,mobile:req.body.mobile,image:req.file.filename}});
        }
        else{
             const userData=await userModel.findOneAndUpdate({_id:req.body.user_id},{$set:{name:req.body.name,email:req.body.email,mobile:req.body.mobile}});
        }
        res.redirect('/home');
    } catch (error) {
        console.log(error.message);
    }


}

module.exports={
    loadRegister,
    insertUser,
    loginLoad,
    verifyLogin,
    loadHome,
    userLogout,
    editLoad,
    updateProfile
}