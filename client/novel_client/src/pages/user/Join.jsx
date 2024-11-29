
import { getNovelApi } from '../../api/novelApi'; // API 요청 함수
import { useState } from 'react';
import { Link,useNavigate } from'react-router-dom';

const Join = () => {
  const navigate = useNavigate();  // 페이지 이동을 위한 navigate
  const [email, setEmail] = useState('');
  const [nick, setNick] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [response, setResponse] = useState(null); // API 요청 결과
  const [loading, setLoading] = useState(false); // 로딩 상태
  const [error, setError] = useState(''); // 에러 메시지
  const passwordRegEx = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,20}$/;
  const emailCheck = (email) => {
    const emailRegEx = /^[A-Za-z0-9]([A-Za-z0-9._-]*[A-Za-z0-9])?@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailRegEx.test(email); // 형식에 맞을 경우 true 리턴
  }


  const handleJoin = async () => {
    // 간단한 유효성 검사
    if (!email || !nick || !password) {
      setError('모든 필드를 입력해주세요.');
      return;
    }
    if (!emailCheck(email)) {
      setError('이메일 형식에 맞지않습니다.')
      return;
    }
    if (password != passwordCheck) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }
    if (password.match(passwordRegEx)===null) {
      setError('비밀번호 형식을 확인해주세요')
      return;
    }

    setLoading(true); // 로딩 시작
    setError(''); // 기존 에러 초기화

    try {
      const response = await getNovelApi({
        method: 'POST',
        url: '/api/auth/join',
        data: { email, nick, password },
      });

      alert('회원가입 성공! 🎉');
      setResponse(response.data); // 성공 메시지
      setEmail(''); // 입력 필드 초기화
      setNick('');
      setPassword('');
      navigate('/Login'); // 로그인 페이지로 리다이렉션
    } catch (error) {
      console.error(error.response?.data || error.message);
      setError(error.response?.data?.error || '회원가입에 실패했습니다.');
    } finally {
      setLoading(false); // 로딩 종료
    }
  };

  return (
    <div className='bg-gradient-to-b from-[#dcddd3] via-[#e2e3dc] to-[#dcddd3] shadow-inner-corner h-screen flex justify-center items-center relative'>

      <div 
          className='bg-black rotate-[170deg] h-[600px] w-[430px] absolute top-20 flex flex-col items-center border p-6 rounded-lg shadow-lg' 
       />
    
      <div 
          id='login' 
          className='bg-white h-[600px] w-[430px] absolute top-20 flex flex-col items-center rounded-lg shadow-lg pt-8' 
      >
        <div className='text-center'>
          <h2 className="mb-4 text-2xl">회원가입 페이지</h2>
          {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
          {response && <div style={{ color: 'green', marginBottom: '10px' }}>{response.success}</div>}
          <div className="flex flex-col space-y-4 mb-4">
            <input
              type="email"
              placeholder="이메일"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border p-2 rounded-md m-2 w-64"
            />
            <input
              type="text"
              placeholder="이름"
              value={nick}
              onChange={(e) => setNick(e.target.value)}
              className="border p-2 rounded-md m-2 w-64"
            />                    
            <input
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border p-2 rounded-md m-2 w-64"
              />               
            <input
              type="password"
              placeholder="비밀번호 재확인"
              value={passwordCheck}
              onChange={(e) => setPasswordCheck(e.target.value)}
              className="border p-2 rounded-md m-2 w-64"
              />
            <p>비밀번호는 영문 대소문자, 특수문자, </p>
            <p>숫자를 혼합하여 8~20자로 입력해주세요</p>
            </div>
            <button onClick={handleJoin } disabled={loading} className="border p-2 m-2 w-64">
              {loading ? '가입 중...' : '회원가입'}
            </button>
            <br />
            <Link to="/login">이미 가입된 회원이세요?</Link>
          </div>
        
    </div>
</div>
  );
};

export default Join;
