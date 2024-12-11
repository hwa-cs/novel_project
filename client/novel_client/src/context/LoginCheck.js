import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useState, useEffect } from 'react';
// 컨텍스트 생성
export const LoginCheckContext = createContext({
    LoginCheck: false, // 기본값은 false
    toggleLogin: () => { }, // 빈 함수로 설정
});
// Provider 컴포넌트 정의
export const LoginCheckProvider = ({ children }) => {
    // ReactNode : 컴포넌트의 자식(children)으로 전달될 수 있는 모든 것
    const [LoginCheck, setLoginCheck] = useState(false);
    useEffect(() => {
        // 세션 스토리지에서 userObj 확인
        const userId = JSON.parse(sessionStorage.getItem('userObj') || 'null');
        if (userId) {
            setLoginCheck(true); // 로그인 상태로 설정
        }
        else {
            setLoginCheck(false); // 로그아웃 상태로 설정
        }
    }, []);
    const toggleLogin = () => {
        setLoginCheck((prev) => !prev); // 상태 반전
    };
    return (_jsx(LoginCheckContext.Provider, { value: { LoginCheck, toggleLogin }, children: children }));
};
