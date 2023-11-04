import MainLayout from './pages/MainLayout';
import CharCard, { loader as charLoader } from './components/CharCard/CharCard';
import CharCardStub from './components/CharCardStub/CharCardStub';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <CharCardStub />,
      },
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
