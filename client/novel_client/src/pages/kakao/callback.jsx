import { useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { LoginCheckContext } from '../../context/LoginCheck';
import { getNovelApi } from '../../api/novelApi';

const Callback = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { LoginCheck, toggleLogin } = useContext(LoginCheckContext)

  useEffect( async () => { 
    // URL에서 토큰과 닉네임 읽기
    const queryParams = new URLSearchParams(location.search);
    console.log('쿼리 :', queryParams);
    const token = queryParams.get('token');
    const nick = queryParams.get('nickname');
    const id = queryParams.get('id');
    const provider = queryParams.get('provider');
    const email = queryParams.get('email');
    const accessToken = queryParams.get('accessToken');

    try {
        const response = await getNovelApi({
            method: 'POST',
            withCredentials: true,
            url: '/api/users/Data',
            data: { id },
        });

        const userPosts = response.data.posts;
        const userCovers = response.data.covers;
        sessionStorage.setItem('userPosts', JSON.stringify(userPosts));
        sessionStorage.setItem('userCovers', JSON.stringify(userCovers));

    } catch (error) {
        console.error(error.response?.data || error.message);
        setError(error.response?.data?.error || '로그인에 실패했습니다.');
    }


    if (token) {
      // 토큰을 세션 스토리지에 저장
      const userObj = {'id': id, 'email': email, 'nick': nick, 'provider': provider, 'accessToken': accessToken}
      sessionStorage.setItem('token', token);
      sessionStorage.setItem('userObj',JSON.stringify(userObj));
    }

      window.location.replace('/login');        
    }, [navigate,'setLogin'])
      // 토큰 처리 후 URL 클리어를 위해 메인 페이지로 리다이렉트

  return <div>Loading...</div>;
};

export default Callback;