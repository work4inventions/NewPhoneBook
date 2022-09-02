require("dotenv").config();
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const port = process.env.PORT || 5000;
const mongoUrl='mongodb://localhost:27017/phonebookmanager'
const cors = require('cors') 
const app = express()

app.use(express.json());
app.use(cors())

require('./models/user');   

const authRoutes = require('./routes/userapi')
const addData = require('./routes/dataapi')

app.use(bodyParser.json())
app.use(authRoutes)
app.use(addData)
app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Methods","GET,PUT,POST,DELETE")
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With,Content-Type, Accept")
  
    next();
  })
mongoose.connect(mongoUrl,{
})
.then(() =>{
    console.log('connection-successful');
})
.catch((err) =>console.log('no connection'));


app.get('/',(req, res) =>{
    res.send('Welcome in API'); 
})

app.listen(port ,()=>{
    console.log(`server is running on ${port}`);
})