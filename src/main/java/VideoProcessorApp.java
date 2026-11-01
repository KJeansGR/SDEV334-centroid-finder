import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;

public class VideoProcessorApp {
    public static void main(String[] args) {

        
        if (args.length != 4) {
            System.err.println(
                "Usage: java -jar videoprocessor.jar " +
                "<input> <outputCsv> <hexColor> <threshold>"
            );
            return;
        }

        String videoPath = args[0];
        String outputPath = args[1];
        String hexColor = args[2];
        String thresholdText = args[3];

        ///////////////////////////////////////////////////////////////
        List<String> toCSV = new ArrayList<>();

        //create a frame grabber to isolate frames as images
        // Parse the target color from a hex string (format RRGGBB) into a 24-bit integer (0xRRGGBB)
        String hexTargetColor = hexColor;
        int targetColor = 0;
        try {
            targetColor = Integer.parseInt(hexTargetColor, 16);
        } catch (NumberFormatException e) {
            System.err.println("Invalid hex target color. Please provide a color in RRGGBB format.");
            return;
        }

        // Parse the threshold from the command-line argument.
        int threshold = Integer.parseInt(thresholdText  );
        
        // Create the DistanceImageBinarizer with a EuclideanColorDistance instance.
        ColorDistanceFinder distanceFinder = new EuclideanColorDistance();
        ImageBinarizer binarizer = new DistanceImageBinarizer(distanceFinder, targetColor, threshold);
        ImageGroupFinder groupFinder = new BinarizingImageGroupFinder(binarizer, new DfsBinaryGroupFinder());
        
        //Helper object class to process video that returns a List of timestamp & coordinate pairs representing frames of the video

        try{
            VideoProcessor vp = new VideoProcessor(groupFinder);
            toCSV = vp.Process(videoPath);
        }catch(Exception e){
            System.err.println("Error processing video: " + e.getMessage());
        }
        
        ///////////////////////////////////////////////////////////////


        ///////////////////////////////////////////////////////////////
        // Write the groups information to a CSV file "VideoGroups.csv".
        try (PrintWriter writer = new PrintWriter(outputPath)) {
            for (String entry : toCSV) {
                writer.println(entry);
            }
            System.out.println("Groups summary saved as " + outputPath);
        } catch (Exception e) {
            System.err.println("Error writing " + outputPath);
            e.printStackTrace();
        }
        ///////////////////////////////////////////////////////////////
    
    }
}