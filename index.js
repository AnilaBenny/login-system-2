const express = require('express');
const user_route=require('./routes/userRoute');
const admin_route=require('./routes/adminRoute');
// const noCache=require('noCache');

const app=express();
const PORT = 3000;


app.set('view engine','ejs');
app.use('/static',express.static('public'));

//for user routes
app.use('/',user_route);
//for admin
app.use('/admin',admin_route);



app.listen(PORT, () => {
  console.log('Server is running on port :http://localhost:3000/');
});
