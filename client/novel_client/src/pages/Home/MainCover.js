import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const MainCover = () => {
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
    return (_jsx("div", { className: "w-full inline-flex flex-nowrap overflow-hidden", children: _jsx("ul", { className: "flex items-center justify-center animate-infinite-scroll", children: mainImages.map((image) => (_jsx("li", { className: "w-[210px] h-[260px] md:w-[300px] md:h-[350px] flex-shrink-0 flex justify-center items-center", children: _jsxs("div", { className: "flex flex-col items-center justify-center", children: [_jsx("h2", { className: "font-['Cafe24ClassicType-Regular'] text-l text-center font-bold p-4", children: image.name }), _jsx("img", { className: "w-[180px] h-[240px] rounded-2xl shadow-2xl", src: image.image_path, alt: image.description })] }) }, image.id))) }) }));
};
export default MainCover;
