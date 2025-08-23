import React, { useState } from "react";
import SideBar from "./SideBar";

function ReservationForm() {
  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-sm border">
      <h2 className="text-2xl font-semibold mb-6 text-center">예약하기</h2>

      <div className="space-y-6">
        {/* 날짜 선택 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            예약 날짜
          </label>
          <input
            type="date"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <input
            type="date"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* 시간 선택 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            예약 시간
          </label>
          <div className="grid grid-cols-3 gap-2 max-h-64 overflow-y-auto p-2 border border-gray-200 rounded-lg">
            {/* 10:00-12:00 시간대 */}
            <button className="p-2 text-sm rounded-md border bg-white text-gray-700 border-gray-300 hover:bg-gray-50">
              10:00
            </button>
            <button className="p-2 text-sm rounded-md border bg-white text-gray-700 border-gray-300 hover:bg-gray-50">
              10:30
            </button>
            <button className="p-2 text-sm rounded-md border bg-white text-gray-700 border-gray-300 hover:bg-gray-50">
              11:00
            </button>
            <button className="p-2 text-sm rounded-md border bg-white text-gray-700 border-gray-300 hover:bg-gray-50">
              11:30
            </button>

            {/* 휴게시간 표시 */}
            <div className="col-span-3 text-center text-sm text-gray-400 py-2 border-t border-b border-gray-200 my-2">
              휴게시간 (12:00 - 14:00)
            </div>

            {/* 14:00-20:00 시간대 */}
            <button className="p-2 text-sm rounded-md border bg-white text-gray-700 border-gray-300 hover:bg-gray-50">
              14:00
            </button>
            <button className="p-2 text-sm rounded-md border bg-white text-gray-700 border-gray-300 hover:bg-gray-50">
              14:30
            </button>
            <button className="p-2 text-sm rounded-md border bg-white text-gray-700 border-gray-300 hover:bg-gray-50">
              15:00
            </button>
            <button className="p-2 text-sm rounded-md border bg-white text-gray-700 border-gray-300 hover:bg-gray-50">
              15:30
            </button>
            <button className="p-2 text-sm rounded-md border bg-white text-gray-700 border-gray-300 hover:bg-gray-50">
              16:00
            </button>
            <button className="p-2 text-sm rounded-md border bg-white text-gray-700 border-gray-300 hover:bg-gray-50">
              16:30
            </button>
            <button className="p-2 text-sm rounded-md border bg-white text-gray-700 border-gray-300 hover:bg-gray-50">
              17:00
            </button>
            <button className="p-2 text-sm rounded-md border bg-white text-gray-700 border-gray-300 hover:bg-gray-50">
              17:30
            </button>
            <button className="p-2 text-sm rounded-md border bg-white text-gray-700 border-gray-300 hover:bg-gray-50">
              18:00
            </button>
            <button className="p-2 text-sm rounded-md border bg-white text-gray-700 border-gray-300 hover:bg-gray-50">
              18:30
            </button>
            <button className="p-2 text-sm rounded-md border bg-white text-gray-700 border-gray-300 hover:bg-gray-50">
              19:00
            </button>
            <button className="p-2 text-sm rounded-md border bg-blue-600 text-white border-blue-600">
              19:30
            </button>
          </div>
        </div>

        {/* 메시지 입력 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            추가 메시지 (선택사항)
          </label>
          <textarea
            placeholder="요청사항"
            rows={4}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />
        </div>

        {/* 예약하기 버튼 */}
        <button className="w-full py-3 px-4 rounded-lg font-semibold bg-black text-white hover:bg-blue-700 transition-colors">
          예약하기
        </button>
      </div>
    </div>
  );
}

function ClinicPage() {
  const sectionMenus = ["정보", "리뷰", "예약"]
  const [activeSection, setActiveSection] = useState(sectionMenus[0]);

  const renderContent = () => {
    switch (activeSection) {
      case "정보":
        return (
          <div className="p-6 bg-gray-50 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">병원 정보</h3>
            <div className="space-y-3 text-gray-700">
              <p>
                <strong>진료시간:</strong> 10:00 - 20:00
              </p>
              <p>
                <strong>휴게시간:</strong> 12:00 - 14:00
              </p>
              <p>
                <strong>휴무일:</strong> 일요일, 공휴일
              </p>
              <p>
                <strong>전화번호:</strong> 02-1234-5678
              </p>
              <p>
                <strong>주소:</strong> 서울시 강남구 테헤란로 123
              </p>
            </div>
          </div>
        );
      case "리뷰":
        return (
          <div className="p-6 bg-gray-50 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">환자 리뷰</h3>
            <div className="space-y-4">
              <div className="border-b pb-4">
                <div className="flex items-center mb-2">
                  <span className="text-yellow-500">★★★★★</span>
                  <span className="ml-2 text-sm text-gray-600">김○○</span>
                </div>
                <p className="text-gray-700">
                  친절하고 정확한 진료 받았습니다. 추천해요!
                </p>
              </div>
              <div className="border-b pb-4">
                <div className="flex items-center mb-2">
                  <span className="text-yellow-500">★★★★☆</span>
                  <span className="ml-2 text-sm text-gray-600">박○○</span>
                </div>
                <p className="text-gray-700">
                  대기시간이 조금 길었지만 의료진이 매우 친절했습니다.
                </p>
              </div>
            </div>
          </div>
        );
      case "예약":
        return <ReservationForm />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-[60%] mx-auto flex-1 pt-[10rem] pb-[2rem]">
      <div className="grid grid-cols-1 sm:grid-cols-2 mb-6">
        <h1 className="font-bold text-4xl sm:text-5xl">서울 병원</h1>
      </div>

      {/* 구분선 */}
      <div className="border-b border-gray-300 mb-10" />

      <div className="flex flex-col lg:flex-row gap-8">
        {/* 사이드바 */}
        <SideBar
          menus={sectionMenus}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />

        {/* 메인 콘텐츠 */}
        <div className="flex-1 px-5">{renderContent()}</div>
      </div>
    </div>
  );
}

export default ClinicPage;