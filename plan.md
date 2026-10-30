## Brainstorm 
```
from my test video file after selecting the library for this i assignment , i  imagine i will try and re adapt its logic to work with the centroid finder assignment but instead of giving the centroid finder a single image and outputing it as a single csv, i will instead giv e the centroid finder a single frame of a video and save that data to the output csv in the document format the video assignemnt expects
```
## video decoding flow diagram
```
maven jar entry with video --> 
{

    retrieve video frame from video --> 
    run the centroid finder that frame --> 
    save the data to the video csv in a column for that frames timestamp --> 
    repeat until video completes-->
}
test for errors
```