import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchUserInfo } from "../../api";

function NavbarMenu({ url, menuName, subMenu = [] }) {
  const [isActiveMainSection, setIsActiveMainSection] = useState(false);
  const [isActiveSubSection, setIsActiveSubSection] = useState("");
  const navigate = useNavigate();
  const isSubMenuActive = isActiveMainSection && subMenu.length !== 0;

  return (
    <li
      className={`flex items-center h-full ${isSubMenuActive ? "relative" : ""}`}
      onMouseEnter={() => setIsActiveMainSection(true)}
      onMouseLeave={() => setIsActiveMainSection(false)}
    >
      {/* 메인 메뉴 클릭 */}
      <Link to={url}>
        <span
          className={`font-bold text-2xl px-10 py-3 border-b-4 transition-colors ${
            isActiveMainSection
              ? "text-blue-600 border-blue-600"
              : "border-transparent"
          }`}
        >
          {menuName}
        </span>
      </Link>

      {/* 서브 메뉴 */}
      {isSubMenuActive && (
        <ul className="absolute top-full left-0 flex flex-col justify-center items-center bg-white shadow w-full">
          {subMenu.map((item, index) => (
            <li
              key={index}
              className="font-bold my-5 cursor-pointer"
              onMouseEnter={() => setIsActiveSubSection(index)}
              onMouseLeave={() => setIsActiveSubSection("")}
              onClick={() => navigate(item.url)} // 🔹 클릭 시 navigate
            >
              <span
                className={`py-3 border-b-2 transition-colors ${
                  isActiveSubSection === index
                    ? "text-blue-600 border-blue-600"
                    : "border-transparent"
                }`}
              >
                {item.name}
              </span>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

function NavigationBar() {
  const [user, setUser] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState("");
  const navigate = useNavigate();

  // 로그인 유저 정보 fetch
  useEffect(() => {
    fetchUserInfo()
      .then((res) => setUser(res.data))
      .catch((err) => console.error("유저 정보 불러오기 실패:", err));
  }, []);

  const handleSearchSubmit = (keyword) => {
    if (!keyword) return;
    navigate(`/search?q=${keyword}`);
  };

  const myPageSubMenu = user
    ? [
        { name: "내 정보", url: "/mypage?section=profile" },
        { name: "내 예약", url: "/mypage?section=reservations" },
        ...(user.role === "ROLE_DOCTOR" ? [{ name: "내 병원", url: "/mypage?section=clinic" }] : []),
      ]
    : [];

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow px-25 py-5 h-30 z-50">
      <nav className="grid grid-cols-[1fr_2fr_1fr] items-center w-full h-full">
        {/* 로고 */}
        <Link to="/">
          <img
            src="src/assets/Doc-Q.png"
            className="w-20 h-20 me-20"
            style={{ clipPath: "inset(20% 0 20% 0)" }}
            alt="icon"
          />
        </Link>

        {/* 메뉴 */}
        <div className="flex flex-1 flex-row h-full">
          <ul className="flex flex-row h-full">
            <NavbarMenu url="/" menuName="메인" />
            <NavbarMenu url="/board" menuName="게시판" />
            {user && <NavbarMenu url="/mypage" menuName="마이 페이지" subMenu={myPageSubMenu} />}
            <NavbarMenu
              url="/clinic"
              menuName="병원"
              subMenu={[
                { name: "치과", url: "/search?q=치과" },
                { name: "안과", url: "/search?q=안과" },
                { name: "이비인후과", url: "/search?q=이비인후과" },
                { name: "피부과", url: "/search?q=피부과" },
              ]}
            />
          </ul>
        </div>

        {/* 검색 */}
        <div className="flex flex-row py-5">
          <input
            type="search"
            placeholder="검색..."
            aria-label="Search"
            value={searchKeyword}
            className="w-full px-3 py-2 border border-gray-300 rounded mx-5"
            onChange={(e) => setSearchKeyword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearchSubmit(searchKeyword)}
          />
          <button
            className="text-white bg-black px-4 py-2 rounded whitespace-nowrap"
            onClick={() => handleSearchSubmit(searchKeyword)}
          >
            검색
          </button>
        </div>
      </nav>
    </header>
  );
}

export default NavigationBar;