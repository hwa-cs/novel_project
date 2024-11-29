import { createContext, useState, useEffect } from 'react'
import Session from 'react-session-api'
import { getNovelApi } from '../api/novelApi';  // API 요청을 보내는 함수
// context 사용하기 위해서 createContext 임폴트

export const LoginCheckContext = createContext(false)
// createContext 사용하기위해 정의
// 다른 파일에서 usecontext로 사용 가능

const userId = JSON.parse(sessionStorage.getItem('userObj'))

export const LoginCheckProvider = ({children}) => {
    const [LoginCheck, setLogin] = useState();
    const toggleLogin = (userId) => {
        setLogin(!LoginCheck)
      }

      useEffect(() => {
        // 로그인 상태 체크
        if (userId != null) {
          setLogin(true) 
        } else {
          setLogin(false)
        }
      }, [])

    return (
    <LoginCheckContext.Provider value={{LoginCheck, toggleLogin}}>
        {children}
    </LoginCheckContext.Provider>
    )
}