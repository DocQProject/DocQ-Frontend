import { useState, useEffect } from "react";
import { fetchUserInfo, updateUserInfo } from "../api";

function SideBarButton({ label, deleteAcount = false, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`text-left px-4 py-2 rounded hover:bg-gray-200 transition duration-500 font-semibold ${
        deleteAcount ? "text-red-600" : ""
      }`}
    >
      {label}
    </button>
  );
}

function ProfileFormField({
  label,
  type = "text",
  value = "",
  readOnly = true,
  onChange,
  error,
}) {
  return (
      <div className="flex items-center gap-2 sm:gap-4">
        <span className="w-20 font-bold text-gray-500 shrink-0">{label}</span>
        <div className="flex flex-col w-full">
          <input
            type={type}
            value={value}
            readOnly={readOnly}
            onChange={onChange}
            className="w-full border rounded px-3 py-2 focus:ring"
          />
          {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
        </div>
      </div>
  );
}

function ProfileSection({ user, onUserUpdate }) {
  const [isEditable, setIsEditable] = useState(false);
  const [errorMessages, setErrorMessages] = useState({});
  const [formData, setFormData] = useState({
    name: user?.name,
    loginId: user?.loginId,
    password: "",
    email: user?.email,
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        loginId: user.loginId || "",
        password: "",
        email: user.email || "",
      });
    }
  }, [user]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleEditClick = async () => {
    if (isEditable) {
      try {
        await updateUserInfo(formData);
        alert("정보가 업데이트되었습니다.");
        if (onUserUpdate) {
          onUserUpdate(formData);
        }
        setIsEditable(false);
        setErrorMessages({});
      } catch (error) {
        console.error("Error updating user info:", error);
        const errorMessage = error.response?.data;

        if (Array.isArray(errorMessage)) {
          const errors = {};
          errorMessage.forEach((err) => {
            if (err.includes("아이디")) {
              errors.loginId = err;
            } else if (err.includes("이름")) {
              errors.name = err;
            } else if (err.includes("비밀번호")) {
              errors.password = err;
            } else if (err.includes("이메일")) {
              errors.email = err;
            }
          });

          setErrorMessages(errors);
        } else if (typeof errorMessage === "string") {
          if (errorMessage.includes("이미")) {
            setErrorMessages({ loginId: errorMessage });
          }
        } else {
          alert("알 수 없는 오류가 발생했습니다. 다시 시도해주세요.");
        }
      }
    } else {
      setIsEditable(true);
    }
  };

  if (!user) return <div>로딩 중...</div>;

  return (
    <div className="flex-1 shadow p-6 rounded-lg bg-white">
      <section className="flex flex-col gap-6">
        <ProfileFormField
          label="이름"
          value={formData.name}
          readOnly={!isEditable}
          onChange={(e) => handleChange("name", e.target.value)}
          error={errorMessages.name}
        />

        <ProfileFormField
          label="ID"
          value={formData.loginId}
          readOnly={!isEditable}
          onChange={(e) => handleChange("loginId", e.target.value)}
          error={errorMessages.loginId}
        />

        <ProfileFormField
          label="비밀번호"
          type="password"
          value={formData.password}
          readOnly={!isEditable}
          onChange={(e) => handleChange("password", e.target.value)}
          error={errorMessages.password}
        />

        <ProfileFormField
          label="이메일"
          type="email"
          value={formData.email}
          readOnly={!isEditable}
          onChange={(e) => handleChange("email", e.target.value)}
          error={errorMessages.email}
        />

        <div className="flex justify-end">
          <button
            className="font-bold bg-black text-white rounded px-4 py-2 hover:bg-gray-800 transition"
            onClick={handleEditClick}
          >
            {isEditable ? "저장" : "수정"}
          </button>
        </div>
      </section>
    </div>
  );
}

function ReservationSection({ hospital, date, time, comment, status }) {
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

function ClinicSection() {
  return (
    <form className="flex flex-col gap-4 w-full">
      <ClinicLabel label="병원 이름" />
      <ClinicLabel label="병원 주소" />
      <ClinicLabel label="진료과" />
      <ClinicLabel label="영업 시작 시간" />
      <ClinicLabel label="영업 종료 시간" />
      <div className="flex justify-end">
        <button className="font-bold bg-black text-white rounded px-4 py-2 hover:bg-gray-800 transition">
          등록
        </button>
      </div>
    </form>
  );
}

function ClinicLabel({ label }) {
  return (
    <label className="flex flex-col">
      <span className="font-bold text-gray-500">{label}</span>
      <input type="text" className="border rounded px-3 py-2 focus:ring" />
    </label>
  );
}

function MyPage() {
  const [activeSection, setActiveSection] = useState("내 정보");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (activeSection === "내 정보") {
      setLoading(true);
      fetchUserInfo()
        .then((res) => setUser(res.data)) // axios는 res.data에 데이터가 들어 있음
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    }
  }, [activeSection]);

  const renderContent = () => {
    switch (activeSection) {
      case "내 정보":
        return <ProfileSection user={user} onUserUpdate={setUser} />;
      case "내 병원":
        return <ClinicSection />;
      case "내 예약":
        return (
          <ReservationSection
            hospital="서울병원"
            date="2023-10-01"
            time="14:00"
            comment="첫 방문입니다."
            status="예약 완료"
          />
        );
      case "회원탈퇴":
        return (
          <div className="flex-1 shadow p-6 rounded-lg bg-white text-3xl">
            회원탈퇴
          </div>
        );
      default:
        return null;
    }
  };

  const sidebarButtons = [
    { label: "내 정보", key: "내 정보" },
    ...(user?.role === "ROLE_DOCTOR"
      ? [{ label: "내 병원", key: "내 병원" }]
      : []),
    { label: "내 예약", key: "내 예약" },
    { label: "회원탈퇴", key: "회원탈퇴", deleteAcount: true },
  ];

  return (
    <div className="min-h-screen pt-20 flex flex-col items-center px-4">
      {/* 상단 아이콘 + 타이틀 */}
      <div className="flex flex-col sm:flex-row items-center ps-2 pb-2 gap-2 mb-10 w-full max-w-screen-md border-gray-300 ">
        <h1 className="text-3xl font-bold font-yeonsung w-full text-center sm:text-left">
          마이페이지
        </h1>
      </div>

      {/* 사이드바 + 폼 영역 */}
      <div className="w-full max-w-screen-md flex flex-col sm:flex-row gap-8">
        {/* 사이드바 */}
        <aside className="w-full sm:w-1/3 flex flex-col space-y-4">
          {sidebarButtons.map((button) => (
            <SideBarButton
              key={button.key}
              label={button.label}
              deleteAcount={button.deleteAcount}
              onClick={() => setActiveSection(button.key)}
            />
          ))}
        </aside>

        {/* 메인 콘텐츠 */}
        <div className="flex-1">{renderContent()}</div>
      </div>
    </div>
  );
}

export default MyPage;
