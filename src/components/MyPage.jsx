import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  fetchUserInfo,
  updateUserInfo,
  fetchReservations,
  deleteAccount,
  fetchMyClinicInfo,
  registerMyClinic,
  deleteClinic,
} from "../api";

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

// Profile
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

function ReservationSection({ reservations }) {
  if (reservations.length === 0) {
    return <div className="text-center text-gray-500">예약이 없습니다.</div>;
  }

  return reservations.map((res) => (
    <ReservationCard
      key={res.reservationId}
      clinic={res.clinicName}
      date={res.date}
      time={res.time}
      message={res.message}
      status={res.status}
    />
  ));
}

function ReservationCard({ clinic, date, time, message, isDeleted }) {
  return (
    <div className="border rounded-lg p-4 shadow-sm flex flex-col gap-2 bg-gray-50 mb-4">
      <div className="text-lg font-bold">{clinic}</div>
      <div className="text-sm text-gray-600">예약일: {date}</div>
      <div className="text-sm text-gray-600">시간: {time}</div>
      <div className="text-sm text-gray-600">코멘트: {message}</div>
      <div className="text-sm font-semibold text-blue-600">
        예약현황: {isDeleted ? "취소" : "예약완료"}
      </div>
    </div>
  );
}

function ClinicSection( {clinic, onClinicUpdate} ) {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    department: "",
    openTime: "",
    closeTime: "",
  });

  const loadClinicData = () => {
    fetchMyClinicInfo()
      .then((res) => {
        const data = res.data;
        setFormData(
          data
            ? {
                name: data.name || "",
                address: data.address || "",
                department: data.department || "",
                openTime: data.openTime || "",
                closeTime: data.closeTime || "",
              }
            : null
        );
      })
      .catch((err) => {
        console.error("Error fetching clinic info:", err);
        setFormData(null);
      });
  };

  useEffect(() => {
    loadClinicData();
  }, []);

  const handleRegisterClinic = async (e) => {
    e.preventDefault();

    await registerMyClinic(formData)
      .then(() => {
        alert("병원이 등록되었습니다.");
        if (onClinicUpdate) {
          onClinicUpdate(formData);
        }
      })
      .catch((err) => {
        console.error("Error registering clinic:", err);
        alert("병원 등록 중 오류가 발생했습니다. 다시 시도해주세요.");
      });
  };

  const handleDeleteClinic = () => {
    deleteClinic()
      .then(() => {
        const confirmDelete = window.confirm(
          "정말로 병원을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다."
        );
        if (!confirmDelete) return;
        alert("병원이 삭제되었습니다.");
        setFormData(null);
      })
      .catch((err) => {
        console.error("Error deleting clinic:", err);
        alert("병원 삭제 중 오류가 발생했습니다. 다시 시도해주세요.");
      });
  };

  if (!clinic) {
    return (
      <form className="flex flex-col gap-4 w-full">
        <ClinicInput
          label="병원 이름"
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <ClinicInput
          label="병원 주소"
          onChange={(e) =>
            setFormData({ ...formData, address: e.target.value })
          }
        />
        <ClinicInput
          label="진료과"
          onChange={(e) =>
            setFormData({ ...formData, department: e.target.value })
          }
        />
        <ClinicInput
          label="영업 시작 시간"
          onChange={(e) =>
            setFormData({ ...formData, openTime: e.target.value })
          }
          type="time"
        />
        <ClinicInput
          label="영업 종료 시간"
          onChange={(e) =>
            setFormData({ ...formData, closeTime: e.target.value })
          }
          type="time"
        />
        <div className="flex justify-end">
          <button
            type="button"
            className="font-bold bg-black text-white rounded px-4 py-2 hover:bg-gray-800 transition"
            onClick={handleRegisterClinic}
          >
            내 병원 등록
          </button>
        </div>
      </form>
    );
  }

  return (
    <form className="flex flex-col gap-4 w-full">
      <ClinicLabel label="병원 이름" value={clinic.name} />
      <ClinicLabel label="병원 주소" value={clinic.address} />
      <ClinicLabel label="진료과" value={clinic.department} />
      <ClinicLabel label="영업 시작 시간" value={clinic.openTime} />
      <ClinicLabel label="영업 종료 시간" value={clinic.closeTime} />
      <div className="flex justify-end">
        <button
          className="font-bold bg-black text-white rounded px-4 py-2 hover:bg-gray-800 transition"
          onClick={handleDeleteClinic}
        >
          내 병원 삭제
        </button>
      </div>
    </form>
  );
}

