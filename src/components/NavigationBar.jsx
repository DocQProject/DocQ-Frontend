import { Link } from "react-router-dom";

function NavbarMenu({ url, menuName, isSubMenu = false }) {
    return (
        <Link to={url}>
            <span className="font-bold text-2xl px-10 py-10">{menuName}</span>
        </Link>
    );
}

function NavigationBar() {
    return (
        <header className="fixed top-0 left-0 right-0 bg-white shadow px-25 py-5">
            <nav className="flex flex-row justify-between items-center w-full">
                {/* 로고 */}
                <Link to='/'>
                    <img
                        src="src/assets/Doc-Q.png"
                        className="w-20 h-20 me-20"
                        style={{ clipPath: "inset(20% 0 20% 0)" }}
                        alt="icon"
                    />
                </Link>

                <div className="flex flex-1 flex-row">
                    <ul className="flex flex-row">
                        <li>
                            <NavbarMenu
                                url="/"
                                menuName="메인"
                            />
                        </li>
                        <li>
                            <NavbarMenu
                                url="/board"
                                menuName="게시판"
                            />
                        </li>
                        <li>
                            <NavbarMenu
                                url="/mypage"
                                menuName="마이 페이지"
                                isSubMenu="true"
                            />
                        </li>
                        <li>
                            <NavbarMenu
                                url="/"
                                menuName="병원"
                                isSubMenu="true"
                            />
                        </li>
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