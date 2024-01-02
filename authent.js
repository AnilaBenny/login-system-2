const express=require('express');
const router=require('express.Router');


 router.post('/',(req,res)=>{
    if(req.body.email===req.body.password){
      res.render('/home');
    }

 });
 module.exports=router;