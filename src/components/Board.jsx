import { useState } from "react";

const posts = Array.from({ length: 43 }, (_, i) => ({
  id: i + 1,
  title: `게시글 제목 ${i + 1}`,
  author: `작성자 ${i + 1}`,
  createdAt: `2025-07-${((i % 28) + 1).toString().padStart(2, "0")}`,
}));

const PAGE_SIZE = 10;

const PostItem = ({ title, author, createdAt, isLast }) => (
  <div
    className={`flex text-sm sm:text-base text-gray-800 text-center py-3 px-2 ${
      isLast ? "" : "border-b"
    }`}
  >
    <div className="w-1/2 truncate">{title}</div>
    <div className="w-1/4">{author}</div>
    <div className="w-1/4">{createdAt}</div>
  </div>
);

export default function Board() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(posts.length / PAGE_SIZE);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const currentPosts = posts.slice(startIndex, startIndex + PAGE_SIZE);

  return (
    <div className="w-full max-w-md sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto mt-10 px-4">
      <div className="relative flex items-center h-20">
        {/* 메인 이동 이미지 */}
        <img
          src="/src/assets/Doc-Q.png"
          alt="icon"
          className="w-20 h-20 absolute left-0"
        />

        {/* 중앙에 텍스트 */}
        <h2 className="text-3xl font-bold mx-auto">게시판</h2>
      </div>

      {/* Header */}
      <div className="flex font-semibold text-sm sm:text-base rounded-t-lg text-center text-gray-700 bg-gray-100 py-2 sm:py-3 px-2 border">
        <div className="w-1/2">제목</div>
        <div className="w-1/4">글쓴이</div>
        <div className="w-1/4">작성일</div>
      </div>

      {/* Post List */}
      <div className="border-x border-b rounded-b-lg">
        {currentPosts.map((post, idx) => (
          <PostItem
            key={post.id}
            title={post.title}
            author={post.author}
            createdAt={post.createdAt}
            isLast={idx === currentPosts.length - 1}
          />
        ))}
      </div>

      {/* Footer */}
      <div className="relative mt-6 h-10">
        {/* 페이지네이션 (수평 중앙 정렬) */}
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

        {/* 글쓰기 버튼 (오른쪽 정렬) */}
        <div className="absolute right-0 top-0">
          <button className="text-sm sm:text-base px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 whitespace-nowrap">
            글쓰기
          </button>
        </div>
      </div>
    </div>
  );
}
