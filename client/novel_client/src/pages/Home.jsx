import { useEffect, useState } from 'react';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { RxDotFilled } from 'react-icons/rx';

const Home = () =>  {
  const mainImages = [
    { id: 0, name: "빵을 먹는 꼬마의 비밀", image_path: "/public/images/main1.jpg", description: "빵을 먹는 꼬마" },
    { id: 1, name: "검은 머리 여성의 그림자", image_path: "/public/images/main2.jpg", description: "검은 머리 여성" },
    { id: 2, name: "칼을 든 기사와 운명의 전투", image_path: "/public/images/main3.jpg", description: "칼을 든 기사" },
    { id: 3, name: "괴물과 여자의 금지된 이야기", image_path: "/public/images/main4.jpg", description: "괴물과 여자" },
    { id: 4, name: "과학자의 미스터리 실험", image_path: "/public/images/main5.jpg", description: "과학자" },
    { id: 5, name: "노란머리 여성의 숨겨진 과거", image_path: "/public/images/main6.jpg", description: "노란머리 여성" },
    { id: 6, name: "축제 속에 숨겨진 비밀", image_path: "/public/images/main7.jpg", description: "축제에 여성" },
    { id: 7, name: "핑크 머리 여성의 비밀스러운 세계", image_path: "/public/images/main8.jpg", description: "핑크 머리 여성" },
    { id: 8, name: "빵을 먹는 꼬마의 비밀", image_path: "/public/images/main1.jpg", description: "빵을 먹는 꼬마" },
    { id: 9, name: "검은 머리 여성의 그림자", image_path: "/public/images/main2.jpg", description: "검은 머리 여성" },
    { id: 10, name: "칼을 든 기사와 운명의 전투", image_path: "/public/images/main3.jpg", description: "칼을 든 기사" },
    { id: 11, name: "괴물과 여자의 금지된 이야기", image_path: "/public/images/main4.jpg", description: "괴물과 여자" },
    { id: 12, name: "과학자의 미스터리 실험", image_path: "/public/images/main5.jpg", description: "과학자" },
    { id: 13, name: "노란머리 여성의 숨겨진 과거", image_path: "/public/images/main6.jpg", description: "노란머리 여성" },
    { id: 14, name: "축제 속에 숨겨진 비밀", image_path: "/public/images/main7.jpg", description: "축제에 여성" },
    { id: 15, name: "핑크 머리 여성의 비밀스러운 세계", image_path: "/public/images/main8.jpg", description: "핑크 머리 여성" },
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

  useEffect(() => {        
  }, ['setLogin'])

    return (
      <div className="">
      <div className="flex h-3/5">
        <div className="w-3/5 bg-books_3-img shadow-inner-corner">
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
              <div className="font-['Cafe24ClassicType-Regular'] whitespace-normal w-3/5 p-5 shadow-inner-corner bg-paper-img">
              <h1>tjfaud dlqslek</h1>
              <h1>tdjfklajsdl</h1>
              <h1>tdjkljafklsd</h1>
              <h1>tasdjkfl</h1>
              </div>
          </div>
          </div>
        </div>
        <div className="w-2/5 bg-books-img bg-opacity- p-4 shadow-inner-corner font-['Cafe24ClassicType-Regular']">
          <div className="bg-gray-400/50 w-full h-full p-2 rounded-lg">
            <div className=" ">
              <h1 className=" text-white">분석 제목 입니다</h1>
              <div className=" text-white ">
                  <div className="whitespace-normal ...">Hey everyone!

    It's almost 2022       and we still don't know if there       is aliens living among us, or do we? Maybe the person writing this is an alien.

    You will never know.
                  </div>
              </div>
            </div>
            <div className="grid grid-cols-2 grid-rows-2 p-2 gap-2 h-[450px]">
              <div className="bg-green-400 h-full">
                분석 사진 1
              </div>
              <div>
                
              </div>
              <div className="bg-blue-300 h-full">
                분석 사진 2
              </div>

              <div className="bg-orange-50 h-full">
                분석 사진 3
              </div>
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
                  <li key={image.id} className="w-[210px] h-[260px] md:w-[300px] md:h-[350px] flex-shrink-0 flex justify-center items-center">
                    <div className="flex flex-col items-center justify-center">
                      <h2 className="font-['Cafe24ClassicType-Regular'] whitespace-pre-line text-l text-center font-bold p-4">{image.name}</h2>
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