import { useState } from 'react';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { RxDotFilled } from 'react-icons/rx';

const Home = () =>  {
  const mainImages = [
    { id: 0, name: "빵을 먹는 꼬마의 비밀", image_path: "/Images/main1.jpg", description: "빵을 먹는 꼬마" },
    { id: 1, name: "검은 머리 여성의 그림자", image_path: "/Images/main2.jpg", description: "검은 머리 여성" },
    { id: 2, name: "칼을 든 기사와 운명의 전투", image_path: "/Images/main3.jpg", description: "칼을 든 기사" },
    { id: 3, name: "괴물과 여자의 금지된 이야기", image_path: "/Images/main4.jpg", description: "괴물과 여자" },
    { id: 4, name: "과학자의 미스터리 실험", image_path: "/Images/main5.jpg", description: "과학자" },
    { id: 5, name: "노란머리 여성의 숨겨진 과거", image_path: "/Images/main6.jpg", description: "노란머리 여성" },
    { id: 6, name: "축제 속에 숨겨진 비밀", image_path: "/Images/main7.jpg", description: "축제에 여성" },
    { id: 7, name: "핑크 머리 여성의 비밀스러운 세계", image_path: "/Images/main8.jpg", description: "핑크 머리 여성" },
    { id: 8, name: "빵을 먹는 꼬마의 비밀", image_path: "/Images/main1.jpg", description: "빵을 먹는 꼬마" },
    { id: 9, name: "검은 머리 여성의 그림자", image_path: "/Images/main2.jpg", description: "검은 머리 여성" },
    { id: 10, name: "칼을 든 기사와 운명의 전투", image_path: "/Images/main3.jpg", description: "칼을 든 기사" },
    { id: 11, name: "괴물과 여자의 금지된 이야기", image_path: "/Images/main4.jpg", description: "괴물과 여자" },
    { id: 12, name: "과학자의 미스터리 실험", image_path: "/Images/main5.jpg", description: "과학자" },
    { id: 13, name: "노란머리 여성의 숨겨진 과거", image_path: "/Images/main6.jpg", description: "노란머리 여성" },
    { id: 14, name: "축제 속에 숨겨진 비밀", image_path: "/Images/main7.jpg", description: "축제에 여성" },
    { id: 15, name: "핑크 머리 여성의 비밀스러운 세계", image_path: "/Images/main8.jpg", description: "핑크 머리 여성" },
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

  const dotSlide = (slideIndex: number) => {
    setShowIndex(slideIndex);
  };

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
                    className="h-[550px] w-full bg-center bg-cover rounded-2xl " 
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
              <div className="w-2/5 p-5 shadow-inner-corner ">
              <div id='mainTitle' className="justify-items-center my-5 p-5 font-['Cafe24ClassicType-Regular']">
                <p className="text-[22px] text-yellow-300">
                  코리아IT의 망나니가 되었다.
                </p>
                <p className="text-[15px] text-gray-950">
                  그들은 이제, IT 업계에서 누구도 함부로 
                </p>
                <p className="text-[15px] text-gray-950">
                  건들 수 없는 존재가 되었다.
                </p>
                <p className="text-[15px] text-gray-700 mt-4">
                  모든 도전에 굴하지 않고, 실패를 밟고 일어서며
                  그들은 새로운 시대를 여는 선구자가 되었다.
                </p>
                <p className="text-[15px] text-gray-700">
                  코리아IT에서의 시간은 단순한 배움이 아니었다.
                  그것은 그들의 삶을 변화시킨 여정이었다.
                </p>
                <p className="text-[14px] text-[#6b6155] italic mt-4">
                  "혁신은 용기에서 시작되고, 열정으로 완성된다."
                </p>
              </div>
              </div>
              <div className="font-['Cafe24ClassicType-Regular'] whitespace-normal w-3/5 p-5 shadow-inner-corner bg-paper-img">
                <div className="mb-6">
                  <h1 className="text-xl font-bold mb-2">단락 생성</h1>
                  <p className="text-sm">
                    소설을 쓰다 막히는 부분이 있다면 도움을 받을 수 있어요! <br />
                    - 장르별 소설을 입력하면 이어지는 단락을 생성해줍니다.
                  </p>
                </div>
                <div className="mb-6">
                  <h1 className="text-xl font-bold mb-2">표지 생성</h1>
                  <p className="text-sm">
                    자신의 소설의 멋진 표지를 만들어 보세요! <br />
                    - 키워드를 입력하면 그에 맞는 표지를 생성해줍니다.
                  </p>
                </div>
                <div className="mb-6">
                  <h1 className="text-xl font-bold mb-2">소제목 생성</h1>
                  <p className="text-sm">
                    내용은 멋진데 소제목 짓기가 어려운가요? <br />
                    - 3000자 이상의 소설을 입력하시면 됩니다.
                  </p>
                </div>
                <div>
                  <h1 className="text-xl font-bold mb-2">장르별 분석</h1>
                  <p className="text-sm">
                    장르별 웹소설의 분석 내용을 제공합니다. <br />
                    - 장르별로 현재 웹소설의 추세를 파악할 수 있습니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-2/5 bg-books-img bg-opacity- p-4 shadow-inner-corner font-['Cafe24ClassicType-Regular']">
          <div className="bg-gray-400/50 w-full h-full p-2 rounded-lg">
            <div className="h-2/5">
              <h1 className=" text-white">분석 제목 입니다</h1>
              <div className=" text-white ">
                  <div className="whitespace-normal ...">
                    Hey everyone!
                  </div>
              </div>
            </div>
            <div className="grid grid-cols-2 grid-rows-2 p-2 gap-2 h-[500px]">
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
        <div className="w-full inline-flex flex-nowrap overflow-hidden">
          <ul className="flex items-center justify-center animate-infinite-scroll">
            {mainImages.map((image, index) => (
              <li key={image.id} className="w-[210px] h-[260px] md:w-[300px] md:h-[350px] flex-shrink-0 flex justify-center items-center">
                <div className="flex flex-col items-center justify-center">
                  <h2 className="font-['Cafe24ClassicType-Regular'] text-l text-center font-bold p-4">{image.name}</h2>
                  <img
                    className="w-[180px] h-[240px] rounded-2xl shadow-2xl"
                    src={image.image_path}
                    alt={image.description}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      </div>
  );
}
  
  export default Home;