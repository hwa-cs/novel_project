import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { getNovelApi } from "../api/novelApi"; // API 요청 함
const PostDetailPage = () => {
    const { id } = useParams(); // URL에서 단락 ID 가져오기
    const navigate = useNavigate();
    const userId = JSON.parse(sessionStorage.getItem("userObj") || "{}").id;
    const userPosts = JSON.parse(sessionStorage.getItem("userPosts") || "[]");
    const postId = id ? parseInt(id, 10) : null;
    if (postId === null || isNaN(postId) || !userPosts[postId]) {
        return _jsx("p", { className: "text-center text-gray-500", children: "\uB2E8\uB77D\uC744 \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4." });
    }
    const post = userPosts[postId];
    const [content, setContent] = useState(post.makeContent || "");
    const handleDelete = async () => {
        if (confirm('삭제 하시겠습니까?') === false) {
            return;
        }
        try {
            const response = await getNovelApi({
                method: "POST",
                url: "/api/post/deleteShort",
                data: { userId, id: post.id },
                withCredentials: true,
            });
            console.log(post.id);
            const userPost = response.data.posts;
            sessionStorage.setItem('userPosts', JSON.stringify(userPost));
            alert("단락이 삭제되었습니다.");
            navigate("/UserPage"); // UserPage로 이동
        }
        catch (error) {
            console.error("에러 발생:", error.response?.data || error.message);
            alert("단락 삭제에 실패했습니다.");
        }
    };
    const handleUpdate = async () => {
        try {
            const response = await getNovelApi({
                method: "POST",
                url: "/api/post/update",
                data: { userId, id: post.id, content },
                withCredentials: true,
            });
            const userPost = response.data.posts;
            sessionStorage.setItem('userPosts', JSON.stringify(userPost));
            alert("단락이 수정되었습니다.");
            navigate("/UserPage"); // UserPage로 이동
        }
        catch (error) {
            console.error("에러 발생:", error.response?.data || error.message);
            alert("단락 수정에 실패했습니다.");
        }
    };
    return (_jsx("div", { className: "bg-gray-100 min-h-screen flex items-center justify-center", children: _jsxs("div", { className: "bg-white shadow-lg rounded-lg p-8 w-[600px]", children: [_jsx("h2", { className: "text-2xl font-bold mb-4", children: "\uB2E8\uB77D \uC0C1\uC138" }), _jsx("textarea", { value: content, onChange: (e) => setContent(e.target.value), className: "text-gray-500 mb-4 w-[550px] h-[600px]" }), _jsxs("div", { className: "flex justify-between", children: [_jsx("button", { onClick: handleUpdate, className: "bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600", children: "\uC218\uC815" }), _jsx("button", { onClick: handleDelete, className: "bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600", children: "\uC0AD\uC81C" })] })] }) }));
};
export default PostDetailPage;
