export function Pagination({
    num,
    size,
    setCurrentPage,
    currentPage
}) {
    const pageList = [];
    const totalPages = Math.ceil(num / size);

    for (let i = 1; i <= totalPages; i++) {
        pageList.push(i);
    }

    // 다음 페이지 이동   
    const goToNextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    // 이전 페이지 이동
    const goToPrevPage = () => {
        setCurrentPage(currentPage - 1);
    };

    //총 페이지가 1일 경우 이전, 다음 버튼 X
    if (totalPages === 1) {
        return (
            <button className="flex w-scrren mx-auto justify-center text-white bg-black px-4 py-2 rounded" >
                1
            </button>
        );
    }

    return (
        <div className="flex w-screen mx-auto justify-center">
            <button className="text-white bg-black px-4 py-2 rounded" onClick={goToPrevPage} disabled={currentPage === 1}>
                이전
            </button>

            {pageList.map((page) => (
                <button 
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`text-white bg-black px-4 py-2 rounded mx-1 ${currentPage === page ? "active" : ""}`}
                >
                    {page}  
                </button>
            ))}

            <button className="text-white bg-black px-4 py-2 rounded" onClick={goToNextPage} disabled={currentPage === pageList.length}>
                다음
            </button>
        </div>
    );
}
