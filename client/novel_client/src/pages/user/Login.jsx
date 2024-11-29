import { useState, useContext, useEffect } from 'react';
import { getNovelApi } from '../../api/novelApi';  // API 요청을 보내는 함수
import { LoginCheckContext } from '../../context/LoginCheck';
import { Link } from'react-router-dom';
import Session from 'react-session-api'
import {useCookies} from 'react-cookie';

const Login = () => {
    const { LoginCheck, toggleLogin } = useContext(LoginCheckContext)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [response, setResponse] = useState(null);  // API 요청 결과를 저장할 state
    const [error, setError] = useState(''); // 에러 메시지

    /* ----------------------(로그인)-------------------------- */
    const handleLogin = async () => {
        // 간단한 유효성 검사
        if (!email || !password) {
          setError('모든 필드를 입력해주세요.');
          return;
        }

        setError(''); // 기존 에러 초기화

        try {
            // 로그인 요청을 POST 방식으로 보내기
            const response = await getNovelApi({
                method: 'POST',
                withCredentials: true,
                url: '/api/auth/login', // POST 요청 URL
                data: { email, password }, // 서버로 보내는 데이터
            })
            console.log('성공', response.data.data); // 서버의 응답 처리
            console.log('로그인 포스트 데이터', response.data.posts);
            const userObj = response.data.data
            const userPosts = response.data.posts
            sessionStorage.setItem('userObj', JSON.stringify(userObj))
            sessionStorage.setItem('userPosts', JSON.stringify(userPosts))
            toggleLogin(); // 로그인 성공시 로그인 상태를 true로 변경
            setResponse(response.data.message); // state 
        } catch (error) {
      console.error(error.response?.data || error.message);
      setError(error.response?.data?.error || '로그인에 실패했습니다.');
        }
    }
    /* ----------------------(로그인)-------------------------- */



    /* ----------------------(로그아웃)-------------------------- */
    const handleLogout = async () => {
        try {
            // 로그아웃 요청을 GET 방식으로 보내기
            const response = await getNovelApi({
                method: 'GET',
                url: '/api/auth/logout', // GET 요청 URL
                withCredentials: true,
                data: { email, password }, // 서버로 보내는 데이터
            })
            console.log('로그아웃');
            sessionStorage.clear()
            toggleLogin(); // 로그아웃 성공시 로그인 상태를 false로 변경
        } catch (error) {
            console.error(error.response?.data || error.message); // 에러 처리
            setResponse(error.response?.data.error); // state 
        }
    }

    useEffect(() => {        
    }, ['setLogin'])

    let key = JSON.parse(sessionStorage.getItem("userObj"))

    return (
        <div className='bg-gradient-to-b from-[#dcddd3] via-[#e2e3dc] to-[#dcddd3] shadow-inner-corner  h-screen flex justify-center items-center relative '>

            <div className='bg-black rotate-[170deg] h-[600px] w-[430px] absolute top-20 flex flex-col items-center border p-6 rounded-lg shadow-lg' />
            
            <div 
                id='login' 
                className='bg-white h-[600px] w-[430px] absolute top-20 flex flex-col items-center rounded-lg shadow-lg pt-8' 
            >
                {LoginCheck ? 
                    <div className='text-center'>
                        <h2>{key.nick} 님 안녕하세요</h2>
                        <button onClick={handleLogout} className="mt-4 px-4 py-2 border rounded-md">로그아웃</button>
                    </div> : 
                    <div className='text-center'>
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
                        <button onClick={handleLogin} className="border p-2 m-2 w-64">로그인</button>
                        <br />
                        <Link to='/join' className="text-blue-500">회원가입</Link>
                    </div>
                }
            </div>
        </div>
    )    
}

export default Login;
