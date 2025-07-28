import { useState } from 'react';
import { MainHeader } from './MainPage'
import { Pagination } from './Pagenation';

function ClinicData({ name, address, department, open, close, starPoint }) {
    return (
        <div className="flex flex-col items-center w-screen mx-auto mb-15">
            <div className="shadow-md rounded-lg p-10 px-10 w-[800px] h-[300px]">
                <h2 className="font-bold text-5xl">{name} <span className="text-xl">{starPoint}</span></h2>
                <p className="mt-5 text-2xl"> {open} ~ {close}</p>
                <p className="mt-5 text-2xl">{address}</p>
                <p className="mt-5 text-2xl">{department}</p>
            </div>
        </div>
    );
}
function ClinicSearchResultPage() {
    const [currentPage, setCurrentPage] = useState(1);
    return (
        <>
            <MainHeader />

            <main className="flex-1 overflow-y-auto pt-[8rem] pb-[5rem]">
                {/* 예시 */}
                <ClinicData
                    name="밝은 성모 안과"
                    address="주소"
                    department="안과"
                    open="09:00"
                    close="16:30"
                    starPoint="별점: 4"
                />
            </main>

            {/* 추후 백엔드 연동 시 num, size 수정*/}
            <footer className="flex fixed bottom-5 left-0 right-0">
                <Pagination
                    num="1"
                    size="1"
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
            </footer>
        </>
    );
}

export default ClinicSearchResultPage;