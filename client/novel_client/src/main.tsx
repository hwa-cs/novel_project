import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Join from './pages/user/Join';
import Reserve from './pages/Reserve';
import ErrorPage from './pages/ErrorPage';
import Reserve_1 from './pages/Reserve_1';
import Reserve_2 from './pages/Reserve_2';
import Login from './pages/user/Login';
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
        path: 'profile',
        element: <Profile />,
      },
      {
        path: 'join',
        element: <Join />,
      },
      {
        path: 'reserve',
        element: <Reserve />,
      },
      {
        path: 'reserve/1',
        element: <Reserve_1 />,
      },
      {
        path: 'reserve/2',
        element: <Reserve_2 />,
      },
      {
        path: 'login',
        element: <Login />,
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
