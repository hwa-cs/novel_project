import Header from './components/Header'
import { Outlet } from 'react-router-dom';
import Footer from './components/Footer'
import { LoginCheckProvider } from './context/LoginCheck';

const App = () => {
    
  return (
      <LoginCheckProvider>
          <Header />
          <Outlet />
          <Footer />
      </LoginCheckProvider>
    )
}

export default App



  
  //     // 변수 id의 값을 "id"로 초기화
  //     const [id, setId] = useState("id");
      
  //     // 기존의 cookie를 저장
  //     const [cookies, setCookies] = useCookies(["id"]);
      
  //     // 변수 id의 값을 업데이트 하는 함수
  //     const changeId = (e) => {
  //       setId(e.target.value);
  //     }
      
  //     // cookie에 id 값 저장
  //     const cookieSave = () => {
  //       setCookies("id", id, {path: './'});
  //     }
      
      
  //     return (
  //       <div>
  //           <input type="text" value={id} onChange={changeId} />
  //             <button type="button" onClick={cookieSave}>cookie에 저장</button>
  //         </div>
  //     )
  // }