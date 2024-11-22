import './Home.css'
import { Link } from 'react-router-dom';
const Reserve = () => {
    return (
      <div className='home'>
        <h2>제목 생성 및 분석 페이지</h2>
        <li>
          <Link to={'/reserve/1'}>제목 분석</Link>
        </li>
        <li>
          <Link to ={'/reserve/2'}>제목 생성</Link>
        </li>
      </div>
    )
  }
  
  export default Reserve;