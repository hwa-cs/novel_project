import React from 'react';
import BarChart from './Chart/BarChart'
const Analyze = () => {
    const cluster3D = 
        { id: 0, name: "클라스터3D", image_path: "/Images/cluster_3d.png", description: "3d 이미지입니다." }
    return (
        <div className="analyze-page m-10 bg-gray-400 rounded-lg shadow-lg">
            <div className="p-4">
                {/* 문피아 트렌드 분석 */}
                <section className="trend-analysis mb-6">
                    <h1 className="text-3xl font-bold text-blue-600 mb-2">문피아 트렌드 분석</h1>
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">독자가 선호하는 태그와 스토리의 흐름</h2>
                    <p className="text-gray-700 leading-relaxed">
                        독자가 선호하는 태그와 스토리의 흐름 데이터를 분석하여 독자 선호도를 파악하고 작품 기획에 영감을 제공합니다.
                    </p>
                </section>

                {/* 문피아 플랫폼 소개 */}
                <section className="platform-intro mt-8 mb-6 bg-white p-6 rounded-lg shadow-sm">
                    <h2 className="text-2xl font-bold mb-4">문피아 플랫폼 소개</h2>
                    <p className="text-gray-700">
                        무협, 판타지, 로맨스, SF, 스릴러, 추리, 역사 등 수많은 장르 소설을 사랑하는 팬들이 한자리에 모여 이야기를 나누고,
                        좋아하는 작가들의 작품을 감상하며 즐거움을 느낄 수 있는 곳, 바로 문피아입니다.
                    </p>
                    <p className="text-gray-700 mt-4">
                        문피아는 단순한 소설 플랫폼을 넘어, 작가와 독자가 함께 성장하고 꿈을 이룰 수 있는 공간을 제공합니다. 독자들은 다양한 장르의 작품을 통해
                        상상력을 키우고, 작가들은 그들의 이야기가 책으로 출간되는 순간을 상상하며 창작의 즐거움을 느낄 수 있도록 돕습니다.
                    </p>
                </section>

                {/* 독자 선호 태그와 트렌드 분석 */}
                <section className="cluster-summary mt-8 mb-6 bg-white p-6 rounded-lg shadow-sm">
                    <h2 className="text-2xl font-bold mb-4 text-blue-500">독자 선호 태그와 트렌드 분석</h2>
                    <p className="text-gray-700 leading-relaxed">
                        문피아의 방대한 데이터에서 주요 태그와 작품 간의 관계를 분석해 독자들이 선호하는 스토리의 흐름을 파악했습니다. 
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                        군집화 기법을 활용해 비슷한 성향의 작품을 4개의 그룹으로 분류했으며, 이를 통해 주요 태그 분포와 특징을 시각화하였습니다.
                    </p>
                    <hr className="my-4 border-t border-gray-300" />

                    <div className="visualizations mt-6 grid grid-cols-2 gap-6">
                        <div>
                            <h3 className="text-lg font-bold text-gray-800">군집화 시각화</h3>
                            <p className="text-gray-600 mt-2">문피아의 유료 및 무료 소설 데이터를 분석한 결과, 4개의 군집으로 나눌 수 있었습니다. 각 군집은 태그와 독자 선호도 평가지표에 따라 분류되었습니다.</p>
                        </div>
                        <div className="cluster-visualization bg-white p-6 rounded-lg shadow-md">
                            <img
                                className="rounded-2xl"
                                src={cluster3D.image_path}
                                alt={cluster3D.description}
                                // height={1600}
                            />
                        </div>
                    </div>
                    <hr className="my-4 border-t border-gray-300" />
                    <div className="">
                        <h3 className="text-lg font-bold text-gray-800">태그 분포 분석</h3>
                        <p className="text-gray-600 mt-2">각 군집에서 주요 태그가 어떻게 분포되어 있는지를 한눈에 보여주는 그래프입니다.</p>
                    </div>
                    <div className="tag-distribution bg-white p-6 h-[600px] rounded-lg shadow-md">
                        <BarChart />
                     </div>
                </section>

                {/* 군집별 특징 요약 */}
                <section className="cluster-summary mt-8 mb-6 bg-white p-6 rounded-lg shadow-sm">
                    <h2 className="text-2xl font-bold mb-4 text-blue-500">군집별 특징 요약</h2>
                    <table className="table-auto w-full border-collapse border border-gray-300 text-left">
                        <thead>
                            <tr className="bg-blue-100">
                                <th className="border border-gray-300 p-2">Cluster</th>
                                <th className="border border-gray-300 p-2">주요 태그</th>
                                <th className="border border-gray-300 p-2">특징 요약</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border border-gray-300 p-2">0</td>
                                <td className="border border-gray-300 p-2">#먼치킨, #사이다, #힐링, #각성, #빙의</td>
                                <td className="border border-gray-300 p-2">강력한 주인공과 판타지 스토리</td>
                            </tr>
                            <tr className="bg-yellow-100">
                                <td className="border border-gray-300 p-2">1 ⭐</td>
                                <td className="border border-gray-300 p-2">#전쟁, #정치, #군주, #세계사, #조선</td>
                                <td className="border border-gray-300 p-2">역사적 배경의 전략과 정치 중심</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 p-2">2</td>
                                <td className="border border-gray-300 p-2">#운동선수, #노력가, #야구, #축구</td>
                                <td className="border border-gray-300 p-2">스포츠와 개인 성장에 초점</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 p-2">3</td>
                                <td className="border border-gray-300 p-2">#생존, #중세, #조선, #한국사</td>
                                <td className="border border-gray-300 p-2">생존과 역사적 배경의 판타지</td>
                            </tr>
                        </tbody>
                    </table>
                    <p className="text-red-500 font-bold mt-4">
                        참고: Cluster 1은 평균 조회수와 구독수가 가장 높아 독자들에게 가장 인기 있는 카테고리로 확인되었습니다.
                    </p>
                </section>
                
                {/* 마무리 메시지 */}
                <section className="conclusion mt-8 mb-4">
                    <p className="text-gray-700">
                        문피아에 작품을 연재할 계획이 있는 작가 여러분께서는 이러한 트렌드를 참고하여 창의적이고 매력적인 작품을 기획해보세요. KOIMANG은 작가와 독자가 함께 만들어가는 이야기를 언제나 응원합니다.
                    </p>
                </section>
            </div>
        </div>
    );
};

export default Analyze;
