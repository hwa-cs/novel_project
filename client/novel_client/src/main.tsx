import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';
import Home from './pages/Home';
import Short from './pages/Short';
import Join from './pages/user/Join';
import Reserve from './pages/Reserve';
import ErrorPage from './pages/ErrorPage';
import Title from './pages/Title';
import Login from './pages/user/Login';
import Cover from './pages/Cover';
import Introduction from './pages/Introduction';
import Analyze from './pages/Analyze';
import './index.css';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'short',
        element: <Short />,
      },
      {
        path: 'join',
        element: <Join />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'analyze',
        element: <Analyze />,
      },
      {
        path: 'cover',
        element: <Cover />,
      },
      {
        path: 'introduction',
        element: <Introduction />,
      },
      {
        path: 'reserve',
        element: <Reserve />,
      },
      {
        path: 'title',
        element: <Title />,
      },
    ],
    errorElement: <ErrorPage />,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);
