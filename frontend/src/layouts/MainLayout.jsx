import { Outlet} from 'react-router-dom';

export default function MainLayout() {
  return (
    <>
        <main>
            <h1>Centroid Finder Video Processor</h1>

            <Outlet />
        </main>
    </>
  );
}