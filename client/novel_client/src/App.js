import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Header from './components/Header';
import { Outlet } from 'react-router-dom';
import Footer from './components/Footer';
import { LoginCheckProvider } from './context/LoginCheck';
const App = () => {
    return (_jsxs(LoginCheckProvider, { children: [_jsx(Header, {}), _jsx(Outlet, {}), _jsx(Footer, {})] }));
};
export default App;
