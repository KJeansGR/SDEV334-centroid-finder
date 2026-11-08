export const videos = (req, res)=>{
    // res.send("Hello from videos page <br>");
    return res.status(200).json({success: true, message: `success! available videos: ${"probably an array of videos from a collection"} `});
};
