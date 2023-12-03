import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import MainPage from './pages/MainPage/MainPage';
import NativeForm from './pages/NativeForm/NativeForm';
import ReactHookForm from './pages/ReactHookForm/ReactHookForm';
import { Provider } from 'react-redux';
import { store } from './store/store';
import MainLayout from './layouts/MainLayout';

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
  return (
    <MainLayout>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </MainLayout>
  );
}
