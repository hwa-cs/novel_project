import { getNovelApi } from '../../api/novelApi';

export const logoutFromKakao = async (accessToken: string): Promise<void> => {
    try {
        console.log('카카오 엑세스 토큰:', accessToken);
        await getNovelApi({
            method: 'GET',
            withCredentials: true,
            url: '/api/auth/kakao/logout',
            data: { accessToken },
        });
        console.log('Kakao 로그아웃 성공');
    } catch (error: any) {
        throw new Error(error.response?.data || error.message);
    }
};

export const logoutFromNaver = async (accessToken: string): Promise<void> => {
    try {
        console.log('네이버 엑세스 토큰:', accessToken);
        await getNovelApi({
            method: 'GET',
            withCredentials: true,
            url: '/api/auth/naver/logout',
            data: { accessToken },
        });
        console.log('Naver 로그아웃 성공');
    } catch (error: any) {
        throw new Error(error.response?.data || error.message);
    }
};

export const logoutDefault = async (email: string): Promise<void> => {
    try {
        await getNovelApi({
            method: 'GET',
            withCredentials: true,
            url: '/api/auth/logout',
            data: { email},
        });
        console.log('일반 로그아웃 성공');
    } catch (error: any) {
        throw new Error(error.response?.data || error.message);
    }
};

interface SessionData {
    provider: 'kakao' | 'naver' | 'default';
    accessToken?: string;
    email?: string;
    password?: string;
}

export const handleLogout = async (
    sessionData: SessionData | null, 
    toggleLogin: () => void
     ) => {        
    try {
        if (!sessionData) throw new Error('세션 데이터가 없습니다.');
        console.log('로그아웃 시작, 세션 데이터:', sessionData);

        if (sessionData.provider === 'kakao') {
            if (!sessionData.accessToken) throw new Error('카카오 액세스 토큰이 없습니다.');
            await logoutFromKakao(sessionData.accessToken);
        } else if (sessionData.provider === 'naver') {
            if (!sessionData.accessToken) throw new Error('네이버 액세스 토큰이 없습니다.');
            await logoutFromNaver(sessionData.accessToken);
        } else {
            if (!sessionData.email) {
                throw new Error('이메일');
            }
            await logoutDefault(sessionData.email);
        }

        sessionStorage.clear();
        toggleLogin(); // 로그인 상태를 false로 변경
    } catch (error: any) {
        console.error(error.message);
        throw error; // 호출하는 곳에서 에러 처리
    }
};
