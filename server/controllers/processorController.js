import crypto from "crypto";
import fs from "fs/promises";
import { spawn } from "node:child_process";

/**
 * @description handles the processing of a video file by calling a Java JAR and returning a job ID for tracking
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
export const processVideo = async (req, res) =>{
    /* 
        * do logic to run the java jar*
        - create UUID and store in a map
        - start jar and mark as processing in KVP map for all jobs
        - return ok

        - shape of the jar command :
            java -jar videoprocessor.jar inputPath outputCsv targetColor threshold
            java -jar videoprocessor.jar ..\videos\FlowField_Example.mp4 output.csv 0000FF 50
    */

    const videoFile = req.params.filename;
    const outputCsv = req.query.outputCsv;
    const targetColor = req.query.targetColor;
    const threshold = req.query.threshold;
    
    const jobUUID = crypto.randomUUID();

    console.log(`file provided: ${videoFile} | jar: ${process.env.JAR_PATH} | output: ${process.env.CSV_OUTPUT_DIR}/${outputCsv} | target color: ${targetColor} | threshold: ${threshold} | Job-ID: ${jobUUID} `);

    if(!videoFile || !outputCsv || !targetColor || !threshold){
        return res.status(400).json({success: false, message: "invalid configuration parameters provided | Correct usage: <FilePath: inputPath> <string name: outputCsv> <Hex: targetColor> <int: threshold>"});
    }

    try {
        const valid = await getSingleVideo(process.env.VIDEO_DIR, videoFile);

        if(!valid){
            console.log(`Video not found:`, videoFile.trim());
            return res.status(500).json({success: false, message: `invalid video file check extensions or spelling`, videoFile});  
        }

    } catch (error) {
        if (error.code === "ENOTDIR") {
            console.error("Path is not a directory: ", process.env.VIDEO_DIR);
        } else if (error.code === "ENOENT") {
            console.error("Path does not exist: ", process.env.VIDEO_DIR);
        }else{
            console.log(error);
        }
        return res.status(500).json({success: false, message: `ERROR: Error reading video directory`});
    }

    //start jar 
    const child = spawn("java", [
        "-jar",
        process.env.JAR_PATH,
        process.env.VIDEO_DIR + "/" + videoFile,
        process.env.CSV_OUTPUT_DIR + "/" + outputCsv,
        targetColor,
        threshold
    ]);

    return res.status(200).json({success: true, message: `successfully started JAR process! file provided: ${videoFile} | jar: ${process.env.JAR_PATH} | output: ${process.env.CSV_OUTPUT_DIR}/${outputCsv} | target color: ${targetColor} | threshold: ${threshold} | Job-ID: ${jobUUID} `});  
}

async function getSingleVideo(videoDir, videoFile) {

    const entries = await fs.readdir(videoDir, { withFileTypes: true });


    return entries.some((entry) => {
        return(
        // console.log(entry.name + " | " + videoFile),
        entry.name.trim() === videoFile);
    });
}



/**
 * @description handles the status of a video processing job by checking the job ID and returning the current status
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
export const status = (req, res) =>{

    if(!req.params.jobId){
        return res.status(400).json({success: false, message: "Id not provided"});
    }
    const jobId = req.params.jobId;

    /* 
        * do logic to check job/processor status *
        - query a db or search a collection to validate the existence of provided video
        - return not ok if video doesnt exist
        - if video ids are very unique maybe store that it is finished and already been verified to skip if verified to not return an error if a user searches for a already completed video
    */
    //if job is finished
    return res.status(202).json({success: false, message: `job still processing! jobid: ${jobId} | file provided: ${"placeholder video name"}`});

    //if job is finished
    return res.status(200).json({success: true, message: `success! jobid: ${jobId} | file provided: ${"placeholder video name"}`});
    
}
