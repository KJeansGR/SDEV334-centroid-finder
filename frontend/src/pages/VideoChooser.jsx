import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function VideoChooser() {
  const [vids, setVids] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchVideos() {
      try {
        const result = await fetch(
          `${import.meta.env.VITE_API_URL}/api/videos`
        );

        if (!result.ok) {
          throw new Error('Failed to fetch videos');
        }

        const vidsObj = await result.json();

        setVids(vidsObj.availableVideos);

      } catch (error) {
        setError(error.message);
      }
    }

    fetchVideos();
  }, []);

  return (
    <div>
      <h2>Available Videos</h2>

      {error && <p>{error}</p>}

      {vids.map((video) => (
        <div key={video}>
          <Link to={`/preview/${encodeURIComponent(video)}`}>
            {video}
          </Link>
        </div>
      ))}
    </div>
  );
}