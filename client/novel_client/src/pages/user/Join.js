import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { getNovelApi } from '../../api/novelApi'; // API 요청 함수
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
const Join = () => {
    const navigate = useNavigate(); // 페이지 이동을 위한 navigate
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
    };
    const handleJoin = async () => {
        // 간단한 유효성 검사
        if (!email || !nick || !password) {
            setError('모든 필드를 입력해주세요.');
            return;
        }
        if (!emailCheck(email)) {
            setError('이메일 형식에 맞지않습니다.');
            return;
        }
        if (password != passwordCheck) {
            setError('비밀번호가 일치하지 않습니다.');
            return;
        }
        if (password.match(passwordRegEx) === null) {
            setError('비밀번호 형식을 확인해주세요');
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
        }
        catch (error) {
            console.error(error.response?.data || error.message);
            setError(error.response?.data?.error || '회원가입에 실패했습니다.');
        }
        finally {
            setLoading(false); // 로딩 종료
        }
    };
    return (_jsxs("div", { className: 'bg-gradient-to-b from-[#dcddd3] via-[#e2e3dc] to-[#dcddd3] shadow-inner-corner h-screen flex justify-center items-center relative', children: [_jsx("div", { className: 'bg-books_2-img bg-cover rotate-[170deg] h-[600px] w-[430px] absolute top-20 flex flex-col items-center border p-6 rounded-lg shadow-lg' }), _jsx("div", { id: 'login', className: 'bg-white h-[600px] w-[430px] absolute top-20 flex flex-col items-center rounded-lg shadow-lg pt-8', children: _jsxs("div", { className: 'text-center', children: [_jsx("h2", { className: "mb-4 text-2xl", children: "\uD68C\uC6D0\uAC00\uC785 \uD398\uC774\uC9C0" }), error && _jsx("div", { style: { color: 'red', marginBottom: '10px' }, children: error }), response && _jsx("div", { style: { color: 'green', marginBottom: '10px' }, children: response.success }), _jsxs("div", { className: "flex flex-col space-y-4 mb-4", children: [_jsx("input", { type: "email", placeholder: "\uC774\uBA54\uC77C", value: email, onChange: (e) => setEmail(e.target.value), className: "border p-2 rounded-md m-2 w-64" }), _jsx("input", { type: "text", placeholder: "\uC774\uB984", value: nick, onChange: (e) => setNick(e.target.value), className: "border p-2 rounded-md m-2 w-64" }), _jsx("input", { type: "password", placeholder: "\uBE44\uBC00\uBC88\uD638", value: password, onChange: (e) => setPassword(e.target.value), className: "border p-2 rounded-md m-2 w-64" }), _jsx("input", { type: "password", placeholder: "\uBE44\uBC00\uBC88\uD638 \uC7AC\uD655\uC778", value: passwordCheck, onChange: (e) => setPasswordCheck(e.target.value), className: "border p-2 rounded-md m-2 w-64" }), _jsx("p", { children: "\uBE44\uBC00\uBC88\uD638\uB294 \uC601\uBB38 \uB300\uC18C\uBB38\uC790, \uD2B9\uC218\uBB38\uC790, " }), _jsx("p", { children: "\uC22B\uC790\uB97C \uD63C\uD569\uD558\uC5EC 8~20\uC790\uB85C \uC785\uB825\uD574\uC8FC\uC138\uC694" })] }), _jsx("button", { onClick: handleJoin, disabled: loading, className: "border p-2 m-2 w-64", children: loading ? '가입 중...' : '회원가입' }), _jsx("br", {}), _jsx(Link, { to: "/login", children: "\uC774\uBBF8 \uAC00\uC785\uB41C \uD68C\uC6D0\uC774\uC138\uC694?" })] }) })] }));
};
export default Join;
