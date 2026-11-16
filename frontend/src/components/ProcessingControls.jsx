
import {
  Paper,
  Stack,
  Typography,
  Slider
} from '@mui/material';

export default function ProcessingControls({
  targetColor,
  setTargetColor,
  threshold,
  setThreshold
}) {
  return (
    <Paper sx={{ p: 3, my: 3 }}>
      <Typography variant="h6" gutterBottom>
        Detection Settings
      </Typography>

      <Stack spacing={3}>
        <Stack direction="row" spacing={2} alignItems="center">
          <Typography
            component="label"
            htmlFor="targetColor"
          >
            Target Color:
          </Typography>

          <input
            id="targetColor"
            type="color"
            value={targetColor}
            onChange={(e) => setTargetColor(e.target.value)}
          />

          <Typography variant="body2">
            {targetColor.toUpperCase()}
          </Typography>
        </Stack>

        <div>
          <Typography id="threshold-label" gutterBottom>
            Threshold: {threshold}
          </Typography>

          <Slider
            aria-labelledby="threshold-label"
            value={threshold}
            min={0}
            max={442}
            step={1}
            onChange={(_, newValue) => setThreshold(newValue)}
            valueLabelDisplay="auto"
          />
        </div>
      </Stack>
    </Paper>
  );
}
