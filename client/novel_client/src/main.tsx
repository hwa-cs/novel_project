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
import Fantasy from './pages/Genre/Fantasy';
import Callback from './pages/SnsLogin/Callback';
import Romance from './pages/Genre/Romance';
import RomanceFantasy from './pages/Genre/RomanceFantasy';
import CurrentFantasy from './pages/Genre/CurrentFantasy';
import Martial from './pages/Genre/Martial';
import UserPage from './pages/UserPage';
import PostDetail from './pages/UserDetail';
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
                children: [
                    {
                        path: 'fantasy',
                        element: <Fantasy />,
                    },
                    {
                        path: 'romance',
                        element: <Romance />,
                    },
                    {
                        path: 'romanceFantasy',
                        element: <RomanceFantasy />,
                    },
                    {
                        path: 'currentFantasy',
                        element: <CurrentFantasy />,
                    },
                    {
                        path: 'martial',
                        element: <Martial />,
                    },
                ],
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
            {
                path: 'Callback',
                element: <Callback />,
            },
            {
                path: 'UserPage',
                element: <UserPage />,
            },
            // 추가된 라우트
            {
                path: 'post-detail/:id',
                element: <PostDetail />,
            },
        ],
        errorElement: <ErrorPage />,
    },
]);


// createRoot에 전달되는 DOM 요소가 null일 경우 대비
const rootElement = document.getElementById('root');
if (rootElement) {
    createRoot(rootElement).render(
        <StrictMode>
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={router} />
            </QueryClientProvider>
        </StrictMode>
    );
}
