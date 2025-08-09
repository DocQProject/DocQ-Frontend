import { Link } from "react-router-dom";
import { useState } from "react";

function NavbarMenu({ url, menuName, subMenu = [] }) {
    const [isActiveSection, setIsActiveSection] = useState(false);
    const isSubMenuActive = isActiveSection && subMenu.length !== 0;

    return (
        <li
            className={`flex items-center h-full ${ isSubMenuActive ? "relative" : ""}`}
            onMouseEnter={() => setIsActiveSection(true)}
            onMouseLeave={() => setIsActiveSection(false)}
        >
            <Link to={url} className="">
                <span
                    className={`font-bold text-2xl px-10 py-3 border-b-4 transition-colors ${isActiveSection ? "text-blue-600 border-blue-600 " : "border-transparent"}`}
                >
                    {menuName}
                </span>
            </Link>

            {isSubMenuActive && (
                <ul className="absolute top-full left-0 flex flex-col justify-center items-center bg-white shadow w-full">
                    {subMenu.map((item, index) => (
                        <li
                            key={index}
                            className="font-bold my-5 mx-3  "

                        >{item}</li>
                    ))}
                </ul>
            )}

        </li>
    );
}

function NavigationBar() {
    return (
        <header className="fixed top-0 left-0 right-0 bg-white shadow px-25 py-5 h-30">
            <nav className="flex flex-row justify-between items-center w-full h-full">
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
                            url="/"
                            menuName="병원"
                            subMenu={["치과", "안과", "이비인후과", "피부과"]} //추후 url도 추가하기
                        />
                    </ul>
                </div>

                <div className="flex flex-row">
                    <form role="search" className="flex max-w-md px-5">
                        <input
                            type="search"
                            placeholder="검색..."
                            aria-label="Search"
                            className="w-full px-3 py-2 border border-gray-300 rounded"
                        />
                    </form>
                    <button className="text-white bg-black px-4 py-2 rounded">
                        검색
                    </button>
                </div>
            </nav>
        </header>
    );
}

export default NavigationBar;