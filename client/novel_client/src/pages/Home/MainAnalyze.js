import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import BarChart from './Chartjs';
import { getModelApi } from '../../api/novelApi'; // API 요청 함수
const MainAnalyze = () => {
    const [selectVal, setSelectVal] = useState(''); // 선택된 장르 값
    const [chartData, setChartData] = useState({}); // 차트 데이터
    const changeSelectValue = async (event) => {
        const selectedValue = event.target.value;
        setSelectVal(selectedValue);
        try {
            // Axios로 서버에 요청 전송
            const response = await getModelApi({
                method: 'GET',
                withCredentials: true,
                url: '/top_20',
                headers: {
                    accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            });
            // 서버로부터 받은 데이터 업데이트
            if (response.data) {
                setChartData(response.data);
            }
        }
        catch (error) {
            console.error('데이터 요청 실패:', error);
        }
    };
    const GenreChart = [
        { id: 0, name: '판타지', title: 'fantasy' },
        { id: 1, name: '로맨스', title: 'romance' },
        { id: 2, name: '로맨스 판타지', title: 'rom_fan' },
        { id: 3, name: '현대 판타지', title: 'new_fan' },
        { id: 4, name: '무협', title: 'martial' },
    ];
    return (_jsxs("div", { className: "bg-gray-400/70 w-full h-full p-4 rounded-lg", children: [_jsxs("div", { className: "mb-6", children: [_jsx("h1", { className: "text-white text-xl font-bold mb-4", children: "\uC7A5\uB974\uBCC4 \uD0A4\uC6CC\uB4DC \uD2B8\uB80C\uB4DC" }), _jsx("div", { className: "bg-[#434448] p-4 shadow-inner-corner rounded-2xl", children: _jsxs("div", { className: "bg-slate-50 text-black p-4 rounded-md", children: [_jsx("label", { className: "block mb-2 font-bold", children: "\uC7A5\uB974 \uC120\uD0DD:" }), _jsxs("select", { name: "selectedGenre", onChange: changeSelectValue, className: "p-2 border rounded-md w-full", defaultValue: "", children: [_jsx("option", { value: "", disabled: true, children: "\uC7A5\uB974\uB97C \uC120\uD0DD\uD558\uC138\uC694" }), GenreChart.map((genre) => (_jsx("option", { value: genre.title, children: genre.name }, genre.id)))] })] }) })] }), _jsx("div", { className: "h-[800px] w-full p-4", children: selectVal ? (_jsx("div", { className: "h-full", children: _jsx(BarChart, { testData: chartData, selectedKey: selectVal }) })) : (_jsx("div", { className: "text-white text-center", children: _jsx("p", { className: "text-lg", children: "\uC7A5\uB974\uB97C \uC120\uD0DD\uD558\uC5EC \uBD84\uC11D \uCC28\uD2B8\uB97C \uD655\uC778\uD558\uC138\uC694." }) })) })] }));
};
export default MainAnalyze;
