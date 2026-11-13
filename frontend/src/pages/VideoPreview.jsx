import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useRef } from 'react';
import { binarizeImage } from '../utils/imageProcessing';

export default function VideoPreview() {
  const { filename } = useParams();
  const canvasRef = useRef(null);

  const [thumbnail, setThumbnail] = useState(null);
  const [error, setError] = useState(null);

  const [targetColor, setTargetColor] = useState("#FF0000");
  const [threshold, setThreshold] = useState(50);

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

      } catch (error) {
        if (error.name !== 'AbortError') {
          setError(error.message);
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

  useEffect(() => {
  if (!thumbnail) return;

  const canvas = canvasRef.current;
  if (!canvas) return;

  const context = canvas.getContext('2d');
  if (!context) return;

  const image = new Image();
  let cancelled = false;

  image.onload = () => {
    if (cancelled) return;

    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;

    context.drawImage(image, 0, 0);

    // Read the original pixels.
    const imageData = context.getImageData(
      0,
      0,
      canvas.width,
      canvas.height
    );

    // Run our JavaScript binarizer.
    const { binaryImage } = binarizeImage(
      imageData,
      targetColor,
      threshold
    );

    // Replace the Canvas contents.
    context.putImageData(binaryImage, 0, 0);
  };

  image.src = thumbnail;

  return () => {
    cancelled = true;
    image.onload = null;
  };
}, [thumbnail, targetColor, threshold]);

  return (
    <div>
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

        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
        <div>
            <h3>Original Thumbnail</h3>
            {thumbnail && (
            <img
                src={thumbnail}
                alt="Original video thumbnail"
                style={{ width: '360px', maxWidth: '100%' }}
            />
            )}
        </div>

        <div>
            <h3>Binarized Preview</h3>
            <canvas
            ref={canvasRef}
            style={{ width: '360px', maxWidth: '100%', height: 'auto' }}
            />
        </div>
        </div>
        
    </div>
  );
}