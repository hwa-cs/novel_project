import { createContext, useState, useEffect, ReactNode } from 'react';

// 컨텍스트 데이터 타입 정의
interface LoginContextType {
  LoginCheck: boolean; // 로그인 상태 (true/false)
  toggleLogin: () => void; // 로그인 상태 변경 함수
}

// 컨텍스트 생성
export const LoginCheckContext = createContext<LoginContextType>({
  LoginCheck: false, // 기본값은 false
  toggleLogin: () => {}, // 빈 함수로 설정
});

// Provider 컴포넌트 정의
export const LoginCheckProvider = ({ children }: { children: ReactNode }) => {
  // ReactNode : 컴포넌트의 자식(children)으로 전달될 수 있는 모든 것
  const [LoginCheck, setLoginCheck] = useState<boolean>(false);

  useEffect(() => {
    // 세션 스토리지에서 userObj 확인
    const userId = JSON.parse(sessionStorage.getItem('userObj') || 'null');
    if (userId) {
      setLoginCheck(true); // 로그인 상태로 설정
    } else {
      setLoginCheck(false); // 로그아웃 상태로 설정
    }
  }, []);

  const toggleLogin = () => {
    setLoginCheck((prev) => !prev); // 상태 반전
  };

  return (
    <LoginCheckContext.Provider value={{ LoginCheck, toggleLogin }}>
      {children}
    </LoginCheckContext.Provider>
  );
};
