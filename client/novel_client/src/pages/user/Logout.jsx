import { getNovelApi } from '../../api/novelApi';

export const logoutFromKakao = async (accessToken) => {
    try {
        console.log('카카오 엑세스 토큰:', accessToken);
        await getNovelApi({
            method: 'GET',
            withCredentials: true,
            url: '/api/auth/kakao/logout',
            data: { accessToken },
        });
        console.log('Kakao 로그아웃 성공');
    } catch (error) {
        throw new Error(error.response?.data || error.message);
    }
};

export const logoutFromNaver = async (accessToken) => {
    try {
        console.log('네이버 엑세스 토큰:', accessToken);
        await getNovelApi({
            method: 'GET',
            withCredentials: true,
            url: '/api/auth/naver/logout',
            data: { accessToken },
        });
        console.log('Naver 로그아웃 성공');
    } catch (error) {
        throw new Error(error.response?.data || error.message);
    }
};

export const logoutDefault = async (email, password) => {
    try {
        await getNovelApi({
            method: 'GET',
            withCredentials: true,
            url: '/api/auth/logout',
            data: { email, password },
        });
        console.log('일반 로그아웃 성공');
    } catch (error) {
        throw new Error(error.response?.data || error.message);
    }
};

export const handleLogout = async (sessionData, toggleLogin) => {
    try {
        if (!sessionData) throw new Error('세션 데이터가 없습니다.');
        console.log('로그아웃 시작, 세션 데이터:', sessionData);

        if (sessionData.provider === 'kakao') {
            await logoutFromKakao(sessionData.accessToken);
        } else if (sessionData.provider === 'naver') {
            await logoutFromNaver(sessionData.accessToken);
        } else {
            const { email, password } = sessionData;
            await logoutDefault(email, password);
        }

        sessionStorage.clear();
        toggleLogin(); // 로그인 상태를 false로 변경
    } catch (error) {
        console.error(error.message);
        throw error; // 호출하는 곳에서 에러 처리
    }
};
