import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getNovelApi } from '../../api/novelApi';
const Callback = () => {
    const location = useLocation();
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            // URL에서 토큰과 닉네임 읽기
            const queryParams = new URLSearchParams(location.search);
            console.log('쿼리 :', queryParams);
            const nick = queryParams.get('nickname');
            const id = queryParams.get('id');
            const provider = queryParams.get('provider');
            const email = queryParams.get('email');
            const accessToken = queryParams.get('accessToken');
            const userObj = {
                id: id,
                email: email,
                nick: nick,
                provider: provider,
                accessToken: accessToken,
            };
            console.log('userObj', userObj);
            try {
                console.log('id', id);
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
                // 사용자 객체를 세션에 저장
                sessionStorage.setItem('userObj', JSON.stringify(userObj));
                // 리다이렉션
                window.location.replace('/login');
            }
            catch (error) {
                console.error(error.response?.data || error.message);
                setError(error.response?.data?.error || '로그인에 실패했습니다.');
            }
        };
        fetchData();
    }, [location]);
    return (_jsxs("div", { children: [error && _jsx("p", { children: error }), _jsx("p", { children: "Loading..." })] }));
};
export default Callback;
