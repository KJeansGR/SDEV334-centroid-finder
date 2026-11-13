
import { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

import { binarizeImage } from '../utils/imageProcessing';
import { findConnectedGroups } from '../utils/groupFinder';

// Draw a centroid marker on the provided Canvas.
function drawCentroid(context, group) {
  if (!group) return;

  context.beginPath();
  context.arc(group.x, group.y, 22, 0, Math.PI * 2);

  context.fillStyle = '#00FF00';
  context.fill();
}

export default function VideoPreview() {
  const { filename } = useParams();

  const originalCanvasRef = useRef(null);
  const canvasRef = useRef(null);

  const [thumbnail, setThumbnail] = useState(null);
  const [error, setError] = useState(null);

  const [targetColor, setTargetColor] = useState('#ffffff');
  const [threshold, setThreshold] = useState(50);

  // Fetch the selected video's thumbnail.
  useEffect(() => {
    let imageUrl = null;
    const controller = new AbortController();

    async function getThumbnail() {
      try {
        setThumbnail(null);
        setError(null);

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/thumbnail/${encodeURIComponent(filename)}`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch thumbnail');
        }

        const imageBlob = await response.blob();

        if (controller.signal.aborted) return;

        imageUrl = URL.createObjectURL(imageBlob);
        setThumbnail(imageUrl);

      } catch (err) {
        if (!controller.signal.aborted) {
          setError(err.message);
        }
      }
    }

    getThumbnail();

    return () => {
      controller.abort();

      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [filename]);

  // Generate the original and binarized previews.
  useEffect(() => {
    if (!thumbnail) return;

    const canvas = canvasRef.current;
    const originalCanvas = originalCanvasRef.current;

    if (!canvas || !originalCanvas) return;

    const context = canvas.getContext('2d');
    const originalContext = originalCanvas.getContext('2d');

    if (!context || !originalContext) return;

    const image = new Image();
    let cancelled = false;

    image.onload = () => {
      if (cancelled) return;

      const width = image.naturalWidth;
      const height = image.naturalHeight;

      // Set both Canvas dimensions.
      canvas.width = width;
      canvas.height = height;

      originalCanvas.width = width;
      originalCanvas.height = height;

      // Draw the original thumbnail.
      originalContext.drawImage(image, 0, 0);

      // Read the original pixel data.
      const imageData = originalContext.getImageData(
        0, 0, width, height
      );

      // Binarize the image.
      const { binaryArray, binaryImage } = binarizeImage(
        imageData,
        targetColor,
        threshold
      );

      // Find the largest connected group.
      const groups = findConnectedGroups(binaryArray);
      const largestGroup = groups[0];

      // Draw the binarized image.
      context.putImageData(binaryImage, 0, 0);

      // Draw the centroid on both previews.
      drawCentroid(context, largestGroup);
      drawCentroid(originalContext, largestGroup);
    };

    image.onerror = () => {
      if (!cancelled) {
        setError('Failed to load thumbnail image');
      }
    };

    image.src = thumbnail;

    return () => {
      cancelled = true;
      image.onload = null;
      image.onerror = null;
    };
  }, [thumbnail, targetColor, threshold]);

  return (
    <div>
      <Link to="/videos">Back to Videos</Link>

      <h2>Preview: {filename}</h2>

      {error && <p role="alert">{error}</p>}

      <div>
        <label htmlFor="targetColor">
          Target Color:
        </label>

        <input
          id="targetColor"
          type="color"
          value={targetColor}
          onChange={(e) => setTargetColor(e.target.value)}
        />

        <label htmlFor="threshold">
          Threshold: {threshold}
        </label>

        <input
          id="threshold"
          type="range"
          min="0"
          max="442"
          step="1"
          value={threshold}
          onChange={(e) => setThreshold(Number(e.target.value))}
        />
      </div>

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
    </div>
  );
}
