import dotenv from 'dotenv';
import express from 'express';
import { router, apiRouter, processorRouter} from "./routers/router.js";

//configure Express.js app
const app = express();

//middleware
app.use(express.json());

// Load environment variables from .env file
dotenv.config();

//middleware to parse incoming request bodies so that we can access the data in req.body
app.use(express.urlencoded({ extended: true }));

//start server
const PORT = process.env.PORT;
const frontEndUrl = process.env.VITE_API_URL;

//mounting routers
app.use("/", router);
app.use("/api", apiRouter);
app.use("/process", processorRouter);


app.listen(PORT, () => {
  console.log(`Server is running on port ${frontEndUrl}${PORT}`);
});



