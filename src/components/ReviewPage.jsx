import { useState } from "react";
import { StarRatingInput } from "./common/StarPoint";
import { useNavigate, useLocation } from "react-router-dom";
import { fetchCreateImage, fetchCreateReview } from "../api";

function ImageUpload({ imgPath, setImgPath }) {
    function addImage(e) {
        const files = Array.from(e.target.files);
        setImgPath(prev => [...prev, ...files]);

        e.target.value = "";
    }

    function handleDeleteImage(index) {
        setImgPath(prev => prev.filter((file, i) => i !== index));
    }

    return (
        <div className="flex flex-row mt-10 gap-3">
            {
                imgPath.map((file, index) => (
                    <div key={index} className="relative">
                        <img
                            src={URL.createObjectURL(file)}
                            alt="사진"
                            className="w-30 h-30 object-cover rounded cursor-pointer"
                        />
                        <button
                            type="button"
                            className="absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full px-1"
                            onClick={() => handleDeleteImage(index)}
                        >
                            X
                        </button>
                    </div>
                ))
            }
            <label
                className="inputFileLabel px-5 py-10 border border-gray-500 rounded"
                htmlFor="inputForm"
            >
                이미지 추가
                <input
                    id='inputForm'
                    type="file"
                    accept="image/*"
                    name="file"
                    className="hidden"
                    onChange={(e) => addImage(e)}
                />
            </label>
        </div>
    );
}

function ReviewPage() {
    const [clickedStarNum, setClickedStarNum] = useState(0);
    const [reviewContent, setReviewContent] = useState("");
    const [imgPath, setImgPath] = useState([]);
    const [error, setError] = useState({ contentError: "", contentSizeError: "" });
    const location = useLocation();
    const { clinicId } = location.state;
    const navigate = useNavigate();

    function handleSubmitReview() {
        if (clickedStarNum === 0) {
            alert("별점은 반드시 입력되어야 합니다.");
            return;
        }

        //리뷰 작성
        fetchCreateReview(clickedStarNum, reviewContent, clinicId)
            .then((res) => {
                alert("리뷰 작성에 성공하였습니다.");
                const newReviewId = res.data.reviewId;

                // 이미지 업로드 끝난 후 페이지 이동
                return Promise.all(imgPath.map(file => fetchCreateImage(file, newReviewId)));
            })
            .then(() => {
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

        //이미지 업로드
        imgPath.map((file) => {
            fetchCreateImage(file, reviewId)
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
                <ImageUpload
                    imgPath={imgPath}
                    setImgPath={setImgPath}
                />
            </div>
            <button
                className="flex items-center mx-auto text-white bg-black px-4 py-2 rounded mt-20"
                onClick={handleSubmitReview}
            >리뷰 작성하기</button>
        </div>
    );
}

export default ReviewPage;