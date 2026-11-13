
import { useEffect, useRef } from 'react';

import { binarizeImage } from '../utils/imageProcessing';
import { findConnectedGroups } from '../utils/groupFinder';


// Draw the largest group's centroid.
function drawCentroid(context, group) {
  if (!group) return;

  context.beginPath();
  context.arc(group.x, group.y, 22, 0, Math.PI * 2);
  context.fillStyle = '#00FF00';
  context.fill();
}

export default function PreviewCanvases({
  thumbnail,
  targetColor,
  threshold,
  onImageError
}) {
  const originalCanvasRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!thumbnail) return;

    const originalCanvas = originalCanvasRef.current;
    const canvas = canvasRef.current;

    if (!originalCanvas || !canvas) return;

    const originalContext = originalCanvas.getContext('2d');
    const context = canvas.getContext('2d');

    if (!originalContext || !context) return;

    const image = new Image();
    let cancelled = false;

    image.onload = () => {
      if (cancelled) return;

      const width = image.naturalWidth;
      const height = image.naturalHeight;

      originalCanvas.width = width;
      originalCanvas.height = height;

      canvas.width = width;
      canvas.height = height;

      // Draw original image and retrieve its pixels.
      originalContext.drawImage(image, 0, 0);

      const imageData = originalContext.getImageData(
        0, 0, width, height
      );

      // Run binarization and find connected groups.
      const { binaryArray, binaryImage } = binarizeImage(
        imageData,
        targetColor,
        threshold
      );

      const groups = findConnectedGroups(binaryArray);
      const largestGroup = groups[0];

      // Render the processed image.
      context.putImageData(binaryImage, 0, 0);

      // Draw the same centroid on both images.
      drawCentroid(context, largestGroup);
      drawCentroid(originalContext, largestGroup);
    };

    image.onerror = () => {
      if (!cancelled) {
        onImageError('Failed to load thumbnail image');
      }
    };

    image.src = thumbnail;

    return () => {
      cancelled = true;
      image.onload = null;
      image.onerror = null;
    };
  }, [thumbnail, targetColor, threshold, onImageError]);

  return (
    <div
      style={{
        display: 'flex',
        gap: '16px',
        flexWrap: 'wrap'
      }}
    >
      <div>
        <h3>Original Thumbnail</h3>
        <canvas
          ref={originalCanvasRef}
          style={{
            width: '360px',
            maxWidth: '100%',
            height: 'auto'
          }}
        />
      </div>

      <div>
        <h3>Binarized Preview</h3>
        <canvas
          ref={canvasRef}
          style={{
            width: '360px',
            maxWidth: '100%',
            height: 'auto'
          }}
        />
      </div>
    </div>
  );
}
