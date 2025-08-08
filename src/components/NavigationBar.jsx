import { Link } from "react-router-dom";

function NavigationBar() {
    return (
        <header className="fixed top-0 left-0 right-0 bg-white shadow px-6 py-5">
            <nav className="flex flex-row justify-center items-center">
                {/* 로고 */}
                <Link to='/'>
                    <img
                        src="src/assets/Doc-Q.png"
                        className="w-20 h-20 me-20"
                        style={{ clipPath: "inset(20% 0 20% 0)" }}
                        alt="icon"
                    />
                </Link>

                {/* home */}
                <Link to='/'>
                    <span className="font-bold text-2xl mr-10">메인</span>
                </Link>

                {/* 게시판 */}
                <Link to='/board'>
                    <span className="font-bold text-2xl mr-10">게시판</span>
                </Link>

                {/* 마이페이지 */}
                <Link to='/mypage'>
                    <span className="font-bold text-2xl mr-10">마이 페이지</span>
                </Link>

                {/* 병원 */}
                <p>
                    <span className="font-bold text-2xl mr-10">병원</span>
                </p>


                <form role="search" className="flex flex-1 max-w-md">
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
            </nav>
        </header>
    );
}

export default NavigationBar;