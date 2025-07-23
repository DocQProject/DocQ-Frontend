function DepartmentIcon({ imageUrl, name }) {
    return (
        <div className="text-center">
            <img
                src={imageUrl}
            />
            <p>{name}</p>
        </div>
    );
}


function MainPage() {
    return (
        <>
            <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow px-6 py-3">
                <div className="flex items-center justify-between w-full max-w-7xl mx-auto">
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
                                className="w-full px-3 py-2 border border-gray-300 rounded"
                            />
                        </form>
                        <button className="text-white bg-black px-4 py-2 rounded">
                            검색
                        </button>
                    </div>

                    {/* 마이페이지 버튼 */}
                    <div>
                        <button className="text-white bg-black px-4 py-2 rounded">
                            마이 페이지
                        </button>
                    </div>
                </div>
            </header>

            {/* 진료과 표시 부분 */}
            <div className=" mt-[150px] ml-120 mr-120">
                <p className="font-bold">진료과로 병원 찾기</p>   
                <div className="shadow-md rounded-lg p-10  flex gap-10 justify-center">
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

        </>
    );
}

export default MainPage;