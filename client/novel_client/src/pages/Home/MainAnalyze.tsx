import { ChangeEvent, useState } from 'react';
import axios from 'axios';
import BarChart from './Chartjs';
import { getModelApi } from '../../api/novelApi'; // API 요청 함수

const MainAnalyze: React.FC = () => {
  const [selectVal, setSelectVal] = useState<string>(''); // 선택된 장르 값
  const [chartData, setChartData] = useState<{ [key: string]: [string, number][] }>({}); // 차트 데이터

  const changeSelectValue = async (event: ChangeEvent<HTMLSelectElement>) => {
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
    } catch (error) {
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

  return (
    <div className="bg-gray-400/70 w-full h-full p-4 rounded-lg">
      <div className="mb-6">
        <h1 className="text-white text-xl font-bold mb-4">장르별 키워드 트렌드</h1>
        <div className="bg-[#434448] p-4 shadow-inner-corner rounded-2xl">
          <div className="bg-slate-50 text-black p-4 rounded-md">
            <label className="block mb-2 font-bold">장르 선택:</label>
            <select
              name="selectedGenre"
              onChange={changeSelectValue}
              className="p-2 border rounded-md w-full"
              defaultValue=""
            >
              <option value="" disabled>
                장르를 선택하세요
              </option>
              {GenreChart.map((genre) => (
                <option key={genre.id} value={genre.title}>
                  {genre.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="h-[800px] w-full p-4">
        {/* 차트의 높이를 조정하기 위해 h-[800px] 추가 */}
        {selectVal ? (
          <div className="h-full">
            {/* 부모 컨테이너에 height를 지정 */}
            <BarChart testData={chartData} selectedKey={selectVal} />
          </div>
        ) : (
          <div className="text-white text-center">
            <p className="text-lg">장르를 선택하여 분석 차트를 확인하세요.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MainAnalyze;
