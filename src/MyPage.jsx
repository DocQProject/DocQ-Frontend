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
    <div className="min-h-screen pt-20 flex flex-col items-center px-4">
      {/* 상단 아이콘 + 타이틀 */}
      <div className="flex flex-col sm:flex-row items-center ps-2 pb-2 gap-2 mb-10 w-full max-w-screen-md border-b border-gray-300 ">
        <img
          src="/src/assets/Doc-Q.png"
          className="w-20 h-20 me-20"
          style={{ clipPath: "inset(20% 0 20% 0)" }}
          alt="icon"
        />
        <h1 className="text-3xl font-bold font-yeonsung w-full text-center sm:text-left">
          마이페이지
        </h1>
      </div>

      {/* 사이드바 + 폼 영역 */}
      <div className="w-full max-w-screen-md flex flex-col sm:flex-row gap-8">
        {/* 사이드바 */}
        <aside className="w-full sm:w-1/3 flex flex-col space-y-4">
          <button className="text-left px-4 py-2 rounded hover:bg-gray-200 transition duration-500 font-semibold">
            내 병원
          </button>
          <button className="text-left px-4 py-2 rounded hover:bg-gray-200 transition duration-500 font-semibold">
            내 예약
          </button>
          <button className="text-left px-4 py-2 rounded hover:bg-gray-200 transition duration-500 font-semibold text-red-600">
            회원탈퇴
          </button>
          <SideBarButton
            label="회원정보 수정"
            isActive={false}
            onClick={() => {}}
          />
        </aside>

        {/* 폼 영역 */}
        <div className="flex-1 shadow p-6 rounded-lg bg-white">
          <section className="flex flex-col gap-6">
            <label className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
              <span className="w-20 font-bold text-gray-500 shrink-0">
                이름
              </span>
              <input
                type="text"
                className="w-full border rounded px-3 py-2 focus:ring"
              />
            </label>
            <label className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
              <span className="w-20 font-bold text-gray-500 shrink-0">ID</span>
              <input
                type="text"
                className="w-full border rounded px-3 py-2 focus:ring"
              />
            </label>
            <label className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
              <span className="w-20 font-bold text-gray-500 shrink-0">
                비밀번호
              </span>
              <input
                type="password"
                className="w-full border rounded px-3 py-2 focus:ring"
              />
            </label>
            <label className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
              <span className="w-20 font-bold text-gray-500 shrink-0">
                이메일
              </span>
              <input
                type="email"
                className="w-full border rounded px-3 py-2 focus:ring"
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
