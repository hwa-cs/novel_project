import { createContext, useState } from 'react'

export const LoginCheckContext = createContext(false)

export const LoginCheckProvider = ({children}) => {

    const [LoginCheck, setLogin] = useState(false);
    const handleLogin = () => {
      setLogin(!LoginCheck);
    }

    return (
    <LoginCheckContext.Provider value={{LoginCheck, handleLogin}}>
        {children}
    </LoginCheckContext.Provider>
    )
}