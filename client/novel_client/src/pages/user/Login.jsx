import { useState } from 'react';
import { getNovelApi } from '../../api/novelApi';  // API 요청을 보내는 함수

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const handleLogin = async () => {
        try {
            // 로그인 요청을 POST 방식으로 보내기
            const response = await getNovelApi({
                method: 'POST',
                url: '/api/auth/login', // POST 요청 URL
                data: { email, password }, // 서버로 보내는 데이터
            });
            console.log(response.data); // 서버의 응답 처리
        } catch (error) {
            console.error(error.response?.data || error.message); // 에러 처리
        }
    };
    
    return (
        <div className='home'>
            <div className='join'>
                <h2>로그인 페이지 입니다.</h2>
                <div>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button onClick={handleLogin}>로그인</button>
                </div>
            </div>
        </div>
    );
};

export default Login;
