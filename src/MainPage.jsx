import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function MainPage() {
  const [bestSellers, setBestSellers] = useState([]);
  const navigate = useNavigate();

useEffect(() => {
  const today = new Date().toISOString().split("T")[0];

  const fetchBestSellers = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/bestsellers?date=${today}&type=monthly`
      );

      // 404 등의 오류일 경우 처리
      if (!response.ok) {
        console.warn("응답 상태:", response.status);
        setBestSellers([]); // 빈 배열로 설정
        return;
      }

      const data = await response.json();

      // data.data가 없을 수도 있으니 안전하게 처리
      setBestSellers(data?.data ?? []);
    } catch (error) {
      console.error("베스트셀러 조회 실패:", error);
      setBestSellers([]); // 오류 발생 시에도 빈 배열로 설정
    }
  };

  fetchBestSellers();
}, []);


  const handleSearch = () => {
    const keyword = document.getElementById("searchInput").value;
    if (keyword) {
      navigate(`/search?keyword=${encodeURIComponent(keyword)}`);
    }
  };

  return (
    <div className="p-4">
      {/* 상단 헤더 */}
      <div className="flex justify-between items-center mb-6">
        <div className="text-3xl font-bold">ililBooks</div>
        <div className="flex space-x-2">
          <button onClick={() => navigate("/mypage")} className="btn">
            마이페이지
          </button>
          <button onClick={() => navigate("/signup")} className="btn">
            회원가입
          </button>
          <button onClick={() => navigate("/login")} className="btn">
            로그인/로그아웃
          </button>
          <button className="btn">이벤트 / 한정판</button>
        </div>
      </div>

      {/* 검색 바 */}
      <div className="flex mb-8">
        <input
          id="searchInput"
          type="text"
          placeholder="검색어를 입력하세요"
          className="w-full border rounded-l p-2"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 rounded-r"
        >
          검색
        </button>
      </div>

      {/* 이달의 책 - 가로 스크롤 */}
      {/* <div className="mb-12">
        <h2 className="text-xl font-semibold mb-2">이달의 책</h2>
        <div className="flex overflow-x-auto space-x-4">
          {Array(8)
            .fill(null)
            .map((_, idx) => (
              <div
                key={idx}
                className="min-w-[160px] h-64 border rounded flex items-center justify-center"
              >
                책
              </div>
            ))}
        </div>
      </div> */}

      {/* 베스트셀러 */}
      <div>
        <h2 className="text-xl font-semibold mb-2">베스트 셀러</h2>

        {bestSellers.length === 0 ? (
          <div className="text-gray-500 text-center border p-8 rounded">
            판매 데이터가 부족합니다.
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {bestSellers.map((book, idx) => (
              <div key={idx} className="border p-2 rounded">
                <img
                  src={book.imageUrl}
                  alt={book.title}
                  className="w-full h-48 object-cover mb-2"
                />
                <div className="font-bold">{book.title}</div>
                <div className="text-sm text-gray-600">{book.author}</div>
                <div className="text-sm">{book.publisher}</div>
                <div className="text-sm text-blue-600 font-semibold">
                  {book.price}원
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MainPage;
