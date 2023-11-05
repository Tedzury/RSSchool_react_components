import MainLayout from './pages/MainLayout';
import CharCard, { loader as charLoader } from './components/CharCard/CharCard';
import ErrorFallback from './components/ErrorFallback/ErrorFallback';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorFallback />,
    children: [
      {
        path: ':id',
        element: <CharCard />,
        loader: charLoader,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
