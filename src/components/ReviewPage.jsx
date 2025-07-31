import { FaRegSta } from 'react-icons/fa';

// 추후 동적으로 수정할 예정입니다. 
function StarRating() {
    return (
        <div className="flex flex-col items-start mx-auto">
            <div className="flex flex-row text-yellow-600 text-5xl">
                <FaRegStar />
                <FaRegStar />
                <FaRegStar />
                <FaRegStar />
                <FaRegStar />
            </div>
        </div>
    );
}

function ImageUpload() {
    {/* 이미지 추가가 완료되면 새로운 이미지 추가 input이 생성되며 추가된 이미지는 화면에 표시되도록 수정할 예정입니다 */ }
    return (
        <label className="inputFileLabel px-5 py-10 border border-gray-500 rounded mt-10" htmlFor="inputForm">
            이미지 추가
            <input
                id='inputForm'
                type="file"
                accept="image/*"
                name="file"
                className="hidden"
            />
        </label>
    );
}

function ReviewPage() {
    return (
        <div className="flex flex-col w-screen h-screen my-auto mx-auto px-50 py-20">
            <h1>리뷰 수정하기</h1>
            <div className="border-b border-gray-300 my-10" />

            <StarRating />

            <div className="flex flex-col items-start mx-auto">
                <input
                    placeholder="제목을 입력하세요."
                    size="100"
                    className="w-full px-3 py-2 border border-gray-300 rounded mt-5"
                />
                <textarea
                    placeholder="내용을 입력하세요."
                    className="w-full h-50 px-3 py-2 border border-gray-300 rounded mt-5"
                />

                <ImageUpload />
            </div>

            <button className="flex items-center mx-auto text-white bg-black px-4 py-2 rounded mt-20">리뷰 수정하기</button>
        </div>
    );
}

export default ReviewPage;