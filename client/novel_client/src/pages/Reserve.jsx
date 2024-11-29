
import { Link } from 'react-router-dom';
const Reserve = () => {
    return (
<div className="h-screen bg-gradient-to-b from-[#dcddd3] via-[#e2e3dc] to-[#dcddd3] shadow-inner-corner flex items-center justify-center p-24">
  <div className="bg-[#434448] p-20 shadow-inner-corner rounded-2xl font-['Cafe24ClassicType-Regular']">
    <h2 className="text-center text-2xl text-yellow-200 ">제목 생성 및 분석 페이지</h2>
    <ul className="mt-10 space-y-4 ">
      <li className="text-center ">
        <Link className="text-white text-xl hover:text-[#c0daaf]" to="/Title">제목 생성</Link>
      </li>
      <li className="text-center">
        <Link className="text-white text-xl hover:text-[#c0daaf]" to="/Analyze">트렌드 분석</Link>
      </li>
    </ul>
  </div>
</div>


    )
  }
  
  export default Reserve;