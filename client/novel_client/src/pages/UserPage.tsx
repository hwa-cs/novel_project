import { Link } from "react-router-dom"; // React Router DOM 사용

interface UserCover {
    makeCover: string;
  }
  
  interface Post {
    content: string;
    makeContent: string;
  }
  
  const UserPage = () => {
    const userCovers: UserCover[] = JSON.parse(sessionStorage.getItem("userCovers") || "[]");
    const userPosts: Post[] | null = JSON.parse(sessionStorage.getItem("userPosts") || "null");
    const key = JSON.parse(sessionStorage.getItem("userObj") || "{}");
  
    return (
      <div className="bg-slate-100 min-h-screen py-10 px-6">
        <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
            {key?.nick} 님 안녕하세요!
          </h1>
  
          <div className="mb-10">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              {key?.nick} 님이 제작한 표지입니다
            </h2>
            {userCovers.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {userCovers.map((a) => (
                  <img
                    key={a.makeCover}
                    src={`/covers/${a.makeCover}`}
                    alt="cover"
                    className="w-full h-auto object-cover rounded-lg border border-gray-300 shadow-md hover:scale-105 transition-transform duration-200"
                  />
                ))}
              </div>
            ) : (
              <p className="text-gray-500">표지가 없습니다.</p>
            )}
          </div>
  
          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              {key?.nick} 님이 제작한 단락입니다
            </h2>
            {userPosts && userPosts.length > 0 ? (
              userPosts.slice().map((a, i) => (
                <div
                  key={i}
                  className="flex flex-col md:flex-row bg-gray-50 rounded-lg shadow-md mb-6 overflow-hidden">
                  <div className="border-b md:border-b-0 md:border-r border-gray-300 flex-1 p-6">
                    <span className="text-blue-600 font-bold block mb-2">단락 {i + 1}</span>
                    <h2 className="text-lg font-semibold text-gray-700 mb-2">{a.content}</h2>
                  </div>
  
                  <div className="flex-1 p-6">
                    <span className="text-blue-600 font-bold block mb-2">내용 {i + 1}</span>
                    <p className="text-gray-600">{a.makeContent}</p>
                    {/* 상세 페이지로 이동 */}
                    <Link
                      to={`/post-detail/${i}`}
                      className="text-blue-500 hover:underline mt-4 block">
                      상세 페이지로 이동
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">단락이 없습니다.</p>
            )}
          </div>
        </div>
      </div>
    );
  };
  
  export default UserPage;