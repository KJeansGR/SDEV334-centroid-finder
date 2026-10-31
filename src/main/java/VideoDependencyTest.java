// import org.bytedeco.javacv.FFmpegFrameGrabber;
// import org.bytedeco.javacv.Java2DFrameConverter;
import java.awt.image.BufferedImage;

import org.bytedeco.javacv.FFmpegFrameGrabber;
import org.bytedeco.javacv.Frame;
import org.bytedeco.javacv.Java2DFrameConverter;

public class VideoDependencyTest {
    public static void main(String[] args) {

        
        if (args.length != 1) {
            System.out.println("Usage: VideoDependencyTest ECS_DEMO.mp4");
            return;
        }

        try (FFmpegFrameGrabber grabber = new FFmpegFrameGrabber(args[0])) {
            grabber.start();
            Java2DFrameConverter converter = new Java2DFrameConverter();

            Frame frame;
            int count = 0;
            while ((frame = grabber.grabImage()) != null) {
                count++;
                BufferedImage image = converter.convert(frame);

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