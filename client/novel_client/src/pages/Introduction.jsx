const Introduction = () => {
    return (
        <div className="h-screen bg-gradient-to-b from-[#dcddd3] via-[#e2e3dc] to-[#dcddd3] shadow-inner p-16">
            <div className="bg-[#434448] p-8 shadow-inner rounded-2xl text-white">
                <h1 className="text-2xl font-bold mb-4">팀 소개</h1>
                <p className="mb-4">
                    우리는 "코리아 IT의 망나니"라는 이름으로 결성된 3인의 개발 팀입니다. 딥러닝과 웹 기술을 활용하여 웹소설 작가를 꿈꾸는 사용자들이 
                    보다 효율적으로 문제를 해결할 수 있는 서비스를 제공하는 것을 목표로 하고 있습니다.
                </p>
                
                <h2 className="text-xl font-semibold mb-2">팀 구성</h2>
                <ul className="list-disc list-inside mb-4">
                    <li><strong>문 정연 (팀장/분석 및 모델):</strong>  단락 생성 모델 설계 및 구현, 데이터 분석</li>
                    <li><strong>화 철수 (웹 개발):</strong> 프론트엔드와 백엔드 개발</li>
                    <li><strong>최 윤범 (모델 개발):</strong> 제목, 표지 생성 모델 설계 및 구현</li>
                </ul>

                <h2 className="text-xl font-semibold mb-2">강점</h2>
                <ul className="list-disc list-inside mb-4">
                    <li>최신 기술 스택을 활용한 빠르고 효율적인 개발</li>
                    <li>팀원 간 원활한 협업과 소통</li>
                    <li>사용자 중심의 직관적이고 편리한 서비스 설계</li>
                </ul>

                <h2 className="text-xl font-semibold mb-2">연락처</h2>
                <ul className="list-none">
                    <li><strong>깃허브:</strong> <a href="https://github.com/digitalteam" className="underline">github.com/digitalteam</a></li>
                    <li><strong>이메일:</strong> <a href="mailto:digitalteam@example.com" className="underline">digitalteam@example.com</a></li>
                </ul>
            </div>
        </div>
    );
};

export default Introduction;
