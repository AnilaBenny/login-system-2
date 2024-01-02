const mongoose=require('mongoose');
const connect=mongoose.connect('mongodb://localhost:27017/login');
connect.then(()=>{console.log('Data base connected')}).catch(()=>{console.log('database not connected')});
//create a schema

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    mobile:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
   image:{
        type:String,
        required:true
    },
    
    is_admin:{
        type:Number,
        required:true
    },
    is_varified:{
        type:Number,
        default:0
    }
});
module.exports=mongoose.model('users',userSchema);