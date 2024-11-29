import { LoginCheckContext } from "../context/LoginCheck";
import { useEffect, useState, useContext } from 'react';
import axios from 'axios'
import { getNovelApi } from '../api/novelApi';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { RxDotFilled } from 'react-icons/rx';

const Home = () =>  {
  const mainMakePosts = [
    { id: '0', label: 'a', image_path: '' },
    { id: '1', label: 'b', image_path: '' },
    { id: '2', label: 'c', image_path: '' },
    { id: '', label: 'd', image_path: '' },
  ];

  const mainImages = [
    { id: 0, name: "강아지 1", image_path: "/public/images/dog1.jpg", description: "강아지 1 사진" },
    { id: 1, name: "강아지 2", image_path: "/public/images/dog2.jpg", description: "강아지 2 사진" },
    { id: 2, name: "강아지 3", image_path: "/public/images/dog3.jpg", description: "강아지 3 사진" },
    { id: 3, name: "강아지 4", image_path: "/public/images/dog4.jpg", description: "강아지 4 사진" }
  ];
  const [showIndex, setShowIndex] = useState(0);

  // 왼쪽으로 이동
  const moveLeft = () => {
    const newIndex = showIndex === 0 ? mainImages.length - 1 : showIndex - 1;
    setShowIndex(newIndex);
  };

  // 오른쪽으로 이동
  const moveRight = () => {
    const newIndex = showIndex === mainImages.length - 1 ? 0 : showIndex + 1;
    setShowIndex(newIndex);
  };

  const dotSlide = (slideIndex) => {
    setShowIndex(slideIndex);
  };
    return (
      <div className="">
      <div className="flex h-3/5">
        <div className="w-3/5 bg-[#2f2f31] shadow-inner-corner">
          <div className=' relative group overflow-hidden'>
            <div
              className=' flex transition-transform ease-out duration-500 '
              style={{ transform: `translateX(-${showIndex * 100}%)` }}
            >
              {mainImages.map((image, index) => (
                <div
                  key={image.id}
                  className="w-full flex-shrink-0 py-4 px-9"
                >
                  <img
                    className="h-[400px] w-full bg-center bg-cover rounded-2xl " 
                    src={image.image_path} 
                    alt={image.image_path} 
                    height={1600}
                  />
                </div>
              ))}
            </div>
            <div className='hidden group-hover:block absolute top-[45%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
              <BsChevronCompactLeft onClick={moveLeft} size={30} />
            </div>
          
            <div className='hidden group-hover:block absolute top-[45%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
              <BsChevronCompactRight onClick={moveRight} size={30} />
            </div>
            <div className='flex justify-center py-2 top-4'>
              {mainImages.map((slide, slideIndex) => (
                <div
                  key={slideIndex}
                  onClick={() => dotSlide(slideIndex)}
                  className={`text-2xl cursor-pointer ${
                    slideIndex === showIndex ? 'text-[#c0daaf]' : ''
                  }`}
                >
                  <RxDotFilled />
                </div>
              ))}
            </div>
          <div className="flex bg-[#cac9c0] shadow-inner">
              <div className="bg-[#777775] w-2/5 p-5 shadow-inner-corner">
              <div id='mainTitle' className="justify-items-center my-5  p-5 font-['Cafe24ClassicType-Regular']">
                  <p className=" text-[22px] text-yellow-200 ">
                      코리아IT의 망나니가 되었다.
                  </p>
                  <p className="text-[15px]">
                      그들은 이제, IT 업계에서 누구도 함부로 
                  </p>
                  <p className="text-[15px]">
                      건들 수 없는 존재가 되었다.
                  </p>
              </div>
              </div>
              <div className="font-['Cafe24ClassicType-Regular'] whitespace-normal w-3/5 p-5 shadow-inner-corner bg-gradient-to-b from-[#939289] bia-[#cac9c0]">
              <h1>tjfaud dlqslek</h1>
              <h1>tdjfklajsdl</h1>
              <h1>tdjkljafklsd</h1>
              <h1>tasdjkfl</h1>
              </div>
          </div>
          </div>
        </div>
        <div className="w-2/5 bg-[#434448] p-4 shadow-inner-corner font-['Cafe24ClassicType-Regular'] ">
          <h1 className="text-gray-300">분석 제목 입니다</h1>
          <div className=" text-gray-400 ">
              <div class="whitespace-normal ...">Hey everyone!

It's almost 2022       and we still don't know if there       is aliens living among us, or do we? Maybe the person writing this is an alien.

You will never know.
              </div>
          </div>
        </div>
      </div>
      <div className=" bg-gradient-to-b from-[#dcddd3] via-[#e2e3dc] to-[#dcddd3] h-2/5 shadow-inner-corner ">
          {/* <div className="text-center p-4 text-black">
          </div> */}
          <div className="flex space-x-2 overflow-hidden">    
            <div
              x-data="{}"
              x-init="$nextTick(() => {
                  let ul = $refs.logos;
                  ul.insertAdjacentHTML('afterend', ul.outerHTML);
                  ul.nextSibling.setAttribute('aria-hidden', 'true');
              })"
              className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]"
            >
              <ul x-ref="logos" className="flex items-center justify-center md:justify-start [&_img]:max-w-none animate-infinite-scroll">
              {mainImages.map((image, index) => (
                  <li key={image.id} className="w-[210px] h-[260px] md:w-[270px] md:h-[350px] flex-shrink-0 flex justify-center">
                  <div className="flex flex-col">
                      <h2 className="font-['Cafe24ClassicType-Regular'] text-xl text-center text-bold p-4">{image.name}</h2>
                      <img
                      className="w-[180px] h-[240px] md:w-[180px] md:h-[240px] rounded-2xl min-h-[80px] min-w-[40px] shadow-2xl" 
                      src={image.image_path} 
                      alt={image.image_path}
                      />
                  </div>
                  </li>
              ))}
              </ul>          
            </div>
          </div>
      </div>
      </div>
  );
}
  
  export default Home;