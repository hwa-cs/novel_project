const Footer = () => {
  return (

  <footer className="bg-[#2f2f31] text-white p-5 border-t-2">
    <div className="container mx-auto pt-4 px-5 flex flex-wrap flex-col md:flex-row">
      <p className="text-gray-500 text-md text-center md:text-left">
        {/* 내용 */}
      </p>
      <span 
        className="md:ml-auto md:mt-0 mt-2 md:w-auto w-full md:text-left text-center text-[#c0daaf] text-md">
        신촌 코리아 아카데미 ~~
      </span>
    </div>
    <div className="container mx-auto pb-4 px-5 flex flex-wrap flex-col md:flex-row">
      <span 
        className="md:ml-auto md:mt-0 mt-2 md:w-auto w-full md:text-left text-center text-gray-400 text-md">
        Developed by ~~~~
      </span>
    </div>
  </footer>
  )}

export default Footer;

