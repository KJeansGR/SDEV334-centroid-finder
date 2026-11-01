import java.awt.image.BufferedImage;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.bytedeco.javacv.FFmpegFrameGrabber;
import org.bytedeco.javacv.Frame;
import org.bytedeco.javacv.Java2DFrameConverter;

public class VideoProcessor {
    
    ImageGroupFinder groupFinder;

    public VideoProcessor(ImageGroupFinder groupFinder){
        this.groupFinder = groupFinder;
    }

    public List<String> Process(String url) throws Exception {
        List<String> toCSV = new ArrayList<>();

        //create a frame grabber to isolate frames as images
        try (FFmpegFrameGrabber grabber = new FFmpegFrameGrabber(url)) {

            // converter is used to conver the grabber into a BufferedImage
            Java2DFrameConverter converter = new Java2DFrameConverter();
            grabber.start();

            Frame frame;
            int count = 0;

            while ((frame = grabber.grabImage()) != null) {
                count++;

                BufferedImage image = converter.convert(frame);
                List<Group> groups = groupFinder.findConnectedGroups(image);

                double seconds = grabber.getTimestamp() / 1_000_000.0;
                if (!groups.isEmpty()) {
                    Group largest = Collections.max(groups);
                    toCSV.add(String.valueOf(seconds) + "," + largest.centroid().x() + "," + largest.centroid().y() );

                    System.out.println("Largest group: " + largest + " at " + seconds + " seconds");
                } else{
                    toCSV.add(String.valueOf(seconds) + ",-1,-1" );
                }

                System.out.println("Connected groups found: " + groups.size() + " | Processing frame: " + count);
            }

            System.out.println("Total frames processed: " + count);
            grabber.stop();

        } catch (Exception e) {
            System.err.println("Could not read the video: " + e.getMessage());
            e.printStackTrace();
        }
        return toCSV;
    }
}
