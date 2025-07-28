function SideBarButton({ label, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`text-left px-4 py-2 rounded hover:bg-gray-200 transition duration-500 font-semibold ${
        isActive ? "bg-gray-300" : ""
      }`}
    >
      {label}
    </button>
  );
}

function MyPage() {
  return (
    <div className="min-h-screen pt-20 flex flex-col items-center">
      <div className="flex flex-row">
        {/* 아이콘 */}
        <img
          src="/src/assets/react.svg"/>
        {/* 상단 타이틀 */}
        <h1 className="w-[1000px] text-4xl font-bold text-left font-yeonsung border-b border-gray-300 pb-4 mb-10">
          마이페이지
        </h1>
        
      </div>

      {/* 사이드바 + 폼 영역 */}
      <div className="w-[1000px] flex gap-8">
        {/* 사이드바 */}
        <aside className="w-[200px] flex flex-col space-y-4">
          <button className="text-left px-4 py-2 rounded hover:bg-gray-200 transition duration-500 font-semibold">
            내 병원
          </button>
          <button className="text-left px-4 py-2 rounded hover:bg-gray-200 transition duration-500 font-semibold">
            내 예약
          </button>
          <button className="text-left px-4 py-2 rounded hover:bg-gray-200 transition duration-500 font-semibold text-red-600">
            회원탈퇴
          </button>
          <SideBarButton label="회원정보 수정" isActive={false} onClick={() => {}} />
        </aside>

        {/* 폼 영역 */}
        <div className="flex-1 shadow p-6 max-w-[500px]">
          <section className="flex flex-col gap-6">
            <label className="flex items-center gap-4">
              <span className="w-20 font-bold text-gray-500">이름</span>
              <input
                type="text"
                className="flex-1 border rounded px-3 py-2 focus:ring"
              />
            </label>
            <label className="flex items-center gap-4">
              <span className="w-20 font-bold text-gray-500">ID</span>
              <input
                type="text"
                className="flex-1 border rounded px-3 py-2 focus:ring"
              />
            </label>
            <label className="flex items-center gap-4">
              <span className="w-20 font-bold text-gray-500">비밀번호</span>
              <input
                type="password"
                className="flex-1 border rounded px-3 py-2 focus:ring"
              />
            </label>
            <label className="flex items-center gap-4">
              <span className="w-20 font-bold text-gray-500">이메일</span>
              <input
                type="email"
                className="flex-1 border rounded px-3 py-2 focus:ring"
              />
            </label>
            <div className="flex justify-end">
              <button className="font-bold bg-black text-white rounded px-4 py-2 hover:bg-gray-800 transition">
                수정
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default MyPage;
