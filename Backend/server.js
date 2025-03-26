const express =require('express');
const app=express();
const bodyParser = require('body-parser');

const cors=require('cors');
const AuthRouter = require('./routes/AuthRoutes.js'); // Fix the name


require('dotenv').config();
require('./Models/db');

const PORT=process.env.PORT||8080

app.get('/ping',(req,res)=>{
    res.send('PONG');
})
app.use((req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.url}`);
    next();
});

app.use(bodyParser.json());
app.use(cors());
app.use('/auth',AuthRouter)

app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`)
})