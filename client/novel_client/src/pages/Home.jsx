import './Home.css'
import { LoginCheckContext } from "../context/LoginCheck";
import { useEffect, useState, useContext } from 'react';
import { Link } from'react-router-dom';
import axios from 'axios'
import { getNovelApi } from '../api/novelApi';

const Home = () =>  {
    // const { LoginCheck, handleLogin} = useContext(LoginCheckContext)
    // let button;
    // if (LoginCheck) {
    //     button = 'Login' 
    // } else {
    //     button = 'Logout'
    // }
    // const [dummyData, setDummyData] = useState([])

    // async function fetchData() {
    //     const response = await getNovelApi()
    //     setDummyData(response.data.message)
    // }
    // useEffect(() => {
    //     fetchData()
    // }, [])

    return (
      <div className='home'>
        <h2>홈페이지 입니다.</h2>
        <Link to="/login">로그인</Link>
        {/* {dummyData}
        <button onClick={handleLogin}> 
            {button}
            {console.log(LoginCheck)}
        </button> */}
      </div>
    )
  }
  
  export default Home;