import MainLayout from './pages/MainLayout';
import CharCard from './components/CharCard/CharCard';
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
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
