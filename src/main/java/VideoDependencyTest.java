// import org.bytedeco.javacv.FFmpegFrameGrabber;
// import org.bytedeco.javacv.Java2DFrameConverter;
import java.awt.image.BufferedImage;
import java.util.Collections;
import java.util.List;

import org.bytedeco.javacv.FFmpegFrameGrabber;
import org.bytedeco.javacv.Frame;
import org.bytedeco.javacv.Java2DFrameConverter;

public class VideoDependencyTest {
    public static void main(String[] args) {

        
        if (args.length != 1) {
            System.out.println("ARGS error: Please provide the path to a video file.");
            return;
        }

        try (FFmpegFrameGrabber grabber = new FFmpegFrameGrabber(args[0])) {
            grabber.start();

            Java2DFrameConverter converter = new Java2DFrameConverter();

            // Parse the target color from a hex string (format RRGGBB) into a 24-bit integer (0xRRGGBB)
            String hexTargetColor = "000000";
            int targetColor = 0;
            try {
                targetColor = Integer.parseInt(hexTargetColor, 16);
            } catch (NumberFormatException e) {
                System.err.println("Invalid hex target color. Please provide a color in RRGGBB format.");
                return;
            }
            
            // Create the DistanceImageBinarizer with a EuclideanColorDistance instance.
            ColorDistanceFinder distanceFinder = new EuclideanColorDistance();
            ImageBinarizer binarizer = new DistanceImageBinarizer(distanceFinder, targetColor, 50);
            ImageGroupFinder groupFinder = new BinarizingImageGroupFinder(binarizer, new DfsBinaryGroupFinder());


            Frame frame;
            int count = 0;

            while ((frame = grabber.grabImage()) != null) {
                count++;

                BufferedImage image = converter.convert(frame);
                List<Group> groups = groupFinder.findConnectedGroups(image);

                double seconds = grabber.getTimestamp() / 1_000_000.0;
                if (!groups.isEmpty()) {
                    Group largest = Collections.max(groups);

                    System.out.println("Largest group: " + largest + " at " + seconds + " seconds");
                }
                System.out.println("Connected groups found: " + groups.size());
                System.out.println("Processing frame: " + count);
            }
            System.out.println("Total frames processed: " + count);
            grabber.stop();
        } catch (Exception e) {
            System.err.println("Could not read the video: " + e.getMessage());
            e.printStackTrace();
        }
    }
}