const Footer = () => {
  return (
    <footer className="bg-[#2f2f31] text-white py-6 border-t border-gray-700">
      <div className="container mx-auto px-5 flex flex-wrap flex-col md:flex-row justify-between items-center">
        {/* 사이트 설명 */}
        <p className="text-gray-400 text-md text-center md:text-left">
          [코아망] - 창작의 즐거움을 함께하세요.
        </p>
        
        {/* 문의 정보 */}
        <p className="text-gray-400 text-md text-center md:text-right">
          문의: <a href="mailto:test@example.com" className="text-[#c0daaf] hover:underline">test@example.com</a>
        </p>
      </div>

      <div className="container mx-auto px-5 mt-4 flex flex-wrap flex-col md:flex-row justify-between items-center">
        {/* 저작권 정보 */}
        <p className="text-gray-500 text-sm text-center md:text-left">
          © 2024 KoIMang. All Rights Reserved.
        </p>

        {/* 기관 정보 */}
        <span className="text-[#c0daaf] text-sm text-center md:text-right">
          신촌 코리아 아카데미
        </span>
      </div>

      <div className="container mx-auto px-5 mt-4 flex flex-wrap flex-col md:flex-row justify-between items-center">
        {/* 개발자 정보 */}
        <span className="text-gray-500 text-sm text-center md:text-right">
          Developed by 문정연, 최윤범, 화철수
        </span>
      </div>
    </footer>
  );
};

export default Footer;
