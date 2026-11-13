import { Routes, Route, Navigate } from 'react-router-dom';
import VideoChooser from './pages/VideoChooser';
import VideoPreview from './pages/VideoPreview';

function App() {
  return (
    <>
      <h1>Centroid Finder Video Processor</h1>

      <Routes>
        <Route path="/" element={<Navigate to="/videos" replace />} />
        <Route path="/videos" element={<VideoChooser />} />
        <Route path="/preview/:filename" element={<VideoPreview />} />
        <Route path="*" element={<h2>Page not found</h2>} />
      </Routes>
    </>
  );
}

export default App;