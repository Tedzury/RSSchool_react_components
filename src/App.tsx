import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import MainPage from './pages/MainPage/MainPage';
import NativeForm from './pages/NativeForm';
import ReactHookForm from './pages/ReactHookForm';
import { Provider } from 'react-redux';
import { store } from './store/store';

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
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}
