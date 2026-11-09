

export const home = (req, res)=>{
    res.send("Hello from home page");
    
};

export const serverHealth = (req, res)=>{
    res.send("<h1>Server is live!</h1> <br> <strong>current available endpoints:</strong> <br> /health <br> /thumbnail/:filename <br> /api/videos <br> /process/:filename <br> /process/:jobId/status");
    console.log("server is live Hooray!");
};

/**
 * @description handles the retrieval of a thumbnail for a video file by calling FFMpeg and returning the thumbnail metadata
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
export const thumbnail = (req, res)=>{

    /* 
        * do logic to get thumbnail*
        - use FFMpeg to get a thumnail
            + i dont know when how to do this, probably after video is done, grabthe first frame or save the first frame during processing, since this is not tied to the job maybe run centroid finder for a single frame?
    */

    return res.status(200).json({success: true, message: `success! Thumnail: ${"thumnail meta data to confirm it worked maybe?"}`});
};

