function SideBarButton({ label, deleteAcount = false }) {
  return (
    <button
      onClick={() => alert()}
      className={`text-left px-4 py-2 rounded hover:bg-gray-200 transition duration-500 font-semibold ${deleteAcount ? "text-red-600" : ""
        }`}
    >
      {label}
    </button>
  );
}

function ProfileFormField({ label, type = "text" }) {
  return (
    <label className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
      <span className="w-20 font-bold text-gray-500 shrink-0">{label}</span>
      <input
        type={type}
        className="w-full border rounded px-3 py-2 focus:ring"
      />
    </label>
  );
}

function ReservationCard({ hospital, date, time, comment, status }) {
  return (
    <div className="border rounded-lg p-4 shadow-sm flex flex-col gap-2 bg-gray-50">
      <div className="text-lg font-bold">{hospital}</div>
      <div className="text-sm text-gray-600">예약일: {date}</div>
      <div className="text-sm text-gray-600">시간: {time}</div>
      <div className="text-sm text-gray-600">코멘트: {comment}</div>
      <div className="text-sm font-semibold text-blue-600">현황: {status}</div>
    </div>
  );
}

function ClinicCreateForm() {
  return (
    <form className="flex flex-col gap-4">
      <ClinicCreateFormLabel label="병원 이름" />
      <ClinicCreateFormLabel label="병원 주소" />
      <ClinicCreateFormLabel label="진료과" />
      <ClinicCreateFormLabel label="영업 시작 시간" />
      <ClinicCreateFormLabel label="영업 종료 시간" />
      <div className="flex justify-end">
        <button className="font-bold bg-black text-white rounded px-4 py-2 hover:bg-gray-800 transition">
          등록
        </button>
      </div>

      <ClinicCreateFormLabel />
    </form>
  );
}

function ClinicCreateFormLabel({ label }) {
  return (
    <label className="flex flex-col">
      <span className="font-bold text-gray-500">{label}</span>
      <input type="text" className="border rounded px-3 py-2 focus:ring" />
    </label>
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
          <SideBarButton label="내 정보" />
          <SideBarButton label="내 병원" />
          <SideBarButton label="내 예약" />
          <SideBarButton label={"회원탈퇴"} deleteAcount />
        </aside>

        {/* 폼 영역 */}
        <div className="flex-1 shadow p-6 rounded-lg bg-white">
          <section className="flex flex-col gap-6">
            <ProfileFormField label="이름" />
            <ProfileFormField label="ID" />
            <ProfileFormField label="비밀번호" type="password" />
            <ProfileFormField label="이메일" type="email" />
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
