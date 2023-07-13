const express=require('express');
const app=express();
require('dotenv').config();
const port=process.env.port
const cors=require('cors');
const router=require('./controller/Router/authRoute');
const cookieParser=require('cookie-parser');
app.use(cors({
    origin:['http://localhost:3000'],
    credentials:true,
    methods:['GET','POST'],
}));
app.use(express.json()) 
app.get('/', function(req, res) {
    res.send('hello world fsnj');
});
app.use(express.json())
app.listen(port,()=>{
    console.log(`app running on http://localhost:${port}/`)
})
app.use(cookieParser())
app.use('/user',router)