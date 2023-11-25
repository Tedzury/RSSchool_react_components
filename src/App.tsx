import MainLayout from './pages/MainLayout';
import CharCard from './components/CharCard/CharCard';
import ErrorFallback from './components/ErrorFallback/ErrorFallback';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RouteFallback from './components/RouteFallback/RouteFallback';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorFallback />,
    children: [
      {
        path: ':id',
        element: <CharCard />,
        errorElement: <RouteFallback />,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
