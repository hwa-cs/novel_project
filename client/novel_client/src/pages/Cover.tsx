import { FaSpinner } from "react-icons/fa";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { LoginCheckContext } from '../context/LoginCheck';
import { getNovelApi } from '../api/novelApi'; // API 요청 함수

interface UserCover {
    makeCover: string;
  }
  
const Cover = () => {
    const [content, setContent] = useState<string>(""); 
    // const [makeCover, setMakeCover] = useState({});  // API요청 결과
    const [loading, setLoading] = useState<boolean>(false)
    const { LoginCheck } = useContext(LoginCheckContext);  // 로그인 상태 확인
    const navigate = useNavigate();  // 페이지 이동을 위한 navigate
    const [mainCover, setMainCover] = useState<string>("");
    // const userCovers: UserCover[] = (JSON.parse(sessionStorage.getItem('userCovers')) != null && JSON.parse(sessionStorage.getItem('userCovers')) != undefined && JSON.parse(sessionStorage.getItem('userCovers')))
    const userCovers: UserCover[] = JSON.parse(sessionStorage.getItem('userCovers') || '[]'); // 과거 커버 이미지
    // userCovers 가 null이나 undefined이 아니면 실행

  // 로그인 여부 확인 후, 로그인되어 있지 않으면 로그인 페이지로 이동
    useEffect(() => {
        if (!LoginCheck) 
            {alert('로그인이 필요한 페이지입니다.');
            navigate('/Login'); // 로그인 페이지로 리다이렉션
        }
    }, [LoginCheck, navigate]);
    
    const handleCover = async () => {
        const key = JSON.parse(sessionStorage.getItem("userObj") || 'null');
        const UserId = key?.id;
        console.log("UserId: ",  UserId)

        if (!UserId) {
          alert("사용자 정보가 없습니다.");
          return;
        }

        try {
            if (!loading) {
                setLoading(true);
            }
            const response = await getNovelApi({
              method: 'POST',
              url: '/api/post/cover', // GET 요청 URL
              withCredentials: true,
              data: { content, UserId }, // 서버로 보내는 데이터
          });
    
          const makeCover = response.data.posts
          setMainCover(makeCover[0].makeCover);
          sessionStorage.setItem('userCovers', JSON.stringify(makeCover));
          setLoading(false);
        } catch (error: any) {
          console.error(error.response?.data || error.message); // 에러 처리
          setLoading(false);
        }
      };

    return (
        <div className="font-['Cafe24ClassicType-Regular'] bg-gradient-to-b from-[#dcddd3] via-[#e2e3dc] to-[#dcddd3] shadow-inner-corner p-24">
            <div className='bg-[#434448] p-4 py-2 shadow-inner-corner rounded-2xl'>
                <div className="flex p-12 gap-3">
                    <div className=" w-2/5">
                        <h1 className="p-4 text-xl text-bold text-[#c0daaf]">
                            입력 데이터
                        </h1>
                        <div className=" p-4">
                            <input
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                className="shadow-sm w-full h-[80px] rounded-2xl text-center"
                                placeholder="내용을 입력하세요"
                            />
                        </div>
                        <div className="">
                            <div className="">        
                                <div className="w-full h-full">
                                    <h1 className="p-4 text-xl text-bold text-[#c0daaf]">
                                        과거 이미지
                                    </h1>
                                    <div className="grid grid-cols-3 grid-rows-2 w-full h-full">
                                    {userCovers.length > 0 && (
                                        userCovers.map((a) => (
                                            <img
                                            key={a.makeCover} // 고유 key 추가 (React 경고 방지)
                                            src={`/covers/${a.makeCover}`}
                                            alt="cover"
                                            className="w-[200px] h-[300px] rounded-lg"
                                            />
                                        ))
                                    )}
                                    </div>
                                    <div className="p-4">
                                        <button onClick={handleCover} disabled={loading} className="p-4 bg-gray-500 w-full bg-[#daf8c6] rounded-2xl hover:bg-[#a1f06c]">
                                            <span className="flex items-center justify-center">
                                                {loading? <FaSpinner /> : '출력'}
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-2xl w-3/5 p-4 px-12">
                        <div className="w-full h-full ">
                            {userCovers.length > 0 && (
                                <img
                                    src={`/covers/${userCovers[0].makeCover}`}
                                    alt="cover"
                                    className="w-full h-full rounded-lg"
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cover;