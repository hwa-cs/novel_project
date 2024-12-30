import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { Link } from "react-router-dom"; // React Router DOM 사용
const UserPage = () => {
    const userCovers = JSON.parse(sessionStorage.getItem("userCovers") || "[]");
    const userPosts = JSON.parse(sessionStorage.getItem("userPosts") || "null");
    const key = JSON.parse(sessionStorage.getItem("userObj") || "{}");
    return (_jsx("div", { className: "bg-slate-100 min-h-screen py-10 px-6", children: _jsxs("div", { className: "max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-8", children: [_jsxs("h1", { className: "text-2xl font-bold text-gray-800 text-center mb-6", children: [key?.nick, " \uB2D8 \uC548\uB155\uD558\uC138\uC694!"] }), _jsxs("div", { className: "mb-10", children: [_jsxs("h2", { className: "text-xl font-semibold text-gray-700 mb-4", children: [key?.nick, " \uB2D8\uC774 \uC81C\uC791\uD55C \uD45C\uC9C0\uC785\uB2C8\uB2E4"] }), userCovers.length > 0 ? (_jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6", children: userCovers.map((a) => (_jsx("img", { src: `/covers/${a.makeCover}`, alt: "cover", className: "w-full h-auto object-cover rounded-lg border border-gray-300 shadow-md hover:scale-105 transition-transform duration-200" }, a.makeCover))) })) : (_jsx("p", { className: "text-gray-500", children: "\uD45C\uC9C0\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4." }))] }), _jsxs("div", { children: [_jsxs("h2", { className: "text-xl font-semibold text-gray-700 mb-4", children: [key?.nick, " \uB2D8\uC774 \uC81C\uC791\uD55C \uB2E8\uB77D\uC785\uB2C8\uB2E4"] }), userPosts && userPosts.length > 0 ? (userPosts.slice().map((a, i) => (_jsxs("div", { className: "flex flex-col md:flex-row bg-gray-50 rounded-lg shadow-md mb-6 overflow-hidden", children: [_jsxs("div", { className: "border-b md:border-b-0 md:border-r border-gray-300 flex-1 p-6", children: [_jsxs("span", { className: "text-blue-600 font-bold block mb-2", children: ["\uB2E8\uB77D ", i + 1] }), _jsx("h2", { className: "text-lg font-semibold text-gray-700 mb-2", children: a.content })] }), _jsxs("div", { className: "flex-1 p-6", children: [_jsxs("span", { className: "text-blue-600 font-bold block mb-2", children: ["\uB0B4\uC6A9 ", i + 1] }), _jsx("p", { className: "text-gray-600", children: a.makeContent }), _jsx(Link, { to: `/post-detail/${i}`, className: "text-blue-500 hover:underline mt-4 block", children: "\uC0C1\uC138 \uD398\uC774\uC9C0\uB85C \uC774\uB3D9" })] })] }, i)))) : (_jsx("p", { className: "text-gray-500", children: "\uB2E8\uB77D\uC774 \uC5C6\uC2B5\uB2C8\uB2E4." }))] })] }) }));
};
export default UserPage;