import TextTypingAni from "../components/TypingAnimation";
import Typewriter from 'typewriter-effect';
import {useState} from 'react'

const Title = () => {
  const [content, setContent] = useState("");

    return (
      
      <div className="h-lvh bg-gradient-to-b from-[#dcddd3] via-[#e2e3dc] to-[#dcddd3] shadow-inner-corner p-24">
        <div className='bg-[#434448] p-4 shadow-inner-corner rounded-2xl flex justify-center h-full w-full pt-28'>
          <div className="">
            <div className="text-center mb-10 text-[40px]">
              출력 값
            <div className="text-center text-2xl font-bold">
              <Typewriter
                options={{
                  strings: ['Hello, World!'],
                  autoStart: true,
                  loop: true,  // 반복되도록 설정
                  cursor: "",   // 커서도 표시되지 않도록 설정
                  deleteSpeed: 99999
                }}
              />
              <input
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="flex-grow border p-2 m-2 rounded-md shadow-sm mt-10"
                placeholder="내용을 입력하세요"
              />
              <button className='bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600'>
                제출
              </button>
            </div>
            </div>
            <div className="text-gray-300 text-center flex-grwo overflow-hidden text-ellipsis whitespace-line w-[800px]">
              {`${content}`}
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  export default Title;