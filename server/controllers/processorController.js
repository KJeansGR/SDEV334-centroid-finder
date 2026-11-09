import crypto from "crypto";

/**
 * @description handles the processing of a video file by calling a Java JAR and returning a job ID for tracking
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
export const process = (req, res) =>{

    if(!req.params.filename){
        return res.status(400).json({success: false, message: "No File provided"});
    }
    const fName = req.params.filename;

    /* 
        * do logic to run the java jar*
        - create UUID and store in a map
        - start jar and mark as processing in KVP map for all jobs
        - return ok
    
    */
   const jobUUID = crypto.randomUUID();
    return res.status(200).json({success: true, message: `successfully started JAR process! file provided: ${fName} | Job-ID: ${jobUUID} `});  
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
