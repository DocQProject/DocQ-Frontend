import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAllPosts } from "../api";

const PostItem = ({ title, author, createdAt, isLast, onClick}) => (
  <div
    className={`flex text-sm sm:text-base text-gray-800 text-center py-3 px-2 ${
      isLast ? "" : "border-b"
    }`}
    onClick={onClick}
  >
    <div className="w-1/2 truncate">{title}</div>
    <div className="w-1/4">{author}</div>
    <div className="w-1/4">{createdAt}</div>
  </div>
);

export default function Board() {
  const [currentPage, setCurrentPage] = useState(1);
  const [posts, setPosts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = () => {
      setLoading(true);
      fetchAllPosts(currentPage - 1, 10)
        .then((res) => {
          console.log(res.data);
          setPosts(res.data.content);
          setTotalPages(res.data.page.totalPages);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    };
    fetchPosts();
  }, [currentPage]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="w-full max-w-md sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto mt-40 mb-30 px-4">
      <div className="flex items-center h-20">
        <h2 className="text-3xl font-bold mx-auto">게시판</h2>
      </div>

      {/* 테이블 헤더 */}
      <div className="flex font-semibold text-sm sm:text-base rounded-t-lg text-center text-gray-700 bg-gray-100 py-2 sm:py-3 px-2 border">
        <div className="w-1/2">제목</div>
        <div className="w-1/4">글쓴이</div>
        <div className="w-1/4">작성일</div>
      </div>

      {/* Post List */}
      <div className="border-x border-b rounded-b-lg">
        {loading ? (
          <div className="text-center py-8 text-gray-500">로딩 중...</div>
        ) : posts.length === 0 ? (
          <div className="text-center py-8 text-gray-500">게시글이 없습니다.</div>
        ) : (

          posts.map((post, idx) => (
            <PostItem
              key={post.id || `post-${idx}`}
              title={post.title}
              author={post.author}
              createdAt={post.createdAt}
              isLast={idx === posts.length - 1}
              onClick={() => {
                navigate(`/posts/${post.id}`)
              }
            } 
            />
          ))
        )}
      </div>

      {/* 페이지네이션 */}
      <div className="relative mt-6 h-10">
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center space-x-1 text-sm sm:text-base">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-2 sm:px-3 py-1 border rounded hover:bg-gray-100 ${
              currentPage === 1 ? "text-gray-400 cursor-not-allowed" : ""
            }`}
          >
            &lt;
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-2 sm:px-3 py-1 border rounded hover:bg-gray-100 ${
                page === currentPage ? "font-bold bg-blue-100" : ""
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-2 sm:px-3 py-1 border rounded hover:bg-gray-100 ${
              currentPage === totalPages
                ? "text-gray-400 cursor-not-allowed"
                : ""
            }`}
          >
            &gt;
          </button>
        </div>

        <div className="absolute right-0 top-0">
          <button 
            className="text-sm sm:text-base px-4 py-2 bg-black text-white rounded hover:bg-gray-800 whitespace-nowrap"
            onClick={() => navigate("/posts/new")}
          >
            글쓰기
          </button>
        </div>
      </div>
    </div>
  );
}