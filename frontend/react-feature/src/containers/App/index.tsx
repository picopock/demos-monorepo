import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ErrorPage from '../../components/ErrorPage';
import Layout from '../../components/Layout';
import BatchUpdate from '../BatchUpdate';
import DiffDemo from '../DiffDemo';
import ReactEvent from '../ReactEvent';
import ZustandDemo from '../ZustandDemo';
import ThemeContext from '../ThemeContext';
import './index.scss';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'themeContext',
        element: <ThemeContext />,
        errorElement: <ErrorPage />,
      },
      {
        path: 'batchUpdate',
        element: <BatchUpdate />,
        errorElement: <ErrorPage />,
      },
      {
        path: 'diffDemo',
        element: <DiffDemo />,
        errorElement: <ErrorPage />,
      },
      {
        path: 'reactEvent',
        element: <ReactEvent />,
        errorElement: <ErrorPage />,
      },
      {
        path: 'zustand',
        element: <ZustandDemo />,
        errorElement: <ErrorPage />,
      },
    ],
  },
]);

export default function App() {
  return (
    <RouterProvider router={router} />
  );
}
