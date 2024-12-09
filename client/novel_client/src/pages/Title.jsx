import TextTypingAni from "../components/TypingAnimation";
import Typewriter from 'typewriter-effect';
import {useState, Component} from 'react'
import { getModelApi } from '../api/novelApi'; // API 요청 함수
import { FaSpinner } from "react-icons/fa";

const Title = () => {
  const [content, setContent] = useState("");  
  const [loading, setLoading] = useState(false)
  const [title, setTitle] = useState('');
  const [text, setText] = useState('')

// ----------------------------------------------------------------
  const handleText = (e) => {
    const file = e.target.files[0]
    // 파일 여러개중 처음 하나만 선택

    const reader = new FileReader()
    // 클래스 파일리더를 사용하겠다 reder로

    reader.readAsText(file);
    // 위에서 생성한 파일을 읽기

    reader.onload = (e) => {
      const text = e.target.result;
      setText(text);
      // const prompt = text;
      // console.log('프롬프트 :', text);
    }
  }
   const handleTitle = async () => {
    const prompt = text
    console.log('prompt :', prompt)
    try {
      if (!loading) {
          setLoading(true);
      }
        const response = await getModelApi({
            method: 'POST',
            withCredentials: true,
            url: '/title',
            // data: { email, password },
            data: { passage: prompt },
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
            },
        });
        console.log('생성된 제목', response.data);
        setTitle(response.data.title);
        setLoading(false);
    } catch (error) {
        console.error(error.response?.data || error.message);
        setError(error.response?.data?.error || '모델로드에 실패했습니다.');
    }
   }

    return (
      <div className="h-lvh bg-gradient-to-b from-[#dcddd3] via-[#e2e3dc] to-[#dcddd3] shadow-inner-corner p-24">
        <div className='bg-[#434448] p-4 shadow-inner-corner rounded-2xl flex justify-center h-full w-full pt-28'>
          <div className="">
            <div className="text-center mb-10 text-[40px]">
              <div className="text-center text-2xl font-bold">
                <Typewriter
                  options={{
                    strings: [`${title}`],
                    autoStart: true,
                    loop: true,  // 반복되도록 설정
                    cursor: "",   // 커서도 표시되지 않도록 설정
                    deleteSpeed: 99999
                  }}
                />
                <input
                  type='file'
                  className="flex-grow border p-2 m-2 rounded-md shadow-sm mt-10"
                  placeholder="내용을 입력하세요"
                  onChange={handleText}
                />
                <button 
                onClick={handleTitle} 
                disabled={loading}
                className='bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600'>
                  <span className="flex items-center justify-center">
                    {loading? <FaSpinner /> : '출력'}
                  </span>
                </button>
              </div>
            </div>
            <div className="text-gray-300 text-center flex-grow overflow-hidden whitespace-pre-line w-[800px] h-[165px]">
              {`${text}`}
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  export default Title;