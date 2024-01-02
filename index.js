const express = require('express');
const user_route=require('./routes/userRoute')




const app = express();
const PORT = 3000;

app.set('view engine','ejs');
app.set('/static',express.static('public'));


app.set('/static/assets',express.static('public/assets'));

//for user routes
app.use('/',user_route);

app.listen(PORT, () => {
  console.log('Server is running on port :http://localhost:3000/signup');
});
