import Title from './nav/Title';
import { useContext, useState, useEffect } from 'react';
import { LoginCheckContext } from '../context/LoginCheck';
import { Link } from 'react-router-dom';
import { handleLogout } from '../pages/user/Logout';
import { FaBars, FaTimes } from 'react-icons/fa';

interface NavItem {
  id: string;
  label: string;
  to: string;
}

interface LoginCheckContextType {
  LoginCheck: boolean;
  toggleLogin: () => void;
}

const Header: React.FC = () => {
  const navItems: NavItem[] = [
    { id: 'home', label: '홈페이지', to: '/' },
    { id: 'short', label: '단락생성', to: '/short' },
    { id: 'cover', label: '표지생성', to: '/cover' },
    { id: 'reserve', label: '소제목생성 및 분석', to: '/reserve' },
    { id: 'introduction', label: '팀소개', to: '/introduction' },
  ];
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const { LoginCheck, toggleLogin } = useContext<LoginCheckContextType>(LoginCheckContext);
  const [error, setError] = useState<string | null>(null); // setError 정의

  // -------------------------로그아웃(시작)----------------------------
  const onLogout = async (event: React.MouseEvent<HTMLButtonElement>) => {
    if (confirm('로그아웃 하시겠습니까?') === false) {
      return;
    }
    try {
      const sessionData = JSON.parse(sessionStorage.getItem('userObj') || 'null');
      await handleLogout(sessionData, toggleLogin);
      console.log('로그아웃 성공');
    } catch (error: any) {
      setError(error.message); // 에러 메시지 처리
    }
  };

  useEffect(() => {}, ['setLogin']);
  // setLogin 일떄 렌더링

  // -------------------------로그아웃(끝)----------------------------

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="z-50 sticky top-0 bg-[#292929] text-gray-300">
      <div className="container px-4 mx-auto flex justify-between items-center h-14">
        <Title />
        <nav className="hidden md:flex space-x-6">
          {navItems.map((Item) => (
            <Link key={Item.id} to={Item.to} className="hover:text-[#c0daaf]">
              {Item.label}
            </Link>
          ))}
        </nav>
        <button className="md:hidden" onClick={toggleMenu}>
          <FaBars />
        </button>
        <div className="hidden md:flex">
          {LoginCheck ? (
            <button onClick={onLogout}>로그아웃</button> // 수정된 부분
          ) : (
            <Link to="/login">로그인</Link>
          )}
        </div>
      </div>

      {/* 모바일 크기 */}
      <aside
        className={`
        fixed top-0 left-0 w-64 h-full bg-gray-800 z-50
        ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        md:hidden transform transition-transform duration-300 ease-in-out`}
      >
        <div className="flex justify-end p-4">
          <button
            className="text-white focus:outline-none"
            aria-label="Close menu"
            onClick={toggleMenu}
          >
            <FaTimes className="h-6 w-6" />
          </button>
        </div>
        <div className="flex flex-col space-y-4 p-4">
          {navItems.map((Item) => (
            <Link key={Item.id} to={Item.to} className="hover:text-gray-600">
              {Item.label}
            </Link>
          ))}
          {LoginCheck ? (
            <button onClick={onLogout}>로그아웃</button> // 수정된 부분
          ) : (
            <Link to="/login">로그인</Link>
          )}
        </div>
      </aside>
    </header>
  );
};

export default Header;
