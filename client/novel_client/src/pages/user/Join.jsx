import '../Home.css'
const Join = () => {
    return (
        <div className='home'>
            <div className='join'>
            <h2>회원가입 페이지 입니다.</h2>
                <input type="text" placeholder="ID"/>
                <input type="password" placeholder="비밀번호"/>
                <input type="text" placeholder="이름"/>
                <button>회원가입</button>
            </div>
        </div>
    )
  }
  
  export default Join;