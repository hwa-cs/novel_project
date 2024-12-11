import { useState, useContext, useEffect, useRef, ChangeEvent } from 'react';
import { LoginCheckContext } from '../context/LoginCheck';
import { useNavigate } from 'react-router-dom';
import FlipPage from 'react-flip-page'; // FlipPage 컴포넌트 및 Ref 타입
import { getNovelApi } from '../api/novelApi'; // API 요청 함수
import Typewriter from 'typewriter-effect';
import { FaSpinner } from "react-icons/fa";

interface Post {
  content: string;
  makeContent: string;
}

const Short: React.FC = () => {
  const { LoginCheck } = useContext(LoginCheckContext);  // 로그인 상태 확인
  const navigate = useNavigate();  // 페이지 이동을 위한 navigate
  const flipPageRef = useRef<typeof FlipPage | null>(null); // FlipPage 컴포넌트 타입으로 ref 설정
  const userPosts: Post[] | null = JSON.parse(sessionStorage.getItem('userPosts') || 'null');
  const [content, setContent] = useState<string>('');
  const [lastPost, setLastPost] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  // ---------------------- 장르 선택 --------------------
  const [selectVal,setSelectVal] = useState<string>('');
  const changeSelectValue = (event: ChangeEvent<HTMLSelectElement>) => {
      setSelectVal(event.target.value);
  };
  console.log('선택 박스 벨류 :', selectVal)
  // ---------------------- 장르 선택 --------------------


  const key = JSON.parse(sessionStorage.getItem("userObj") || 'null');
  const UserId = key?.id;

  const handleGoToPage = () => {
    if (flipPageRef.current && userPosts && userPosts.length) {
      flipPageRef.current.gotoPage(userPosts.length + 1);  // 원하는 페이지로 이동
    }
  };

  const handleText = async (): Promise<void> => {
    try {
      if (!loading) {
          setLoading(true);
      }
      if ( selectVal == '') {
        alert('장르를 선택하세요.');
        setLoading(false);
        return;
      }

      const response = await getNovelApi({
        method: 'POST',
        url: '/api/post', // GET 요청 URL
        withCredentials: true,
        data: { content, UserId, genre: selectVal }, // 서버로 보내는 데이터
      });

      const userPost: Post[] = response.data.posts;
      setLastPost(userPost[0]?.makeContent || '');
      sessionStorage.setItem('userPosts', JSON.stringify(userPost));

      // 작성 후 마지막 페이지로 이동
      const lastPageIndex = userPost.length + 1;
      if (flipPageRef.current) {
        flipPageRef.current.gotoPage(lastPageIndex);  // 마지막 페이지로 이동
      }
      setLoading(false);
    } catch (error: any) {
      console.error(error.response?.data || error.message); // 에러 처리
      setLoading(false);
    }
  };

  const ressetText = (): void => {
    setContent("");
    setLastPost("");
  };

  // 로그인 여부 확인 후, 로그인되어 있지 않으면 로그인 페이지로 이동
  useEffect(() => {
    if (!LoginCheck) 
    {alert('로그인이 필요한 페이지입니다.');
        navigate('/Login'); // 로그인 페이지로 리다이렉션
      }
    }, [LoginCheck, navigate]);

  return (
    <div className="bg-gradient-to-b from-[#dcddd3] via-[#e2e3dc] to-[#dcddd3] shadow-inner-corner p-24">
      <div className='bg-[#434448] p-4 shadow-inner-corner rounded-2xl'>
      <div className="flex justify-center items-center">
        <FlipPage
          ref={flipPageRef}
          showTouchControls
          flipOnTouch="true"
          disableSwipe="true"
          uncutPages="true"
          orientation="horizontal"
          width="1500"
          height="600"
          animationDuration="500"
          className="shadow-lg rounded-lg overflow-hidden m-24"
        >
          {/* 페이지 1 */}
          <div className="flex bg-white">
            {/* 페이지 왼쪽 */}
            <div className="bg-gray-100 flex-1 p-6 w-[250px] h-[600px] border-r-2 border-gray-300">
              <h2 className="text-2xl font-semibold mb-4">사용 설명서</h2>
              <p className="text-gray-600">알아서 쓰세요</p>
            </div>

            {/* 페이지 오른쪽 */}
            <div className="bg-[#c0daaf] flex-1 p-6">
              <h2 className="text-2xl font-semibold mb-4">코아망</h2>
              <p className="text-gray-600">...망나니</p>
            </div>
          </div>

          {/* 중간 페이지 */}
          {userPosts?.slice().reverse().map((a, i) => (
            <div className="flex bg-gray-50" key={i}>
              {/* 페이지 왼쪽 */}
              <div className="border-r-2 border-gray-300 flex-1 p-6 w-[250px] h-[600px]">
                <a className="text-blue-600 font-bold">{i}</a>
                <h2 className="text-lg font-semibold text-gray-700">{a.content}</h2>
              </div>

              {/* 페이지 오른쪽 */}
              <div className="flex-1 p-6">
                <a className="text-blue-600 font-bold">{i}-1</a>
                <p className="text-gray-600">{a.makeContent}</p>
              </div>
            </div>
          ))}

          {/* 작성 페이지 */}
          <div className="flex bg-white">
            {/* 페이지 왼쪽 */}
            <div className="border-r-2 border-gray-300 flex-1 p-6 w-[250px] h-[600px]">
              <h2 className="text-2xl font-semibold mb-4">작성 페이지</h2>
              <p className="text-gray-600">작성칸</p>
              {content}
            </div>

            {/* 페이지 오른쪽 */}
            <div className="flex-1 p-6">
              <h2 className="text-2xl font-semibold mb-4">출력 페이지</h2>
              <p className="text-gray-600">출력 내용</p>
                <Typewriter
                    options={{
                      strings: [`${lastPost}`],
                      autoStart: true,
                      delay: 10,
                      loop: true,  // 반복되도록 설정
                      cursor: "",   // 커서도 표시되지 않도록 설정
                      deleteSpeed: 99999
                    }}
                  />
            </div>
          </div>

          {/* 마지막 페이지 */}
          <div className="flex bg-white">
            {/* 페이지 왼쪽 */}
            <div className="bg-[#c0daaf] flex-1 p-6 w-[250px] h-[600px] border-r-2 border-gray-300">
              <h2 className="text-2xl font-semibold mb-4">마지막 페이지</h2>
              <p className="text-gray-600">잘썼어요?</p>
            </div>

            {/* 페이지 오른쪽 */}
            <div className="bg-gray-100 flex-1 p-6">
              <h2 className="text-2xl font-semibold mb-4">마지막입니다</h2>
              <p className="text-gray-600">...돌아가세요</p>
            </div>
          </div>
        </FlipPage>
      </div>

      {/* 하단 컨트롤 */}
      <div className="bg-gray-50 p-4 border-t-2 border-gray-200">
        <div className="max-w-screen-md mx-auto">
          {/* 텍스트 입력 및 버튼 */}
          <div className="flex items-center gap-4 mb-4">
            <label>
            장르 선택 :
              <select 
              name="selectedFruit"
              onChange={changeSelectValue}>
                  <option key={1} value="martial">무협</option>
                  <option key={2} value="fantasy">판타지</option>
                  <option key={3} value="romance_fantasy">로맨스 판타지</option>
                  <option key={4} value="romance">로맨스</option>
                  <option key={5} value="current_fantasy">현대 판타지</option>
              </select>
            </label>
            <input
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="flex-grow border p-2 rounded-md shadow-sm"
              placeholder="내용을 입력하세요"
            />
            <button
              onClick={handleText}
              disabled={loading}
              className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600"
            >                                           
              <span className="flex items-center justify-center">
                {loading? <FaSpinner /> : '작성'}
              </span>
            </button>
            <button
              onClick={ressetText}
              className="bg-gray-400 text-white px-4 py-2 rounded-md shadow hover:bg-gray-500"
            >
              새로 작성
            </button>
          </div>

          {/* 페이지 이동 버튼 */}
          <div className="flex justify-center gap-4">
            <button
              onClick={() => handleGoToPage()}
              className="bg-[#c0daaf] text-white px-4 py-2 rounded-md shadow hover:bg-green-600"
            >
              작성 페이지
            </button>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Short;
