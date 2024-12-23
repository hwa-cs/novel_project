import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useContext, useEffect, useRef } from 'react';
import { LoginCheckContext } from '../context/LoginCheck';
import { useNavigate } from 'react-router-dom';
import FlipPage from 'react-flip-page'; // FlipPage 컴포넌트 및 Ref 타입
import { getNovelApi } from '../api/novelApi'; // API 요청 함수
import Typewriter from 'typewriter-effect';
import { FaSpinner } from "react-icons/fa";
const Short = () => {
    const { LoginCheck } = useContext(LoginCheckContext); // 로그인 상태 확인
    const navigate = useNavigate(); // 페이지 이동을 위한 navigate
    const flipPageRef = useRef(null); // FlipPage 컴포넌트 타입으로 ref 설정
    const userPosts = JSON.parse(sessionStorage.getItem('userPosts') || 'null');
    const [content, setContent] = useState('');
    const [lastPost, setLastPost] = useState('');
    const [loading, setLoading] = useState(false);
    // ---------------------- 장르 선택 --------------------
    const [selectVal, setSelectVal] = useState('');
    const changeSelectValue = (event) => {
        setSelectVal(event.target.value);
    };
    console.log('선택 박스 벨류 :', selectVal);
    // ---------------------- 장르 선택 --------------------
    const key = JSON.parse(sessionStorage.getItem("userObj") || 'null');
    const UserId = key?.id;
    const handleGoToPage = () => {
        if (flipPageRef.current) {
            const totalPages = userPosts ? userPosts.length : 0;
            console.log('이동해요!');
            flipPageRef.current.gotoPage(totalPages + 1); // 원하는 페이지로 이동
        }
    };
    const handleText = async () => {
        try {
            if (!loading) {
                setLoading(true);
            }
            if (selectVal == '') {
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
            const userPost = response.data.posts;
            setLastPost(userPost[0]?.makeContent || '');
            sessionStorage.setItem('userPosts', JSON.stringify(userPost));
            // 작성 후 마지막 페이지로 이동
            const lastPageIndex = userPost.length + 1;
            if (flipPageRef.current) {
                flipPageRef.current.gotoPage(lastPageIndex); // 마지막 페이지로 이동
            }
            setLoading(false);
        }
        catch (error) {
            console.error(error.response?.data || error.message); // 에러 처리
            setLoading(false);
        }
    };
    const ressetText = () => {
        setContent("");
        setLastPost("");
    };
    // 로그인 여부 확인 후, 로그인되어 있지 않으면 로그인 페이지로 이동
    useEffect(() => {
        if (!LoginCheck) {
            alert('로그인이 필요한 페이지입니다.');
            navigate('/Login'); // 로그인 페이지로 리다이렉션
        }
    }, [LoginCheck, navigate]);
    return (_jsx("div", { className: "bg-gradient-to-b from-[#dcddd3] via-[#e2e3dc] to-[#dcddd3] shadow-inner-corner p-24", children: _jsxs("div", { className: 'bg-[#434448] p-4 shadow-inner-corner rounded-2xl', children: [_jsx("div", { className: "flex justify-center items-center", children: _jsxs(FlipPage, { ref: flipPageRef, showTouchControls: true, flipOnTouch: "true", disableSwipe: "true", uncutPages: "true", orientation: "horizontal", width: "1500", height: "600", animationDuration: "500", className: "shadow-lg rounded-lg overflow-hidden m-24", children: [_jsxs("div", { className: "flex bg-white", children: [_jsxs("div", { className: "bg-gray-100 flex-1 p-6 w-[250px] h-[600px] border-r-2 border-gray-300", children: [_jsx("h2", { className: "text-3xl font-bold text-gray-800 mb-6", children: "\uD83D\uDCD6 \uC0AC\uC6A9 \uC124\uBA85\uC11C" }), _jsxs("ol", { className: "list-decimal list-inside text-gray-700 space-y-2", children: [_jsxs("li", { children: ["\uCC45\uC790\uB97C \uB118\uAE30\uAC70\uB098, \uC544\uB798\uC758 ", _jsx("strong", { className: "text-blue-600", children: "'\uC791\uC131\uD398\uC774\uC9C0'" }), "\uB97C \uD074\uB9AD\uD569\uB2C8\uB2E4."] }), _jsx("li", { children: "\uAE00\uC744 \uC4F0\uB2E4 \uB9C9\uD78C \uB2E8\uB77D\uC744 \uC791\uC131\uCE78\uC5D0 \uC801\uC5B4\uC90D\uB2C8\uB2E4." }), _jsxs("li", { children: ["\uC791\uC131\uCE78 \uC606\uC5D0\uC11C \uC801\uD569\uD55C ", _jsx("strong", { children: "\uC7A5\uB974" }), "\uB97C \uC120\uD0DD\uD569\uB2C8\uB2E4."] }), _jsxs("li", { children: [_jsx("strong", { className: "text-blue-600", children: "\uC791\uC131" }), " \uBC84\uD2BC\uC744 \uD074\uB9AD\uD569\uB2C8\uB2E4."] }), _jsx("li", { children: "\uC791\uC131 \uD398\uC774\uC9C0\uC5D0\uC11C \uACB0\uACFC\uBB3C\uC744 \uD655\uC778\uD558\uAC70\uB098," }), _jsx("li", { children: "\uB4A4 \uD398\uC774\uC9C0\uB85C \uC774\uB3D9\uD558\uC5EC \uACFC\uAC70 \uC791\uC131 \uB0B4\uC6A9\uC744 \uB2E4\uC2DC \uD655\uC778\uD569\uB2C8\uB2E4." })] })] }), _jsxs("div", { className: "bg-[#c0daaf] flex-1 p-6", children: [_jsx("h2", { className: "text-3xl font-bold text-gray-800 mb-6", children: "\u2728 \uCF54\uC544\uB9DD" }), _jsxs("p", { className: "text-gray-700 leading-relaxed", children: [_jsx("strong", { children: "\uCF54\uB9AC\uC544 IT\uC758 \uB9DD\uB098\uB2C8\uAC00 \uB418\uC5C8\uB2E4" }), " ", _jsx("br", {}), "\uB2E8\uB77D \uC0DD\uC131 \uBAA8\uB378\uC744 \uD65C\uC6A9\uD55C \uD601\uC2E0\uC801\uC778 \uC11C\uBE44\uC2A4\uC785\uB2C8\uB2E4."] }), _jsxs("p", { className: "text-gray-700 leading-relaxed mt-4", children: ["\uC791\uAC00\uB4E4\uC774 \uAE00\uC744 \uC4F0\uB2E4 \uB9C9\uD788\uB294 \uC21C\uAC04, \uCC3D\uC791\uC758 \uD750\uB984\uC744 \uC774\uC5B4\uAC08 \uC218 \uC788\uB3C4\uB85D \uB3D5\uB294 \uB3C4\uAD6C\uB85C, ", _jsx("br", {}), "\uCC3D\uC758\uC801\uC778 \uC2A4\uD1A0\uB9AC\uD154\uB9C1\uC744 \uC9C0\uC6D0\uD569\uB2C8\uB2E4."] })] })] }), userPosts?.slice().reverse().map((a, i) => (_jsxs("div", { className: "flex bg-gray-50", children: [_jsxs("div", { className: "border-r-2 border-gray-300 flex-1 p-6 w-[250px] h-[600px]", children: [_jsx("a", { className: "text-blue-600 font-bold", children: i }), _jsx("h2", { className: "text-lg font-semibold text-gray-700", children: a.content })] }), _jsxs("div", { className: "flex-1 p-6", children: [_jsxs("a", { className: "text-blue-600 font-bold", children: [i, "-1"] }), _jsx("p", { className: "text-gray-600", children: a.makeContent })] })] }, i))), _jsxs("div", { className: "flex bg-white", children: [_jsxs("div", { className: "border-r-2 border-gray-300 flex-1 p-6 w-[250px] h-[600px]", children: [_jsx("h2", { className: "text-2xl font-semibold mb-4", children: "\uC791\uC131 \uD398\uC774\uC9C0" }), _jsx("p", { className: "text-gray-600", children: "\uC791\uC131\uD55C \uB0B4\uC6A9" }), content] }), _jsxs("div", { className: "flex-1 p-6", children: [_jsx("h2", { className: "text-2xl font-semibold mb-4", children: "\uCD9C\uB825 \uD398\uC774\uC9C0" }), _jsx("p", { className: "text-gray-600", children: "\uC0DD\uC131\uB41C \uB2E8\uB77D" }), _jsx(Typewriter, { options: {
                                                    strings: [`${lastPost}`],
                                                    autoStart: true,
                                                    delay: 10,
                                                    loop: true, // 반복되도록 설정
                                                    cursor: "", // 커서도 표시되지 않도록 설정
                                                    deleteSpeed: 99999
                                                } })] })] }), _jsxs("div", { className: "flex bg-white", children: [_jsxs("div", { className: "bg-[#c0daaf] flex-1 p-6 w-[250px] h-[600px] border-r-2 border-gray-300", children: [_jsx("h2", { className: "text-3xl font-bold text-gray-800 mt-8 mb-6", children: "\uD83D\uDCCC \uB9C8\uC9C0\uB9C9 \uD398\uC774\uC9C0" }), _jsxs("p", { className: "text-gray-700 leading-relaxed", children: ["\uB9C8\uC9C0\uB9C9 \uD398\uC774\uC9C0\uC5D0 \uB3C4\uB2EC\uD558\uC168\uC2B5\uB2C8\uB2E4! ", _jsx("br", {}), "\uCD94\uAC00 \uB2E8\uB77D\uC744 \uC0DD\uC131\uD558\uACE0 \uC2F6\uB2E4\uBA74 ", _jsx("strong", { children: "\uB4A4 \uD398\uC774\uC9C0" }), "\uB85C \uB118\uC5B4\uAC00\uAC70\uB098, \uC544\uB798\uC758", _jsx("strong", { className: "text-blue-600", children: " '\uC791\uC131\uD398\uC774\uC9C0'" }), " \uBC84\uD2BC\uC744 \uD074\uB9AD\uD574\uC8FC\uC138\uC694."] })] }), _jsxs("div", { className: "bg-gray-100 flex-1 p-6", children: [_jsx("h2", { className: "text-3xl font-bold text-gray-800 mb-6", children: "\uD83C\uDF1F Koimang" }), _jsxs("p", { className: "text-gray-700 leading-relaxed mb-4", children: ["Koimang \uC11C\uBE44\uC2A4\uAC00 \uB3C4\uC6C0\uC774 \uB418\uC168\uB098\uC694? ", _jsx("br", {}), "\uB354 \uB098\uC740 \uC11C\uBE44\uC2A4 \uC81C\uACF5\uC744 \uC704\uD574 \uD53C\uB4DC\uBC31\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4."] }), _jsxs("p", { className: "text-gray-700 leading-relaxed", children: ["\uBB38\uC81C\uAC00 \uC788\uAC70\uB098 \uAC1C\uC120 \uC758\uACAC\uC774 \uC788\uC73C\uC2DC\uBA74 ", _jsx("br", {}), _jsx("a", { href: "mailto:test@example.com", className: "text-blue-600 underline", children: "test@example.com" }), "\uC73C\uB85C \uC5B8\uC81C\uB4E0\uC9C0 \uC5F0\uB77D\uC8FC\uC138\uC694!"] })] })] })] }) }), _jsx("div", { className: "bg-gray-50 p-4 border-t-2 border-gray-200", children: _jsxs("div", { className: "max-w-screen-md mx-auto", children: [_jsxs("div", { className: "flex items-center gap-4 mb-4", children: [_jsxs("label", { children: ["\uC7A5\uB974 \uC120\uD0DD :", _jsxs("select", { name: "selectedFruit", onChange: changeSelectValue, children: [_jsx("option", { value: "martial", children: "\uBB34\uD611" }, 1), _jsx("option", { value: "fantasy", children: "\uD310\uD0C0\uC9C0" }, 2), _jsx("option", { value: "romance_fantasy", children: "\uB85C\uB9E8\uC2A4 \uD310\uD0C0\uC9C0" }, 3), _jsx("option", { value: "romance", children: "\uB85C\uB9E8\uC2A4" }, 4), _jsx("option", { value: "current_fantasy", children: "\uD604\uB300 \uD310\uD0C0\uC9C0" }, 5)] })] }), _jsx("input", { value: content, onChange: (e) => setContent(e.target.value), className: "flex-grow border p-2 rounded-md shadow-sm", placeholder: "\uB0B4\uC6A9\uC744 \uC785\uB825\uD558\uC138\uC694" }), _jsx("button", { onClick: handleText, disabled: loading, className: "bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600", children: _jsx("span", { className: "flex items-center justify-center", children: loading ? _jsx(FaSpinner, {}) : '작성' }) }), _jsx("button", { onClick: ressetText, className: "bg-gray-400 text-white px-4 py-2 rounded-md shadow hover:bg-gray-500", children: "\uC0C8\uB85C \uC791\uC131" })] }), _jsx("div", { className: "flex justify-center gap-4", children: _jsx("button", { onClick: () => handleGoToPage(), className: "bg-[#c0daaf] text-white px-4 py-2 rounded-md shadow hover:bg-green-600", children: "\uC791\uC131 \uD398\uC774\uC9C0" }) })] }) })] }) }));
};
export default Short;
