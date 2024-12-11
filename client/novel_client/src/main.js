import { jsx as _jsx } from "react/jsx-runtime";
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
import './index.css';
const queryClient = new QueryClient();
const router = createBrowserRouter([
    {
        path: '/',
        element: _jsx(App, {}),
        children: [
            {
                path: '',
                element: _jsx(Home, {}),
            },
            {
                path: 'short',
                element: _jsx(Short, {}),
            },
            {
                path: 'join',
                element: _jsx(Join, {}),
            },
            {
                path: 'login',
                element: _jsx(Login, {}),
            },
            {
                path: 'analyze',
                element: _jsx(Analyze, {}),
                children: [
                    {
                        path: 'fantasy',
                        element: _jsx(Fantasy, {}),
                    },
                    {
                        path: 'romance',
                        element: _jsx(Romance, {}),
                    },
                    {
                        path: 'romanceFantasy',
                        element: _jsx(RomanceFantasy, {}),
                    },
                    {
                        path: 'currentFantasy',
                        element: _jsx(CurrentFantasy, {}),
                    },
                    {
                        path: 'martial',
                        element: _jsx(Martial, {}),
                    },
                ],
            },
            {
                path: 'cover',
                element: _jsx(Cover, {}),
            },
            {
                path: 'introduction',
                element: _jsx(Introduction, {}),
            },
            {
                path: 'reserve',
                element: _jsx(Reserve, {}),
            },
            {
                path: 'title',
                element: _jsx(Title, {}),
            },
            {
                path: 'Callback',
                element: _jsx(Callback, {}),
            },
        ],
        errorElement: _jsx(ErrorPage, {}),
    },
]);
// createRoot에 전달되는 DOM 요소가 null일 경우 대비
const rootElement = document.getElementById('root');
if (rootElement) {
    createRoot(rootElement).render(_jsx(StrictMode, { children: _jsx(QueryClientProvider, { client: queryClient, children: _jsx(RouterProvider, { router: router }) }) }));
}
