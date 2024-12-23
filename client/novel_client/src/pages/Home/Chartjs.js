import { jsx as _jsx } from "react/jsx-runtime";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
const BarChart = ({ testData, selectedKey }) => {
    const selectedData = testData[selectedKey] || []; // 선택된 키의 데이터 가져오기
    const data = {
        labels: selectedData.map((item) => item[0]), // 키워드
        datasets: [
            {
                label: `키워드 트렌드 (${selectedKey})`,
                data: selectedData.map((item) => item[1]), // 값
                backgroundColor: [
                    'rgba(255, 99, 132, 0.8)',
                    'rgba(54, 162, 235, 0.8)',
                    'rgba(255, 206, 86, 0.8)',
                    'rgba(75, 192, 192, 0.8)',
                    'rgba(153, 102, 255, 0.8)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };
    const options = {
        indexAxis: 'y', // 가로형 차트를 위한 설정
        responsive: true,
        plugins: {
            legend: {
                display: true,
                labels: {
                    color: 'white',
                },
            },
            title: {
                display: true,
                text: '장르별 키워드 트렌드',
                align: 'center',
                color: 'white',
                font: {
                    size: 24,
                },
            },
        },
        scales: {
            x: {
                beginAtZero: true,
                ticks: {
                    color: 'white',
                },
                grid: {
                    color: 'rgba(255, 255, 255, 0.6)',
                },
            },
            y: {
                ticks: {
                    color: 'white',
                    stepSize: 1, // 라벨 간격을 1로 설정하여 모든 라벨이 표시되도록 함
                },
                grid: {
                    color: 'rgba(255, 255, 255, 0.6)',
                },
            },
        },
        maintainAspectRatio: false,
    };
    return _jsx(Bar, { data: data, options: options });
};
export default BarChart;
