import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function navigateBySubMenu(item, navigate) {
    navigate(`/search?q=${item}`)
}

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
            <Link to={url} className="">
                <span
                    className={`font-bold text-2xl px-10 py-3 border-b-4 transition-colors ${isActiveMainSection ? "text-blue-600 border-blue-600 " : "border-transparent"}`}
                >
                    {menuName}
                </span>
            </Link>

            {isSubMenuActive && (
                <ul className="absolute top-full left-0 flex flex-col justify-center items-center bg-white shadow w-full">
                    {subMenu.map((item, index) => (
                        <li
                            key={index}
                            className="font-bold my-5 cursor-pointer"
                            onMouseEnter={() => setIsActiveSubSection(index)}
                            onMouseLeave={() => setIsActiveSubSection("")}
                            onClick={() => navigateBySubMenu(item, navigate)}
                        >
                            <span className={`py-3 border-b-2 transition-colors ${isActiveSubSection === index ? "text-blue-600 border-blue-600 " : "border-transparent"}`}>
                                {item}
                            </span>
                        </li>
                    ))}
                </ul>
            )}

        </li>
    );
}

function NavigationBar() {
    const [searchKeyword, setSearchKeyword] = useState("")
    const navigate = useNavigate();

    function handleSearchSubmit(searchKeyword, navigate) {
        navigate(`/search?q=${searchKeyword}`)
    }

    return (
        <header className="fixed top-0 left-0 right-0 bg-white shadow px-25 py-5 h-30">
            <nav className="grid grid-cols-[1fr_2fr_1fr] items-center w-full h-full">
                {/* 로고 */}
                <Link to='/'>
                    <img
                        src="src/assets/Doc-Q.png"
                        className="w-20 h-20 me-20"
                        style={{ clipPath: "inset(20% 0 20% 0)" }}
                        alt="icon"
                    />
                </Link>

                <div className="flex flex-1 flex-row h-full">
                    <ul className="flex flex-row h-full">
                        <NavbarMenu
                            url="/"
                            menuName="메인"
                        />
                        <NavbarMenu
                            url="/board"
                            menuName="게시판"
                        />

                        <NavbarMenu
                            url="/mypage"
                            menuName="마이 페이지"
                            subMenu={["내 정보", "내 예약", "내 병원"]} //추후 url도 추가하기
                        />

                        <NavbarMenu
                            url="/clinic"
                            menuName="병원"
                            subMenu={["치과", "안과", "이비인후과", "피부과"]}
                        />
                    </ul>
                </div>

                <div className="flex flex-row py-5">
                    <input
                        type="search"
                        placeholder="검색..."
                        aria-label="Search"
                        value={searchKeyword}
                        className="w-full px-3 py-2 border border-gray-300 rounded mx-5"
                        onChange={e => setSearchKeyword(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" ? handleSearchSubmit(searchKeyword, navigate) : null}
                    />
                    <button
                        className="text-white bg-black px-4 py-2 rounded whitespace-nowrap"
                        onClick={() => {
                            handleSearchSubmit(searchKeyword, navigate)
                        }}
                    >
                        검색
                    </button>
                </div>
            </nav>
        </header>
    );
}

export default NavigationBar;