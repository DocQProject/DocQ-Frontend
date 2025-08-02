function DepartmentIcon({ imageUrl, name }) {
    return (
        <div className="text-center bg-gray-200 px-10 py-7 rounded-lg shadow">
            <img
                src={imageUrl}
            />
            <p className="font-bold">{name}</p>
        </div>
    );
}

// todo: 버튼 event 추가하기
function ButtonStyle({ name }) {
    return (
        <button className="text-white bg-black px-4 py-2 rounded">
            {name}
        </button>
    );
}

export function MainHeader() {
    return (
        <header className="fixed top-0 left-0 right-0 bg-white shadow px-6 py-5">
            <div className="flex w-screen mx-auto px-10">
                {/* 검색 */}
                <div className="flex items-center gap-4 flex-1 justify-center">
                    <a href="/">
                        <img
                            className="w-8 h-8"
                            src="https://img.icons8.com/?size=100&id=81644&format=png&color=000000"
                            alt="logo"
                        />
                    </a>
                    <form role="search" className="flex flex-1 max-w-md">
                        <input
                            type="search"
                            placeholder="검색..."
                            aria-label="Search"
                            className="w-screen px-3 py-2 border border-gray-300 rounded"
                        />
                    </form>
                    <ButtonStyle
                        name="검색"
                    />
                </div>

                {/* 마이페이지 버튼 */}
                <div>
                    <ButtonStyle
                        name="마이 페이지"
                    />
                </div>
            </div>
        </header>
    );
}


function MainPage() {
    return (
        <>
            <MainHeader />

            <main>
                {/* 진료과 표시 부분 */}
                <div className="w-screen mx-auto px-20 flex-1 overflow-y-auto pt-[8rem] pb-[5rem]">
                    <p className="font-bold mb-10">진료과로 병원 찾기</p>
                    <div className="shadow-md rounded-lg p-10 flex gap-10 justify-center">
                        <DepartmentIcon
                            name="치과"
                            imageUrl={"https://img.icons8.com/?size=100&id=m0Jn3S6j3Tev&format=png&color=000000"}
                        />
                        <DepartmentIcon
                            name="안과"
                            imageUrl={"https://img.icons8.com/?size=100&id=SfoGooXDPPeC&format=png&color=000000"}
                        />
                        <DepartmentIcon
                            name="이비인후과"
                            imageUrl={"https://img.icons8.com/?size=100&id=23292&format=png&color=000000"}
                        />
                        <DepartmentIcon
                            name="피부과"
                            imageUrl={"https://img.icons8.com/?size=100&id=79381&format=png&color=000000"}
                        />
                    </div>
                </div>

                {/* 인기 게시글 부분 */}
                <div className=" w-screen mx-auto px-20">
                    <p className="font-bold mb-10">인기 게시글</p>
                    <div className="shadow-md rounded-lg p-10 flex gap-10 justify-center">
                        {/* todo: 게시글  표시 부분 추가하기*/}
                    </div>
                </div>
            </main>
        </>
    );
}

export default MainPage;