import org.bytedeco.javacv.FFmpegFrameGrabber;

public class VideoDependencyTest {
    public static void main(String[] args) {
        if (args.length != 1) {
            System.out.println("Usage: VideoDependencyTest ECS_DEMO.mp4");
            return;
        }

        try (FFmpegFrameGrabber grabber = new FFmpegFrameGrabber(args[0])) {
            grabber.start();

            System.out.println("Video opened successfully");
            System.out.println("Size: " + grabber.getImageWidth()
                    + "x" + grabber.getImageHeight());
            System.out.println("Frame rate: " + grabber.getFrameRate());
            System.out.println("Duration (seconds): "
                    + grabber.getLengthInTime() / 1_000_000.0);

            grabber.stop();
        } catch (Exception e) {
            System.err.println("Could not read the video: " + e.getMessage());
            e.printStackTrace();
        }
    }
}