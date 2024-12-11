import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Title from './nav/Title';
import { useContext, useState, useEffect } from 'react';
import { LoginCheckContext } from '../context/LoginCheck';
import { Link } from 'react-router-dom';
import { handleLogout } from '../pages/user/Logout';
import { FaBars, FaTimes } from 'react-icons/fa';
const Header = () => {
    const navItems = [
        { id: 'home', label: '홈페이지', to: '/' },
        { id: 'short', label: '단락생성', to: '/short' },
        { id: 'cover', label: '표지생성', to: '/cover' },
        { id: 'reserve', label: '소제목생성 및 분석', to: '/reserve' },
        { id: 'introduction', label: '팀소개', to: '/introduction' },
    ];
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { LoginCheck, toggleLogin } = useContext(LoginCheckContext);
    const [error, setError] = useState(null); // setError 정의
    // -------------------------로그아웃(시작)----------------------------
    const onLogout = async (event) => {
        if (confirm('로그아웃 하시겠습니까?') === false) {
            return;
        }
        try {
            const sessionData = JSON.parse(sessionStorage.getItem('userObj') || 'null');
            await handleLogout(sessionData, toggleLogin);
            console.log('로그아웃 성공');
        }
        catch (error) {
            setError(error.message); // 에러 메시지 처리
        }
    };
    useEffect(() => { }, ['setLogin']);
    // setLogin 일떄 렌더링
    // -------------------------로그아웃(끝)----------------------------
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    return (_jsxs("header", { className: "z-50 sticky top-0 bg-[#292929] text-gray-300", children: [_jsxs("div", { className: "container px-4 mx-auto flex justify-between items-center h-14", children: [_jsx(Title, {}), _jsx("nav", { className: "hidden md:flex space-x-6", children: navItems.map((Item) => (_jsx(Link, { to: Item.to, className: "hover:text-[#c0daaf]", children: Item.label }, Item.id))) }), _jsx("button", { className: "md:hidden", onClick: toggleMenu, children: _jsx(FaBars, {}) }), _jsx("div", { className: "hidden md:flex", children: LoginCheck ? (_jsx("button", { onClick: onLogout, children: "\uB85C\uADF8\uC544\uC6C3" }) // 수정된 부분
                        ) : (_jsx(Link, { to: "/login", children: "\uB85C\uADF8\uC778" })) })] }), _jsxs("aside", { className: `
        fixed top-0 left-0 w-64 h-full bg-gray-800 z-50
        ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        md:hidden transform transition-transform duration-300 ease-in-out`, children: [_jsx("div", { className: "flex justify-end p-4", children: _jsx("button", { className: "text-white focus:outline-none", "aria-label": "Close menu", onClick: toggleMenu, children: _jsx(FaTimes, { className: "h-6 w-6" }) }) }), _jsxs("div", { className: "flex flex-col space-y-4 p-4", children: [navItems.map((Item) => (_jsx(Link, { to: Item.to, className: "hover:text-gray-600", children: Item.label }, Item.id))), LoginCheck ? (_jsx("button", { onClick: onLogout, children: "\uB85C\uADF8\uC544\uC6C3" }) // 수정된 부분
                            ) : (_jsx(Link, { to: "/login", children: "\uB85C\uADF8\uC778" }))] })] })] }));
};
export default Header;
