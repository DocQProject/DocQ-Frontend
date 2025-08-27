import { useState, useEffect } from "react"
import SideBar from "./SideBar"
import { useNavigate, useParams } from "react-router-dom"
import { fetchClinicInfo, fetchReview } from "../api"
import { StarRatingDisplay } from "./common/StarPoint"
import { useInfiniteQuery } from "@tanstack/react-query"
import { useInView } from "react-intersection-observer"

function ReservationForm() {
  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-sm border">
      <h2 className="text-2xl font-semibold mb-6 text-center">예약하기</h2>

      <div className="space-y-6">
        {/* 날짜 선택 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">예약 날짜</label>
          <input
            type="date"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <input
            type="date"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* 시간 선택 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">예약 시간</label>
          <div className="grid grid-cols-3 gap-2 max-h-64 overflow-y-auto p-2 border border-gray-200 rounded-lg">
            {/* 10:00-12:00 시간대 */}
            <button className="p-2 text-sm rounded-md border bg-white text-gray-700 border-gray-300 hover:bg-gray-50">
              10:00
            </button>
            <button className="p-2 text-sm rounded-md border bg-white text-gray-700 border-gray-300 hover:bg-gray-50">
              10:30
            </button>
            <button className="p-2 text-sm rounded-md border bg-white text-gray-700 border-gray-300 hover:bg-gray-50">
              11:00
            </button>
            <button className="p-2 text-sm rounded-md border bg-white text-gray-700 border-gray-300 hover:bg-gray-50">
              11:30
            </button>

            {/* 휴게시간 표시 */}
            <div className="col-span-3 text-center text-sm text-gray-400 py-2 border-t border-b border-gray-200 my-2">
              휴게시간 (12:00 - 14:00)
            </div>

            {/* 14:00-20:00 시간대 */}
            <button className="p-2 text-sm rounded-md border bg-white text-gray-700 border-gray-300 hover:bg-gray-50">
              14:00
            </button>
            <button className="p-2 text-sm rounded-md border bg-white text-gray-700 border-gray-300 hover:bg-gray-50">
              14:30
            </button>
            <button className="p-2 text-sm rounded-md border bg-white text-gray-700 border-gray-300 hover:bg-gray-50">
              15:00
            </button>
            <button className="p-2 text-sm rounded-md border bg-white text-gray-700 border-gray-300 hover:bg-gray-50">
              15:30
            </button>
            <button className="p-2 text-sm rounded-md border bg-white text-gray-700 border-gray-300 hover:bg-gray-50">
              16:00
            </button>
            <button className="p-2 text-sm rounded-md border bg-white text-gray-700 border-gray-300 hover:bg-gray-50">
              16:30
            </button>
            <button className="p-2 text-sm rounded-md border bg-white text-gray-700 border-gray-300 hover:bg-gray-50">
              17:00
            </button>
            <button className="p-2 text-sm rounded-md border bg-white text-gray-700 border-gray-300 hover:bg-gray-50">
              17:30
            </button>
            <button className="p-2 text-sm rounded-md border bg-white text-gray-700 border-gray-300 hover:bg-gray-50">
              18:00
            </button>
            <button className="p-2 text-sm rounded-md border bg-white text-gray-700 border-gray-300 hover:bg-gray-50">
              18:30
            </button>
            <button className="p-2 text-sm rounded-md border bg-white text-gray-700 border-gray-300 hover:bg-gray-50">
              19:00
            </button>
            <button className="p-2 text-sm rounded-md border bg-blue-600 text-white border-blue-600">19:30</button>
          </div>
        </div>

        {/* 메시지 입력 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">추가 메시지 (선택사항)</label>
          <textarea
            placeholder="요청사항"
            rows={4}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />
        </div>

        {/* 예약하기 버튼 */}
        <button className="w-full py-3 px-4 rounded-lg font-semibold bg-black text-white hover:bg-blue-700 transition-colors">
          예약하기
        </button>
      </div>
    </div>
  )
}

