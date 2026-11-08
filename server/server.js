import dotenv from 'dotenv';
import express from 'express';
import { Router } from 'express';


//configure Express.js app
const app = express();

//middleware
app.use(express.json());

// Load environment variables from .env file
dotenv.config();

//create a router (export to separate file later)
const router = new Router();
const apiRouter = new Router();
const processorRouter = new Router();

//middleware to parse incoming request bodies so that we can access the data in req.body
app.use(express.urlencoded({ extended: true }));

//start server
const PORT = process.env.PORT;
const frontEndUrl = process.env.VITE_API_URL;

//mounting routers
app.use("/", router);
app.use("/api", apiRouter);
app.use("/process", processorRouter);

apiRouter.get("/", (req, res)=>{
    res.send("Hello from home page");
    
});
router.get("/health", (req, res)=>{
    res.send("Server is live!");
    console.log("server is live Hooray!");
});

/*
    THESE WILL INIITIALLY BE CALLED FROM POSTMAN   

    GET /api/videos	Returns     available video files
    GET /thumbnail/:filename	Returns thumbnail image
    POST /process/:filename	    Launches Java JAR and returns a job ID
    GET /process/:jobId/status	Returns the job's current status
*/
apiRouter.get("/videos", (req, res)=>{
    res.send("Hello from videos page <br>");
});
router.get("/", (req, res)=>{
    res.send("Hello from GET /thumbnail/:filename dummy page <br>");
});
processorRouter.post("/:filename", (req, res) =>{
    res.send(`Hello from POST /process/:filename dummy page <br> filename: ${req.params.filename || "no name provided"}`);
})
processorRouter.get("/:jobId/status", (req, res) =>{
    res.send(`Hello from GET /process/:jobId/status dummy page <br> jobid: ${req.params.jobId || "no id"} <br> status: ${"processing"}`);
})



app.listen(PORT, () => {
  console.log(`Server is running on port ${frontEndUrl}${PORT}`);
});



