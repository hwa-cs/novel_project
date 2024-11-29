import { FaSpinner } from "react-icons/fa";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { LoginCheckContext } from '../context/LoginCheck';
const Cover = () => {
    const [loading, setLoading] = useState(false)
    const { LoginCheck } = useContext(LoginCheckContext);  // 로그인 상태 확인
    const navigate = useNavigate();  // 페이지 이동을 위한 navigate
    const mainImages = [
        { id: 0, name: "강아지 1", image_path: "/public/images/dog1.jpg", description: "강아지 1 사진" },
        { id: 1, name: "강아지 2", image_path: "/public/images/dog2.jpg", description: "강아지 2 사진" },
        { id: 2, name: "강아지 3", image_path: "/public/images/dog3.jpg", description: "강아지 3 사진" },
        { id: 3, name: "강아지 4", image_path: "/public/images/dog4.jpg", description: "강아지 4 사진" }
    ];

  // 로그인 여부 확인 후, 로그인되어 있지 않으면 로그인 페이지로 이동
  useEffect(() => {
    if (!LoginCheck) 
    {alert('로그인이 필요한 페이지입니다.');
        navigate('/Login'); // 로그인 페이지로 리다이렉션
      }
    }, [LoginCheck]);

    return (
        <div className="font-['Cafe24ClassicType-Regular'] bg-gradient-to-b from-[#dcddd3] via-[#e2e3dc] to-[#dcddd3] shadow-inner-corner p-24">
            <div className='bg-[#434448] p-4 py-2 shadow-inner-corner rounded-2xl'>
                <div className="flex p-12 gap-3">
                    <div className=" w-2/5">
                        <div className=" p-4">
                            <h1 className="text-xl text-bold pb-4 text-[#c0daaf]">
                                입력 칸
                            </h1>
                            <input type="text" className="w-full h-[80px] rounded-2xl">

                            </input>
                        </div>
                        <div className="">
                            <div className="">        
                                <div className="w-full h-full">
                                    <h1 className="p-4 text-xl text-bold text-[#c0daaf]">
                                        과거 이미지
                                    </h1>
                                    <div className="grid grid-cols-3 grid-rows-2 w-full h-full">
                                        {mainImages.map((a) => (
                                            <div
                                            key={a.id}
                                            className="relative flex items-center justify-center py-1 overflow-hidden"
                                            >
                                                <img
                                                    src={a.image_path} 
                                                    alt={a.image_path} 
                                                    className="w-[180px] h-[240px] md:w-[180px] md:h-[240px] bg-center bg-cover rounded-2xl " 
                                                />
                                            </div>
                                        ))}
                                    </div>
                                    <div className="p-4">
                                        <button className="p-4 bg-gray-500 w-full bg-[#daf8c6] rounded-2xl hover:bg-[#a1f06c]">
                                            <span className="flex items-center justify-center">
                                                {loading? <FaSpinner /> : '출력'}
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-slate-400 rounded-2xl w-3/5 p-4 px-12">
                        <div className="w-full h-full ">
                            d              
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cover;