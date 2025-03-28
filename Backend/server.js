const express =require('express');
const app=express();
const bodyParser = require('body-parser');

const cors=require('cors');
const AuthRouter = require('./routes/authRoutes.js'); 
const { exec } = require("child_process");


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
app.use('/auth',AuthRouter);

app.get("/trends", (req, res) => {
    const { cityA, cityB } = req.query;

    if (!cityA || !cityB) {
        return res.status(400).json({ error: "Please provide two cities." });
    }

    const command = `python trends.py "${cityA}" "${cityB}"`;

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error("Google Trends API Error:", stderr);
            return res.status(500).json({ error: "Failed to fetch trends." });
        }

        try {
            console.log("Trends Data Sent to Frontend:", stdout);  // Debugging log
            const data = JSON.parse(stdout);  // Ensure JSON is valid
            res.json(data);
        } catch (parseError) {
            console.error("JSON Parsing Error:", parseError.message);
            res.status(500).json({ error: "Invalid JSON response from Python script." });
        }
    });
});


app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`)
})