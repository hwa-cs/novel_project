import Title from './nav/Title';
import NavList from './nav/NavList';
import { useContext } from 'react';
import './Header.css'
import { LoginCheckContext } from '../context/LoginCheck';
const Header= () => {
  const {LoginCheck} = useContext(LoginCheckContext)
  return (
    <header className='nav'>
      <div>
        <Title />
      </div>
      <div>
        <NavList />
      </div>
      <div>
        {LoginCheck? 
        <div>로그인</div>:
        <div>로그아웃</div>}
      </div>
    </header>
  )
}

export default Header;