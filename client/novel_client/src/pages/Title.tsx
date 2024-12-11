import Typewriter from 'typewriter-effect';
import { useState, ChangeEvent } from 'react';
import { getModelApi } from '../api/novelApi'; // API 요청 함수
import { FaSpinner } from 'react-icons/fa';
const Title = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [text, setText] = useState<string>('');

// ----------------------------------------------------------------
  const handleText = (e: ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0]
    // 파일 여러개중 처음 하나만 선택
    if (!file) return;
    // 파일이 없으면 종료

    const reader = new FileReader()
    // 클래스 파일리더를 사용하겠다 reder로

    reader.readAsText(file);
    // 위에서 생성한 파일을 읽기

    reader.onload = (event) => {
      const fileText = event.target?.result as string;
      // 타입 단언 
      // fileText는 이제 string 입니다.

      setText(fileText);
      // const prompt = text;
      // console.log('프롬프트 :', text);
    }
  }
   const handleTitle = async (): Promise<void> => {
    if (!text) {
      console.warn('텍스트가 입력되지 않았습니다.');
      return;
    }
    try {
      if (!loading) {
          setLoading(true);
      }
        const response = await getModelApi({
            method: 'POST',
            withCredentials: true,
            url: '/title',
            // data: { email, password },
            data: { passage: text },
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
            },
        });
        console.log('생성된 제목', response.data.Error);
        if (response.data.title != undefined) {
          setTitle(response.data.title);     
        } else {
          setTitle(response.data.Error)
        }
        setLoading(false);
      } catch (error: any) {
        console.error(error.response?.data || error.message);
        alert(error.response?.data?.error || '모델 로드에 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    return (
      <div className="h-lvh bg-gradient-to-b from-[#dcddd3] via-[#e2e3dc] to-[#dcddd3] shadow-inner-corner p-24">
        <div className='bg-[#434448] p-4 shadow-inner-corner rounded-2xl flex justify-center h-full w-full pt-28'>
          <div className="">
            <div className="text-center mb-10 text-[40px]">
              <div className="text-center font-bold">
                <div className='text-[40px] text-[#c0daaf]'>
                  <Typewriter
                    options={{
                      strings: [`${title}`],
                      autoStart: true,
                      loop: true,  // 반복되도록 설정
                      cursor: "",   // 커서도 표시되지 않도록 설정
                      deleteSpeed: 99999,
                    }}
                  />
                </div>
                <input
                  type='file'
                  className="flex-grow border p-2 m-2 rounded-md shadow-sm mt-10 text-2xl"
                  onChange={handleText}
                />
                <button 
                onClick={handleTitle} 
                disabled={loading}
                className='bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600 text-2xl'>
                  <span className="flex items-center justify-center">
                    {loading? <FaSpinner /> : '출력'}
                  </span>
                </button>
              </div>
              <p className='text-white text-lg'>3000자 이상의 소설을 입력해주세요!</p>
            </div>
            <div className="text-gray-300 text-center flex-grow overflow-hidden whitespace-pre-line w-full h-[330px] px-20">
              {`${text}`}
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  export default Title;