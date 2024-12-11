import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useContext } from 'react';
import { getNovelApi } from '../../api/novelApi';
import { LoginCheckContext } from '../../context/LoginCheck';
import { Link } from 'react-router-dom';
import kakaoLogin from '../../../public/Images/kakao_login_large.png';
import naverLogin from '../../../public/Images/btnG.png';
import { handleLogout } from './Logout';
const Login = () => {
    const KakaoID = import.meta.env.VITE_KAKAO_ID;
    const KakaoCallback = import.meta.env.VITE_KAKAO_CALLBACK;
    const KakaoAuthURL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KakaoID}&redirect_uri=${KakaoCallback}`;
    const NaverID = import.meta.env.VITE_NAVER_ID;
    const NaverCallback = import.meta.env.VITE_NAVER_CALLBACK;
    const NaverAuthURL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NaverID}&state=STATE_STRING&redirect_uri=${NaverCallback}`;
    const { LoginCheck, toggleLogin } = useContext(LoginCheckContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [response, setResponse] = useState(null);
    const [error, setError] = useState('');
    const handleLogin = async () => {
        if (!email || !password) {
            setError('모든 필드를 입력해주세요.');
            return;
        }
        setError('');
        try {
            const response = await getNovelApi({
                method: 'POST',
                withCredentials: true,
                url: '/api/auth/login',
                data: { email, password },
            });
            const userObj = response.data.data;
            const userPosts = response.data.posts;
            const userCovers = response.data.covers;
            console.log('로그인 시도  : ', userCovers);
            sessionStorage.setItem('userObj', JSON.stringify(userObj));
            sessionStorage.setItem('userPosts', JSON.stringify(userPosts));
            sessionStorage.setItem('userCovers', JSON.stringify(userCovers));
            toggleLogin();
            setResponse(response.data.message);
        }
        catch (error) {
            console.error(error.response?.data || error.message);
            setError(error.response?.data?.error || '로그인에 실패했습니다.');
        }
    };
    const onLogout = async () => {
        try {
            const sessionData = JSON.parse(sessionStorage.getItem('userObj') || '{}');
            await handleLogout(sessionData, toggleLogin);
            console.log('로그아웃 성공');
        }
        catch (error) {
            setError(error.message);
        }
    };
    const key = JSON.parse(sessionStorage.getItem('userObj') || '{}');
    return (_jsxs("div", { className: "bg-gradient-to-b from-[#dcddd3] via-[#e2e3dc] to-[#dcddd3] shadow-inner-corner h-screen flex justify-center items-center relative", children: [_jsx("div", { className: "bg-books_2-img bg-cover rotate-[170deg] h-[600px] w-[430px] absolute top-20 flex flex-col items-center border p-6 rounded-lg shadow-lg" }), _jsx("div", { id: "login", className: "bg-white h-[600px] w-[430px] absolute top-20 flex flex-col items-center rounded-lg shadow-lg pt-8", children: LoginCheck ? (_jsxs("div", { className: "text-center", children: [_jsxs("h2", { children: [key?.nick, " \uB2D8 \uC548\uB155\uD558\uC138\uC694"] }), _jsx("button", { onClick: onLogout, className: "mt-4 px-4 py-2 border rounded-md", children: "\uB85C\uADF8\uC544\uC6C3" })] })) : (_jsxs("div", { className: "text-center", children: [_jsx("h2", { className: "mb-4 text-2xl", children: "Login" }), error && _jsx("div", { style: { color: 'red', marginBottom: '10px' }, children: error }), response && _jsx("div", { style: { color: 'green', marginBottom: '10px' }, children: response.success }), _jsxs("div", { className: "flex flex-col space-y-4 mb-4", children: [_jsx("input", { type: "email", placeholder: "Email", value: email, onChange: (e) => setEmail(e.target.value), className: "border p-2 rounded-md m-2 w-64" }), _jsx("input", { type: "password", placeholder: "Password", value: password, onChange: (e) => setPassword(e.target.value), className: "border p-2 rounded-md m-2 w-64" })] }), _jsx("button", { onClick: handleLogin, className: "border p-2 m-2 w-64 h-10", children: "\uB85C\uADF8\uC778" }), _jsx("a", { href: KakaoAuthURL, children: _jsx("img", { src: kakaoLogin, alt: "kakaoLogin", className: "m-2 w-64 h-10 cursor-pointer" }) }), _jsx("a", { href: NaverAuthURL, children: _jsx("img", { src: naverLogin, alt: "naverLogin", className: "m-2 w-64 h-10 cursor-pointer" }) }), _jsx(Link, { to: "/join", className: "text-blue-500", children: "\uD68C\uC6D0\uAC00\uC785" })] })) })] }));
};
export default Login;
