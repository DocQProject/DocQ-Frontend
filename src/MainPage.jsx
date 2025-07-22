function MainPage() {
    return (
        <>
            <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow px-6 py-3">
                <div className="flex items-center justify-between w-full max-w-7xl mx-auto">
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

                    <div>
                        <button className="text-white bg-black px-4 py-2 rounded">
                            마이 페이지
                        </button>
                    </div>
                </div>
            </header>

            <img
                className="dentalLogo"
                src="https://img.icons8.com/?size=100&id=m0Jn3S6j3Tev&format=png&color=000000"
            />
            <p>치과</p>
            <img
                className="eyeClinic"
                src="https://img.icons8.com/?size=100&id=SfoGooXDPPeC&format=png&color=000000"
            />
            <p>안과</p>
            <img
                className="ent"
                src="https://img.icons8.com/?size=100&id=23292&format=png&color=000000"
            />
            <p>이비인후과</p>
            <img
                className="dermatology"
                src="https://img.icons8.com/?size=100&id=79381&format=png&color=000000"
            />
            <p>피부과</p>
        </>
    );
}

export default MainPage;