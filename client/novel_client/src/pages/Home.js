import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import MainAnalyze from './Home/MainAnalyze';
import MainCover from './Home/MainCover';
import MainTitle from './Home/MainTitle';
const Home = () => {
    return (_jsxs("div", { className: "", children: [_jsxs("div", { className: "flex h-3/5", children: [_jsx("div", { className: "w-3/5 bg-books_3-img shadow-inner-corner", children: _jsx(MainTitle, {}) }), _jsx("div", { className: "w-2/5 bg-books-img bg-opacity- p-4 shadow-inner-corner font-['Cafe24ClassicType-Regular']", children: _jsx(MainAnalyze, {}) })] }), _jsx("div", { className: " bg-gradient-to-b from-[#dcddd3] via-[#e2e3dc] to-[#dcddd3] h-2/5 shadow-inner-corner ", children: _jsx(MainCover, {}) })] }));
};
export default Home;
