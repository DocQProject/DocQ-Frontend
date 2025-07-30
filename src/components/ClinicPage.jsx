//정보 라벨 클릭 시 보이는 정보
function ClinicData({ address, department, open, close }) {
    return (
        <div className="flex flex-col">
            <p className="text-2xl">
                <span className="font-bold">진료 시간: </span>
                {open} ~ {close}
            </p>
            <p className="mt-10 text-2xl">
                <span className="font-bold">주소: </span>
                {address}
            </p>
            <p className="mt-10 text-2xl">
                <span className="font-bold">진료과: </span>
                {department}
            </p>
        </div>
    );
}

//리뷰 라벨 클릭 시 보이는 정보
function ReviewData({image, name, starPoint, content }) {
    return (
        <div className="shadow-md rounded-lg p-10 px-10 md:w-[800px] md:h-[500px] mt-10">
            <p className="text-2xl"> {name} </p>
            <p className="text-2xl mt-3"> {starPoint} </p>
            <p className="text-2xl mt-10"> {content} </p>
            <img
                className="mt-10"
                src="data:image/png;base64,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"
            />
        </div>
    );
}

function ClinicPage() {
    return (
        <>
            <div className="flex flex-col w-screen h-screen my-auto mx-auto px-50 py-20">
                <div className="grid grid-cols-2 ">
                    <div>
                        <h1>서울 병원</h1>
                    </div>
                    <button className="text-white bg-black mx-30 rounded">예약하기</button>
                </div>

                {/* 구분선 */}
                <div className="border-b border-gray-300 my-10" />

                <div className="grid grid-cols-[16%_1fr] mt-10">
                    <aside className="flex flex-col">
                        <label className="text-3xl">정보</label>
                        <label className="text-3xl mt-10">리뷰</label>
                    </aside>

                    {/* 추후 동적으로 설정 예정 */}
                    {/* <ClinicData
                        address="서울"
                        department="안과"
                        open="09:00"
                        close="16:30"
                    /> */}

                    {/* <div className="flex flex-col">
                        <p className="font-bold text-4xl">최근 리뷰: 1000개</p>
                        <ReviewData
                            image="이미지"
                            name="리뷰어"
                            starPoint="⭐⭐⭐⭐⭐"
                            content="친절해요"
                        />
                    </div> */}
                </div>

            </div>
        </>
    );
}

export default ClinicPage;