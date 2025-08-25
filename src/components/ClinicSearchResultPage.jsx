
import { useEffect, useState } from 'react';
import { Pagination } from './Pagenation';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { fetchSearchClinicByQuery } from '../api';
import { Pagination } from './common/Pagenation';

function ClinicData({ id, name, address, department, open, close, starPoint }) {
    const navigate = useNavigate();
    return (
        <div className="flex justify-center w-full px-4 mb-10">
            <div
                className="w-full md:w-[750px] bg-white rounded-2xl shadow-md p-8 border border-gray-200 hover:shadow-lg transition-shadow duration-300"
                onClick={() => navigate(`/clinic/${id}`)}
            >

                {/* 병원명 + 별점 */}
                <div className="flex items-center justify-between border-b pb-3 mb-4">
                    <h2 className="font-bold text-3xl text-gray-800">{name}</h2>
                    <span className="text-lg font-semibold">
                        ⭐ 평균 평점: {starPoint ?? "N/A"}
                    </span>
                </div>

                {/* 상세 정보 */}
                <div className="space-y-3 text-gray-700 text-lg">
                    <p><span className="font-semibold text-gray-800">영업 시간:</span> {open} ~ {close}</p>
                    <p><span className="font-semibold text-gray-800">주소:</span> {address}</p>
                    <p><span className="font-semibold text-gray-800">진료과:</span> {department}</p>
                </div>
            </div>
        </div>
    );
}

function ClinicSearchResultPage() {
    const [currentPage, setCurrentPage] = useState(0);
    const [searchResult, setSearchResult] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const keyword = searchParams.get("q");
        fetchSearchClinicByQuery(keyword, currentPage)
            .then((res) => {
                console.log(res.data);
                setTotalPages(res.data.page.totalPages)
                setSearchResult(res.data.content)
            })
    }, [searchParams, currentPage])

    return (
        <>
            <main className="flex-1 overflow-y-auto pt-[10rem] pb-[5rem]">
                {
                    searchResult.length === 0 ?
                        <p className='flex justify-center items-center text-2xl font-bold'>검색 결과가 존재하지 않습니다.</p>
                        : searchResult.map((result, index) =>
                            <ClinicData
                                key={index}
                                id={result.clinicId}
                                name={result.name}
                                address={result.address}
                                department={result.department}
                                open={result.openTime}
                                close={result.closeTime}
                                starPoint={result.starPoint}
                            />
                        )
                }
            </main>

            <div className="fixed bottom-0 left-0 right-0 bg-white shadow px-25 py-5 h-30">
                <Pagination
                    totalPages={totalPages}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
            </div>
        </>
    );
}

export default ClinicSearchResultPage;