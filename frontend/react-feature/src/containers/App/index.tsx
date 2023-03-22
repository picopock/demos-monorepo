import { createBrowserRouter, RouterProvider, } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import Layout from '../../components/Layout';
import ErrorPage from '../../components/ErrorPage';
import ThemeContext from '../ThemeContext';
import BatchUpdate from '../BatchUpdate';
import DiffDemo from '../DiffDemo';
import ReactEvent from '../ReactEvent';
import RecoilDemo from '../RecoilDemo';
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
        path: 'recoil',
        element: <RecoilDemo />,
        errorElement: <ErrorPage />,
      },
    ]
  },
]);

export default function App() {
  return <RecoilRoot>
    <RouterProvider router={router} />
  </RecoilRoot>
}