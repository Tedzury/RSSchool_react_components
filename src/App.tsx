import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import MainPage from './pages/MainPage';
import NativeForm from './pages/NativeForm';
import ReactHookForm from './pages/ReactHookForm';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
  },
  {
    path: '/native_form',
    element: <NativeForm />,
  },
  {
    path: '/react_hook_form',
    element: <ReactHookForm />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
