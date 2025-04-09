const express =require('express');
const app=express();
const bodyParser = require('body-parser');
const cors=require('cors');
const AuthRouter = require('./routes/authRoutes.js'); 
const { exec } = require("child_process");
const subscriberRoutes= require('./routes/subscriberRoutes.js')
const newsletterJob = require('./utils/cronJob')

const cron = require('node-cron'); 
const geminiRoutes = require('./routes/geminiRoutes');


let importGtfs;
let getStops;

// Immediately-invoked async function to load GTFS
(async () => {
  try {
    const gtfsModule = await import('gtfs');
    // Correctly extract methods from ES module
    importGtfs = gtfsModule.importGtfs;
    getStops = gtfsModule.getStops;

    const gtfsConfig = require('./config/gtfs-config.json');
    
    // Initialize GTFS data
    const refreshGTFSData = async () => {
      try {
        await importGtfs(gtfsConfig);
        console.log('GTFS data refreshed successfully');
      } catch (error) {
        console.error('GTFS import failed:', error);
      }
    };

    // Initial refresh
    await refreshGTFSData();

    // Schedule daily refresh
    cron.schedule('0 3 * * *', () => {
      console.log('Running daily GTFS data refresh');
      refreshGTFSData();
    });

  } catch (error) {
    console.error('Failed to initialize GTFS:', error);
  }
})();

require('dotenv').config();
require('./Models/db');

const PORT=process.env.PORT||5000

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
app.use('/api/subscribers', subscriberRoutes);

const wheelchairRoute = require('./routes/gtfs'); // path may vary
app.use('/api', wheelchairRoute);

app.get('/api/stops', async (req, res) => {
    try {
      if (!getStops) throw new Error('GTFS not initialized');
  
      const accessibleStops = await getStops({ wheelchair_boarding: 1 });
      const allStops = await getStops();
  
      console.log(`Accessible Stops: ${accessibleStops.length}`);
      console.log(`Total Stops: ${allStops.length}`);
  
      res.json({ accessibleStops, totalStops: allStops.length });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch stops: ' + error.message });
    }
  });
  app.use('/api/gemini', geminiRoutes);
  
  

newsletterJob.start();

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./gtfs.db');

db.all('SELECT stop_id, stop_name, wheelchair_boarding FROM stops LIMIT 10', [], (err, rows) => {
  if (err) {
    console.error(err.message);
    return;
  }
  console.log(rows);
});

db.close();



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