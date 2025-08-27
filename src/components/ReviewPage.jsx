import { useState } from "react";
import { StarRatingInput } from "./common/StarPoint";
import { useNavigate, useLocation } from "react-router-dom";
import { fetchCreateReview } from "../api";

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
    const [clickedStarNum, setClickedStarNum] = useState(0);
    const [reviewContent, setReviewContent] = useState("");
    const [error, setError] = useState({ contentError: "", contentSizeError: ""});
    const location = useLocation();
    const { clinicId } = location.state;
    const navigate = useNavigate();

    function handleSubmitReview() {
        if (clickedStarNum === 0) {
            alert("별점은 반드시 입력되어야 합니다.");
            return;
        }

        fetchCreateReview(clickedStarNum, reviewContent, clinicId)
            .then(() => {
                alert("리뷰 작성에 성공하였습니다.");
                navigate(`/clinic/${clinicId}`);
            })
            .catch((err) => {
                const errorMessages = err.response?.data;
                const errors = {}
                console.log(errorMessages)

                if (err.response?.status === 400) {
                    errorMessages.forEach(element => {
                        if (element.includes("내용")) {
                            errors.contentError = element;
                        }
                        if (element.includes("리뷰")) {
                            errors.contentSizeError = element;
                        }
                    });
                }

                setError(errors);
            })
    }

    return (
        <div className="w-full max-w-10xl mx-auto px-100 flex-1 pt-[10rem] pb-[2rem]">
            <h1 className="font-bold text-3xl">리뷰 작성하기</h1>
            <div className="border-b border-gray-300 my-10" />

            <StarRatingInput setClickedStarNum={setClickedStarNum} />

            <div className="flex flex-col items-start mx-auto">
                <textarea
                    placeholder="내용을 입력하세요. 최소 5자 이상, 200자 이하로 작성해주세요."
                    className="w-full h-50 px-3 py-2 border border-gray-300 rounded mt-5"
                    onChange={(e) => setReviewContent(e.target.value)}
                />
                {
                    error.contentError !== ""
                        ? <p className="font-bold text-red-400 text-sm mt-2">{error.contentError}</p>
                        : ""
                }
                {
                    error.contentSizeError !== ""
                        ? <p className="font-bold text-red-400 text-sm mt-2">{error.contentSizeError}</p>
                        : ""
                }
                <ImageUpload />
            </div>
            <button
                className="flex items-center mx-auto text-white bg-black px-4 py-2 rounded mt-20"
                onClick={handleSubmitReview}
            >리뷰 작성하기</button>
        </div>
    );
}

export default ReviewPage;