function ClinicLabel({ label, value }) {
  return (
    <label className="flex flex-col">
      <span className="font-bold text-gray-500">{label}</span>
      <input
        type="text"
        className="border rounded px-3 py-2 focus:ring"
        value={value}
        readOnly
      />
    </label>
  );
}

function ClinicInput({ label, type = "text", value, onChange }) {
  return (
    <label className="flex flex-col">
      <span className="font-bold text-gray-500">{label}</span>
      <input
        type={type}
        className="border rounded px-3 py-2 focus:ring"
        value={value}
        onChange={onChange}
      />
    </label>
  );
}

// 회원탈퇴 섹션
function DeleteAccountSection({}) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (!password) {
      setError("비밀번호를 입력해주세요.");
      return;
    }

    const confirmDelete = window.confirm(
      "정말로 회원탈퇴 하시겠습니까? 이 작업은 되돌릴 수 없습니다."
    );

    if (!confirmDelete) return;

    setIsDeleting(true);
    setError("");

    try {
      // 예시 API 호출
      await deleteAccount({ password });
      alert("회원탈퇴가 완료되었습니다.");

      localStorage.removeItem("accessToken");
      // 로그아웃 후 메인 페이지로 이동
      navigate("/sign-in");
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data ||
          "회원탈퇴 중 오류가 발생했습니다. 다시 시도해주세요."
      );
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex-1 shadow p-6 rounded-lg bg-white max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-red-600">회원탈퇴</h2>
      <p className="mb-4 text-gray-700">
        회원탈퇴를 진행하려면 비밀번호를 입력하고 버튼을 클릭해주세요.
      </p>

      <div className="flex flex-col gap-4">
        <ProfileFormField
          label="비밀번호"
          type="password"
          value={password}
          readOnly={false}
          onChange={(e) => setPassword(e.target.value)}
          error={error}
        />

        <button
          className={`font-bold bg-red-600 text-white rounded px-4 py-2 hover:bg-red-700 transition ${
            isDeleting ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={handleDelete}
          disabled={isDeleting}
        >
          회원탈퇴
        </button>
      </div>
    </div>
  );
}

function MyPage() {
  const [activeSection, setActiveSection] = useState("내 정보");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [reservations, setReservations] = useState([]);
  const [clinic, setClinic] = useState(null);

  useEffect(() => {
    if (activeSection === "내 정보") {
      setLoading(true);
      fetchUserInfo()
        .then((res) => setUser(res.data)) // axios는 res.data에 데이터가 들어 있음
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    }
  }, [activeSection]);

  useEffect(() => {
    if (activeSection === "내 예약") {
      fetchReservations()
        .then((res) => setReservations(res.data.content))
        .catch((err) => console.error(err));
    }
  }, [activeSection]);

  useEffect(() => {
    if (activeSection === "내 병원") {
      fetchMyClinicInfo()
        .then((res) => setClinic(res.data))
        .catch((err) => console.error(err));
    }
  }, [activeSection]);

  const renderContent = () => {
    switch (activeSection) {
      case "내 정보":
        return <ProfileSection user={user} onUserUpdate={setUser} />;
      case "내 병원":
        return <ClinicSection clinic={clinic} onClinicUpdate={setClinic}/>;
      case "내 예약":
        return <ReservationSection reservations={reservations} />;
      case "회원탈퇴":
        return <DeleteAccountSection />;
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
