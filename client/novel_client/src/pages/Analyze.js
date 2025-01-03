import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import BarChart from './Chart/BarChart';
import { getModelApi } from '../api/novelApi'; // API 요청 함수
import { FaSpinner } from 'react-icons/fa';
const Analyze = () => {
    const cluster3D = { id: 0, name: "클라스터3D", image_path: "/Images/cluster_3d.png", description: "3d 이미지입니다." };
    const Cnt = { id: 0, name: "문장수 비교분석", image_path: "/Images/cnt.png", description: "cnt" };
    const [selectVal, setSelectVal] = useState('');
    const [loading, setLoading] = useState(false);
    const [cnt, setCnt] = useState('');
    const [text, setText] = useState('');
    const changeSelectValue = (event) => {
        setSelectVal(event.target.value);
    };
    const handleText = (e) => {
        const file = e.target.files?.[0];
        // 파일 여러개중 처음 하나만 선택
        if (!file)
            return;
        // 파일이 없으면 종료
        const reader = new FileReader();
        // 클래스 파일리더를 사용하겠다 reder로
        reader.readAsText(file);
        // 위에서 생성한 파일을 읽기
        reader.onload = (event) => {
            const fileText = event.target?.result;
            // 타입 단언 
            // fileText는 이제 string 입니다.
            setText(fileText);
            // const prompt = text;
            // console.log('프롬프트 :', text);
        };
    };
    const handleCnt = async () => {
        if (!text) {
            console.warn('텍스트가 입력되지 않았습니다.');
            return;
        }
        if (!selectVal) {
            console.warn('장르가 선택되지 않았습니다.');
            return;
        }
        try {
            if (!loading) {
                setLoading(true);
            }
            const response = await getModelApi({
                method: 'POST',
                withCredentials: true,
                url: `/${selectVal}`,
                data: { passage: text },
                headers: {
                    accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            });
            // setCnt(response.data)
            // console.log('분석된 결과 : ', response.data.cnt)
            setCnt(response.data.cnt);
            setLoading(false);
        }
        catch (error) {
            console.error(error.response?.data || error.message);
            alert(error.response?.data?.error || '모델 로드에 실패했습니다.');
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsx("div", { className: "analyze-page m-10 bg-gray-400 rounded-lg shadow-lg", children: _jsxs("div", { className: "p-4", children: [_jsxs("section", { className: "trend-analysis mb-6", children: [_jsx("h1", { className: "text-3xl font-bold text-blue-600 mb-2", children: "\uBB38\uD53C\uC544 \uD2B8\uB80C\uB4DC \uBD84\uC11D" }), _jsx("h2", { className: "text-xl font-semibold text-gray-800 mb-4", children: "\uB3C5\uC790\uAC00 \uC120\uD638\uD558\uB294 \uD0DC\uADF8\uC640 \uC2A4\uD1A0\uB9AC\uC758 \uD750\uB984" }), _jsx("p", { className: "text-gray-700 leading-relaxed", children: "\uB3C5\uC790\uAC00 \uC120\uD638\uD558\uB294 \uD0DC\uADF8\uC640 \uC2A4\uD1A0\uB9AC\uC758 \uD750\uB984 \uB370\uC774\uD130\uB97C \uBD84\uC11D\uD558\uC5EC \uB3C5\uC790 \uC120\uD638\uB3C4\uB97C \uD30C\uC545\uD558\uACE0 \uC791\uD488 \uAE30\uD68D\uC5D0 \uC601\uAC10\uC744 \uC81C\uACF5\uD569\uB2C8\uB2E4." })] }), _jsxs("section", { className: "platform-intro mt-8 mb-6 bg-white p-6 rounded-lg shadow-sm", children: [_jsx("h2", { className: "text-2xl font-bold mb-4", children: "\uBB38\uD53C\uC544 \uD50C\uB7AB\uD3FC \uC18C\uAC1C" }), _jsx("p", { className: "text-gray-700", children: "\uBB34\uD611, \uD310\uD0C0\uC9C0, \uB85C\uB9E8\uC2A4, SF, \uC2A4\uB9B4\uB7EC, \uCD94\uB9AC, \uC5ED\uC0AC \uB4F1 \uC218\uB9CE\uC740 \uC7A5\uB974 \uC18C\uC124\uC744 \uC0AC\uB791\uD558\uB294 \uD32C\uB4E4\uC774 \uD55C\uC790\uB9AC\uC5D0 \uBAA8\uC5EC \uC774\uC57C\uAE30\uB97C \uB098\uB204\uACE0, \uC88B\uC544\uD558\uB294 \uC791\uAC00\uB4E4\uC758 \uC791\uD488\uC744 \uAC10\uC0C1\uD558\uBA70 \uC990\uAC70\uC6C0\uC744 \uB290\uB084 \uC218 \uC788\uB294 \uACF3, \uBC14\uB85C \uBB38\uD53C\uC544\uC785\uB2C8\uB2E4." }), _jsx("p", { className: "text-gray-700 mt-4", children: "\uBB38\uD53C\uC544\uB294 \uB2E8\uC21C\uD55C \uC18C\uC124 \uD50C\uB7AB\uD3FC\uC744 \uB118\uC5B4, \uC791\uAC00\uC640 \uB3C5\uC790\uAC00 \uD568\uAED8 \uC131\uC7A5\uD558\uACE0 \uAFC8\uC744 \uC774\uB8F0 \uC218 \uC788\uB294 \uACF5\uAC04\uC744 \uC81C\uACF5\uD569\uB2C8\uB2E4. \uB3C5\uC790\uB4E4\uC740 \uB2E4\uC591\uD55C \uC7A5\uB974\uC758 \uC791\uD488\uC744 \uD1B5\uD574 \uC0C1\uC0C1\uB825\uC744 \uD0A4\uC6B0\uACE0, \uC791\uAC00\uB4E4\uC740 \uADF8\uB4E4\uC758 \uC774\uC57C\uAE30\uAC00 \uCC45\uC73C\uB85C \uCD9C\uAC04\uB418\uB294 \uC21C\uAC04\uC744 \uC0C1\uC0C1\uD558\uBA70 \uCC3D\uC791\uC758 \uC990\uAC70\uC6C0\uC744 \uB290\uB084 \uC218 \uC788\uB3C4\uB85D \uB3D5\uC2B5\uB2C8\uB2E4." })] }), _jsxs("section", { className: "cluster-summary mt-8 mb-6 bg-white p-6 rounded-lg shadow-sm", children: [_jsx("h2", { className: "text-2xl font-bold mb-4 text-blue-500", children: "\uBB38\uC7A5\uC218 \uBD84\uC11D" }), _jsx("p", { className: "text-gray-700 leading-relaxed", children: "\uB85C\uB9E8\uC2A4\uC640 \uB85C\uD310 \uC7A5\uB974\uB294 \uC8FC\uB85C \uBE60\uB974\uACE0 \uAC10\uC815\uC801\uC778 \uC804\uAC1C\uB97C \uC120\uD638\uD558\uB294 \uB3C5\uC790\uCE35\uC758 \uD2B9\uC131\uC0C1 \uD3C9\uADE0 \uBB38\uC7A5 \uC218\uAC00 150\uBB38\uC7A5 \uB0B4\uC678\uB85C \uC9E7\uC740 \uD3B8\uC785\uB2C8\uB2E4." }), _jsx("p", { className: "text-gray-700 leading-relaxed", children: "\uBC18\uBA74, \uBB34\uD611, \uD310\uD0C0\uC9C0, \uD604\uD310 \uC7A5\uB974\uB294 \uBCF5\uC7A1\uD55C \uC138\uACC4\uAD00 \uC124\uC815\uACFC \uC11C\uC0AC\uB97C \uD3EC\uD568\uD558\uB294 \uACBD\uC6B0\uAC00 \uB9CE\uC544 \uD3C9\uADE0 \uBB38\uC7A5 \uC218\uAC00 200\uBB38\uC7A5 \uC774\uC0C1\uC73C\uB85C \uB098\uD0C0\uB09C \uAC83\uC73C\uB85C \uBCF4\uC785\uB2C8\uB2E4." }), _jsx("hr", { className: "my-4 border-t border-gray-300" }), _jsxs("div", { className: "visualizations mt-6 grid grid-cols-2 gap-6", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-lg font-bold text-gray-800", children: "\uD14D\uC2A4\uD2B8 \uD30C\uC77C\uC744 \uBCF4\uB0B4\uC8FC\uC138\uC694" }), _jsx("p", { className: "text-gray-600 mt-2", children: "\uBB38\uC7A5\uC218\uB97C \uBD84\uC11D\uD574\uB4DC\uB9AC\uACA0\uC2B5\uB2C8\uB2E4." }), _jsxs("label", { children: ["\uC7A5\uB974 \uC120\uD0DD :", _jsxs("select", { name: "selectedFruit", onChange: changeSelectValue, children: [_jsx("option", { value: "cnt_martial", children: "\uBB34\uD611" }, 1), _jsx("option", { value: "cnt_fantasy", children: "\uD310\uD0C0\uC9C0" }, 2), _jsx("option", { value: "cnt_romfan", children: "\uB85C\uB9E8\uC2A4 \uD310\uD0C0\uC9C0" }, 3), _jsx("option", { value: "cnt_romance", children: "\uB85C\uB9E8\uC2A4" }, 4), _jsx("option", { value: "cnt_newfan", children: "\uD604\uB300 \uD310\uD0C0\uC9C0" }, 5)] })] }), _jsx("input", { type: 'file', className: "flex-grow border p-2 m-2 rounded-md shadow-sm mt-10 text-2xl", onChange: handleText }), _jsx("button", { onClick: handleCnt, disabled: loading, className: 'bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600 text-2xl', children: _jsx("span", { className: "flex items-center justify-center", children: loading ? _jsx(FaSpinner, {}) : '출력' }) }), _jsx("br", {}), _jsx("br", {}), _jsx("p", { className: "text-gray-600 text-2xl", children: cnt })] }), _jsx("div", { className: "cluster-visualization bg-white p-6 rounded-lg shadow-md h-[600px]", children: _jsx("img", { className: "rounded-2xl h-full", src: Cnt.image_path, alt: Cnt.description }) })] })] }), _jsxs("section", { className: "cluster-summary mt-8 mb-6 bg-white p-6 rounded-lg shadow-sm", children: [_jsx("h2", { className: "text-2xl font-bold mb-4 text-blue-500", children: "\uB3C5\uC790 \uC120\uD638 \uD0DC\uADF8\uC640 \uD2B8\uB80C\uB4DC \uBD84\uC11D" }), _jsx("p", { className: "text-gray-700 leading-relaxed", children: "\uBB38\uD53C\uC544\uC758 \uBC29\uB300\uD55C \uB370\uC774\uD130\uC5D0\uC11C \uC8FC\uC694 \uD0DC\uADF8\uC640 \uC791\uD488 \uAC04\uC758 \uAD00\uACC4\uB97C \uBD84\uC11D\uD574 \uB3C5\uC790\uB4E4\uC774 \uC120\uD638\uD558\uB294 \uC2A4\uD1A0\uB9AC\uC758 \uD750\uB984\uC744 \uD30C\uC545\uD588\uC2B5\uB2C8\uB2E4." }), _jsx("p", { className: "text-gray-700 leading-relaxed", children: "\uAD70\uC9D1\uD654 \uAE30\uBC95\uC744 \uD65C\uC6A9\uD574 \uBE44\uC2B7\uD55C \uC131\uD5A5\uC758 \uC791\uD488\uC744 4\uAC1C\uC758 \uADF8\uB8F9\uC73C\uB85C \uBD84\uB958\uD588\uC73C\uBA70, \uC774\uB97C \uD1B5\uD574 \uC8FC\uC694 \uD0DC\uADF8 \uBD84\uD3EC\uC640 \uD2B9\uC9D5\uC744 \uC2DC\uAC01\uD654\uD558\uC600\uC2B5\uB2C8\uB2E4." }), _jsx("hr", { className: "my-4 border-t border-gray-300" }), _jsxs("div", { className: "visualizations mt-6 grid grid-cols-2 gap-6", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-lg font-bold text-gray-800", children: "\uAD70\uC9D1\uD654 \uC2DC\uAC01\uD654" }), _jsx("p", { className: "text-gray-600 mt-2", children: "\uBB38\uD53C\uC544\uC758 \uC720\uB8CC \uBC0F \uBB34\uB8CC \uC18C\uC124 \uB370\uC774\uD130\uB97C \uBD84\uC11D\uD55C \uACB0\uACFC, 4\uAC1C\uC758 \uAD70\uC9D1\uC73C\uB85C \uB098\uB20C \uC218 \uC788\uC5C8\uC2B5\uB2C8\uB2E4. \uAC01 \uAD70\uC9D1\uC740 \uD0DC\uADF8\uC640 \uB3C5\uC790 \uC120\uD638\uB3C4 \uD3C9\uAC00\uC9C0\uD45C\uC5D0 \uB530\uB77C \uBD84\uB958\uB418\uC5C8\uC2B5\uB2C8\uB2E4." })] }), _jsx("div", { className: "cluster-visualization bg-white p-6 rounded-lg shadow-md", children: _jsx("img", { className: "rounded-2xl", src: cluster3D.image_path, alt: cluster3D.description }) })] }), _jsx("hr", { className: "my-4 border-t border-gray-300" }), _jsxs("div", { className: "", children: [_jsx("h3", { className: "text-lg font-bold text-gray-800", children: "\uD0DC\uADF8 \uBD84\uD3EC \uBD84\uC11D" }), _jsx("p", { className: "text-gray-600 mt-2", children: "\uAC01 \uAD70\uC9D1\uC5D0\uC11C \uC8FC\uC694 \uD0DC\uADF8\uAC00 \uC5B4\uB5BB\uAC8C \uBD84\uD3EC\uB418\uC5B4 \uC788\uB294\uC9C0\uB97C \uD55C\uB208\uC5D0 \uBCF4\uC5EC\uC8FC\uB294 \uADF8\uB798\uD504\uC785\uB2C8\uB2E4." })] }), _jsx("div", { className: "tag-distribution bg-white p-6 h-[600px] rounded-lg shadow-md", children: _jsx(BarChart, {}) })] }), _jsxs("section", { className: "cluster-summary mt-8 mb-6 bg-white p-6 rounded-lg shadow-sm", children: [_jsx("h2", { className: "text-2xl font-bold mb-4 text-blue-500", children: "\uAD70\uC9D1\uBCC4 \uD2B9\uC9D5 \uC694\uC57D" }), _jsxs("table", { className: "table-auto w-full border-collapse border border-gray-300 text-left", children: [_jsx("thead", { children: _jsxs("tr", { className: "bg-blue-100", children: [_jsx("th", { className: "border border-gray-300 p-2", children: "Cluster" }), _jsx("th", { className: "border border-gray-300 p-2", children: "\uC8FC\uC694 \uD0DC\uADF8" }), _jsx("th", { className: "border border-gray-300 p-2", children: "\uD2B9\uC9D5 \uC694\uC57D" })] }) }), _jsxs("tbody", { children: [_jsxs("tr", { children: [_jsx("td", { className: "border border-gray-300 p-2", children: "0" }), _jsx("td", { className: "border border-gray-300 p-2", children: "#\uBA3C\uCE58\uD0A8, #\uC0AC\uC774\uB2E4, #\uD790\uB9C1, #\uAC01\uC131, #\uBE59\uC758" }), _jsx("td", { className: "border border-gray-300 p-2", children: "\uAC15\uB825\uD55C \uC8FC\uC778\uACF5\uACFC \uD310\uD0C0\uC9C0 \uC2A4\uD1A0\uB9AC" })] }), _jsxs("tr", { className: "bg-yellow-100", children: [_jsx("td", { className: "border border-gray-300 p-2", children: "1 \u2B50" }), _jsx("td", { className: "border border-gray-300 p-2", children: "#\uC804\uC7C1, #\uC815\uCE58, #\uAD70\uC8FC, #\uC138\uACC4\uC0AC, #\uC870\uC120" }), _jsx("td", { className: "border border-gray-300 p-2", children: "\uC5ED\uC0AC\uC801 \uBC30\uACBD\uC758 \uC804\uB7B5\uACFC \uC815\uCE58 \uC911\uC2EC" })] }), _jsxs("tr", { children: [_jsx("td", { className: "border border-gray-300 p-2", children: "2" }), _jsx("td", { className: "border border-gray-300 p-2", children: "#\uC6B4\uB3D9\uC120\uC218, #\uB178\uB825\uAC00, #\uC57C\uAD6C, #\uCD95\uAD6C" }), _jsx("td", { className: "border border-gray-300 p-2", children: "\uC2A4\uD3EC\uCE20\uC640 \uAC1C\uC778 \uC131\uC7A5\uC5D0 \uCD08\uC810" })] }), _jsxs("tr", { children: [_jsx("td", { className: "border border-gray-300 p-2", children: "3" }), _jsx("td", { className: "border border-gray-300 p-2", children: "#\uC0DD\uC874, #\uC911\uC138, #\uC870\uC120, #\uD55C\uAD6D\uC0AC" }), _jsx("td", { className: "border border-gray-300 p-2", children: "\uC0DD\uC874\uACFC \uC5ED\uC0AC\uC801 \uBC30\uACBD\uC758 \uD310\uD0C0\uC9C0" })] })] })] }), _jsx("p", { className: "text-red-500 font-bold mt-4", children: "\uCC38\uACE0: Cluster 1\uC740 \uD3C9\uADE0 \uC870\uD68C\uC218\uC640 \uAD6C\uB3C5\uC218\uAC00 \uAC00\uC7A5 \uB192\uC544 \uB3C5\uC790\uB4E4\uC5D0\uAC8C \uAC00\uC7A5 \uC778\uAE30 \uC788\uB294 \uCE74\uD14C\uACE0\uB9AC\uB85C \uD655\uC778\uB418\uC5C8\uC2B5\uB2C8\uB2E4." })] }), _jsx("section", { className: "conclusion mt-8 mb-4", children: _jsx("p", { className: "text-gray-700", children: "\uBB38\uD53C\uC544\uC5D0 \uC791\uD488\uC744 \uC5F0\uC7AC\uD560 \uACC4\uD68D\uC774 \uC788\uB294 \uC791\uAC00 \uC5EC\uB7EC\uBD84\uAED8\uC11C\uB294 \uC774\uB7EC\uD55C \uD2B8\uB80C\uB4DC\uB97C \uCC38\uACE0\uD558\uC5EC \uCC3D\uC758\uC801\uC774\uACE0 \uB9E4\uB825\uC801\uC778 \uC791\uD488\uC744 \uAE30\uD68D\uD574\uBCF4\uC138\uC694. KOIMANG\uC740 \uC791\uAC00\uC640 \uB3C5\uC790\uAC00 \uD568\uAED8 \uB9CC\uB4E4\uC5B4\uAC00\uB294 \uC774\uC57C\uAE30\uB97C \uC5B8\uC81C\uB098 \uC751\uC6D0\uD569\uB2C8\uB2E4." }) })] }) }));
};
export default Analyze;
