import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from 'react-router-dom';
const Reserve = () => {
    return (_jsx("div", { className: "h-screen bg-gradient-to-b from-[#dcddd3] via-[#e2e3dc] to-[#dcddd3] shadow-inner-corner flex items-center justify-center p-24", children: _jsxs("div", { className: "bg-[#434448] p-20 shadow-inner-corner rounded-2xl font-['Cafe24ClassicType-Regular']", children: [_jsx("h2", { className: "text-center text-2xl text-yellow-200 ", children: "\uC18C\uC81C\uBAA9 \uC0DD\uC131 \uBC0F \uBD84\uC11D \uD398\uC774\uC9C0" }), _jsxs("ul", { className: "mt-10 space-y-4 ", children: [_jsx("li", { className: "text-center ", children: _jsx(Link, { className: "text-white text-xl hover:text-[#c0daaf]", to: "/Title", children: "\uC18C\uC81C\uBAA9 \uC0DD\uC131" }) }), _jsx("li", { className: "text-center", children: _jsx(Link, { className: "text-white text-xl hover:text-[#c0daaf]", to: "/Analyze", children: "\uC7A5\uB974\uBCC4 \uBD84\uC11D" }) })] })] }) }));
};
export default Reserve;
