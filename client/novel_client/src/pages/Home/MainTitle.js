import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { RxDotFilled } from 'react-icons/rx';
const MainTitle = () => {
    const mainImages = [
        { id: 0, name: "단락생성", image_path: "/Images/mainTitle1.png", description: "단락생성" },
        { id: 1, name: "표지생성", image_path: "/Images/mainTitle2.png", description: "표지생성" },
        { id: 2, name: "제목생성", image_path: "/Images/mainTitle3.png", description: "제목생성" },
        { id: 3, name: "분석", image_path: "/Images/mainTitle4.png", description: "분석" },
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
    // 특정 슬라이드로 이동
    const dotSlide = (slideIndex) => {
        setShowIndex(slideIndex);
    };
    return (_jsxs("div", { className: "relative group overflow-hidden", children: [_jsx("div", { className: "flex transition-transform ease-out duration-500", style: { transform: `translateX(-${showIndex * 100}%)` }, children: mainImages.map((image) => (_jsx("div", { className: "w-full flex-shrink-0 py-4 px-9", children: _jsx("img", { className: "h-[550px] w-full bg-center bg-cover rounded-2xl", src: image.image_path, alt: image.description, height: 1600 }) }, image.id))) }), _jsx("div", { className: "hidden group-hover:block absolute top-[45%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer", children: _jsx(BsChevronCompactLeft, { onClick: moveLeft, size: 30 }) }), _jsx("div", { className: "hidden group-hover:block absolute top-[45%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer", children: _jsx(BsChevronCompactRight, { onClick: moveRight, size: 30 }) }), _jsx("div", { className: "flex justify-center py-2 top-4", children: mainImages.map((_, slideIndex) => (_jsx("div", { onClick: () => dotSlide(slideIndex), className: `text-2xl cursor-pointer ${slideIndex === showIndex ? 'text-[#c0daaf]' : ''}`, children: _jsx(RxDotFilled, {}) }, slideIndex))) }), _jsxs("div", { className: "flex bg-[#cac9c0] shadow-inner", children: [_jsx("div", { className: "w-2/5 p-5 shadow-inner-corner", children: _jsxs("div", { id: "mainTitle", className: "justify-items-center my-5 p-5 font-['Cafe24ClassicType-Regular']", children: [_jsx("p", { className: "text-[22px] text-yellow-300", children: "\uCF54\uB9AC\uC544IT\uC758 \uB9DD\uB098\uB2C8\uAC00 \uB418\uC5C8\uB2E4." }), _jsx("p", { className: "text-[15px] text-gray-950", children: "\uADF8\uB4E4\uC740 \uC774\uC81C, IT \uC5C5\uACC4\uC5D0\uC11C \uB204\uAD6C\uB3C4 \uD568\uBD80\uB85C" }), _jsx("p", { className: "text-[15px] text-gray-950", children: "\uAC74\uB4E4 \uC218 \uC5C6\uB294 \uC874\uC7AC\uAC00 \uB418\uC5C8\uB2E4." }), _jsx("p", { className: "text-[15px] text-gray-700 mt-4", children: "\uBAA8\uB4E0 \uB3C4\uC804\uC5D0 \uAD74\uD558\uC9C0 \uC54A\uACE0, \uC2E4\uD328\uB97C \uBC1F\uACE0 \uC77C\uC5B4\uC11C\uBA70 \uADF8\uB4E4\uC740 \uC0C8\uB85C\uC6B4 \uC2DC\uB300\uB97C \uC5EC\uB294 \uC120\uAD6C\uC790\uAC00 \uB418\uC5C8\uB2E4." }), _jsx("p", { className: "text-[15px] text-gray-700", children: "\uCF54\uB9AC\uC544IT\uC5D0\uC11C\uC758 \uC2DC\uAC04\uC740 \uB2E8\uC21C\uD55C \uBC30\uC6C0\uC774 \uC544\uB2C8\uC5C8\uB2E4. \uADF8\uAC83\uC740 \uADF8\uB4E4\uC758 \uC0B6\uC744 \uBCC0\uD654\uC2DC\uD0A8 \uC5EC\uC815\uC774\uC5C8\uB2E4." }), _jsx("p", { className: "text-[14px] text-[#6b6155] italic mt-4", children: "\"\uD601\uC2E0\uC740 \uC6A9\uAE30\uC5D0\uC11C \uC2DC\uC791\uB418\uACE0, \uC5F4\uC815\uC73C\uB85C \uC644\uC131\uB41C\uB2E4.\"" })] }) }), _jsxs("div", { className: "font-['Cafe24ClassicType-Regular'] whitespace-normal w-3/5 p-5 shadow-inner-corner bg-paper-img", children: [_jsxs("div", { className: "mb-6", children: [_jsx("h1", { className: "text-xl font-bold mb-2", children: "\uB2E8\uB77D \uC0DD\uC131" }), _jsxs("p", { className: "text-sm", children: ["\uC18C\uC124\uC744 \uC4F0\uB2E4 \uB9C9\uD788\uB294 \uBD80\uBD84\uC774 \uC788\uB2E4\uBA74 \uB3C4\uC6C0\uC744 \uBC1B\uC744 \uC218 \uC788\uC5B4\uC694! ", _jsx("br", {}), "- \uC7A5\uB974\uBCC4 \uC18C\uC124\uC744 \uC785\uB825\uD558\uBA74 \uC774\uC5B4\uC9C0\uB294 \uB2E8\uB77D\uC744 \uC0DD\uC131\uD574\uC90D\uB2C8\uB2E4."] })] }), _jsxs("div", { className: "mb-6", children: [_jsx("h1", { className: "text-xl font-bold mb-2", children: "\uD45C\uC9C0 \uC0DD\uC131" }), _jsxs("p", { className: "text-sm", children: ["\uC790\uC2E0\uC758 \uC18C\uC124\uC758 \uBA4B\uC9C4 \uD45C\uC9C0\uB97C \uB9CC\uB4E4\uC5B4 \uBCF4\uC138\uC694! ", _jsx("br", {}), "- \uD0A4\uC6CC\uB4DC\uB97C \uC785\uB825\uD558\uBA74 \uADF8\uC5D0 \uB9DE\uB294 \uD45C\uC9C0\uB97C \uC0DD\uC131\uD574\uC90D\uB2C8\uB2E4."] })] }), _jsxs("div", { className: "mb-6", children: [_jsx("h1", { className: "text-xl font-bold mb-2", children: "\uC18C\uC81C\uBAA9 \uC0DD\uC131" }), _jsxs("p", { className: "text-sm", children: ["\uB0B4\uC6A9\uC740 \uBA4B\uC9C4\uB370 \uC18C\uC81C\uBAA9 \uC9D3\uAE30\uAC00 \uC5B4\uB824\uC6B4\uAC00\uC694? ", _jsx("br", {}), "- 3000\uC790 \uC774\uC0C1\uC758 \uC18C\uC124\uC744 \uC785\uB825\uD558\uC2DC\uBA74 \uB429\uB2C8\uB2E4."] })] }), _jsxs("div", { children: [_jsx("h1", { className: "text-xl font-bold mb-2", children: "\uBB38\uD53C\uC544 \uBD84\uC11D" }), _jsxs("p", { className: "text-sm", children: ["\uBB38\uD53C\uC544 \uBD84\uC11D \uB0B4\uC6A9\uC744 \uC81C\uACF5\uD569\uB2C8\uB2E4. ", _jsx("br", {}), "- \uBB38\uD53C\uC544\uC5D0 \uD604\uC7AC \uC6F9\uC18C\uC124\uC758 \uCD94\uC138\uB97C \uD30C\uC545\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4."] })] })] })] })] }));
};
export default MainTitle;