function ReviewForm({ author, content, imageURLs, createdAt, rating }) {
  return (
    <div className="pb-4 shadow-md rounded-lg px-5 py-3">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <StarRatingDisplay rating={rating} />
          <span className="font-bold ml-2 text-sm text-gray-600">{author}</span>
        </div>
        <span className="text-xs text-gray-400">{createdAt}</span>
      </div>
      <div className="flex flex-row gap-4 py-5">
        {imageURLs.map((image, index) => (
          <img key={index} src={image || "/placeholder.svg"}></img>
        ))}
      </div>
      <p className="text-gray-700">{content}</p>
    </div>
  )
}

function ClinicPage() {
  const sectionMenus = ["정보", "리뷰", "예약"]
  const [activeSection, setActiveSection] = useState(sectionMenus[0])
  const [clinicData, setClinicData] = useState([])
  const clinicParam = useParams()
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status, error } = useInfiniteQuery({
    queryKey: ["reviews", clinicParam.id],
    queryFn: ({ pageParam }) => fetchReview(pageParam, clinicParam),
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = lastPage.data.page.number + 1
      return nextPage <= lastPage.data.page.totalPages ? nextPage : undefined
    },
    initialPageParam: 0,
  })
  const { ref, inView } = useInView()
  const navigate = useNavigate()

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      console.log("Fetching next page...")
      fetchNextPage()
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage])

  useEffect(() => {
    fetchClinicInfo(clinicParam.id)
      .then((res) => {
        console.log(res.data.reviews)
        setClinicData(res.data)
      })
      .catch((err) => {
        console.log()
        console.log("Error details:", err)
        console.log("Error response:", err.response)
        console.log("Clinic ID:", clinicParam.id)
        alert("알 수 없는 오류가 발생했습니다. 다시 시도해주세요.")
      })
  }, [clinicParam.id])

  const renderContent = () => {
    switch (activeSection) {
      case "정보":
        return (
          <div className="p-6 bg-gray-50 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">병원 정보</h3>
            <div className="space-y-3 text-gray-700">
              <p>
                <strong>진료시간:</strong> {clinicData.openTime} - {clinicData.closeTime}
              </p>
              <p>
                <strong>주소:</strong> {clinicData.address}
              </p>
            </div>
          </div>
        )
      case "리뷰":
        return (
          <div className="p-6 bg-gray-50 rounded-lg">
            {data?.pages[0]?.data?.page?.totalElements === 0 ? (
              <>
                <h3 className="text-xl font-semibold mb-4">환자 리뷰</h3>
                <p className="font-bold">리뷰가 존재하지 않습니다. </p>
              </>
            ) : (
              <>
                <div className="flex flex-row">
                  <h3 className="text-xl font-semibold mb-4">환자 리뷰: {data?.pages[0]?.data?.page?.totalElements}</h3>
                  <button 
                    className="text-white ml-auto bg-black px-4 rounded"
                    onClick={() => navigate("/review", {state: {clinicId: clinicParam.id}})}
                  > 리뷰 작성하기</button>
                </div>
                <div className="space-y-4">
                  {data?.pages
                    ?.flatMap((page) => page.data.content)
                    .map((review, index) => (
                      <ReviewForm
                        key={`${review.id || index}`}
                        author={review.author}
                        content={review.content}
                        imageURLs={review.imageURLs}
                        createdAt={review.createdAt}
                        rating={review.starPoint}
                      />
                    ))}
                  {<div ref={ref} />}
                </div>
              </>
            )}
          </div>
        )
      case "예약":
        return <ReservationForm />
      default:
        return null
    }
  }

  return (
    <div className="w-full max-w-[60%] mx-auto flex-1 pt-[10rem] pb-[2rem]">
      <div className="grid grid-cols-1 sm:grid-cols-2 mb-6">
        <h1 className="font-bold text-4xl sm:text-5xl">{clinicData.name}</h1>
      </div>

      {/* 구분선 */}
      <div className="border-b border-gray-300 mb-10" />

      <div className="flex flex-col lg:flex-row gap-8">
        {/* 사이드바 */}
        <SideBar menus={sectionMenus} activeSection={activeSection} setActiveSection={setActiveSection} />

        {/* 메인 콘텐츠 */}
        <div className="flex-1 px-5">{renderContent()}</div>
      </div>
    </div>
  )
}

export default ClinicPage
