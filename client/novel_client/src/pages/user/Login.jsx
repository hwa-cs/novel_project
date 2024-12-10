import React, { useState, useContext } from 'react';
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
    const NaverAuthURL =`https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NaverID}&state=STATE_STRING&redirect_uri=${NaverCallback}`;
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
            const userCovers = response.data.covers
            console.log('로그인 시도  : ', userCovers);

            sessionStorage.setItem('userObj', JSON.stringify(userObj));
            sessionStorage.setItem('userPosts', JSON.stringify(userPosts));
            sessionStorage.setItem('userCovers', JSON.stringify(userCovers));

            toggleLogin();
            setResponse(response.data.message);
        } catch (error) {
            console.error(error.response?.data || error.message);
            setError(error.response?.data?.error || '로그인에 실패했습니다.');
        }
    };

    const onLogout = async () => {
        try {
            const sessionData = JSON.parse(sessionStorage.getItem('userObj'));
            await handleLogout(sessionData, toggleLogin);
            console.log('로그아웃 성공');
        } catch (error) {
            setError(error.message);
        }
    };

    const key = JSON.parse(sessionStorage.getItem('userObj'));

    return (
        <div className="bg-gradient-to-b from-[#dcddd3] via-[#e2e3dc] to-[#dcddd3] shadow-inner-corner h-screen flex justify-center items-center relative">
            <div className="bg-books_2-img bg-cover rotate-[170deg] h-[600px] w-[430px] absolute top-20 flex flex-col items-center border p-6 rounded-lg shadow-lg" />
            <div
                id="login"
                className="bg-white h-[600px] w-[430px] absolute top-20 flex flex-col items-center rounded-lg shadow-lg pt-8"
            >
                {LoginCheck ? (
                    <div className="text-center">
                        <h2>{key?.nick} 님 안녕하세요</h2>
                        <button onClick={onLogout} className="mt-4 px-4 py-2 border rounded-md">
                            로그아웃
                        </button>
                    </div>
                ) : (
                    <div className="text-center">
                        <h2 className="mb-4 text-2xl">Login</h2>
                        {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
                        {response && <div style={{ color: 'green', marginBottom: '10px' }}>{response.success}</div>}
                        <div className="flex flex-col space-y-4 mb-4">
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="border p-2 rounded-md m-2 w-64"
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="border p-2 rounded-md m-2 w-64"
                            />
                        </div>
                        <button onClick={handleLogin} className="border p-2 m-2 w-64 h-10">
                            로그인
                        </button>
                        <a href={KakaoAuthURL}>
                            <img src={kakaoLogin} alt="kakaoLogin" className="m-2 w-64 h-10 cursor-pointer" />
                        </a>
                        <a href={NaverAuthURL}>
                            <img src={naverLogin} alt="naverLogin" className="m-2 w-64 h-10 cursor-pointer" />
                        </a>
                        <Link to="/join" className="text-blue-500">
                            회원가입
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Login;
