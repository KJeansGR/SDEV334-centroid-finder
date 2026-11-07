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

//start server
const PORT = process.env.PORT || 8000;

//routers
app.use("/", router);
router.get("/", (req, res)=>{
    res.send("Hello from home page");
    
})
router.get("/health", (req, res)=>{
    res.send("Server is live!");
    console.log("server is live Hooray!");
})

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
