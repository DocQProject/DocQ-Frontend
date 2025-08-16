import { useState, useEffect } from "react"
import { fetchDepartments } from "../api";

function DepartmentIcon({ imageUrl, name }) {
    return (
        <div className="text-center bg-gray-200 px-10 py-7 rounded-lg shadow">
            <img
                src={imageUrl}
            />
            <p className="font-bold">{name}</p>
        </div>
    );
}

function MainPage() {
    const departmentsIcon = [
        "https://img.icons8.com/?size=100&id=m0Jn3S6j3Tev&format=png&color=000000",
        "https://img.icons8.com/?size=100&id=SfoGooXDPPeC&format=png&color=000000",
        "https://img.icons8.com/?size=100&id=23292&format=png&color=000000",
        "https://img.icons8.com/?size=100&id=79381&format=png&color=000000",
    ]

    const [departments, setDepartments] = useState([]);

    useEffect(() => {
        fetchDepartments(setDepartments)
    }, []);

    return (
        <>
            <main>
                {/* 진료과 표시 부분 */}
                <div className="w-screen mx-auto px-100 flex-1 pt-[10rem] pb-[5rem]">
                    <p className="font-bold text-xl mb-10">진료과로 병원 찾기</p>
                    <div className="shadow-md rounded-lg p-10 flex gap-10 justify-center w-full overflow-x-auto scrollbar-hide">
                        {departments.map((department, index) =>
                            <DepartmentIcon
                                key={index}
                                name={department.name}
                                imageUrl={departmentsIcon[index]}
                            />
                        )}
                    </div>
                </div>

                {/* 인기 게시글 부분 */}
                <div className=" w-screen mx-auto px-100">
                    <p className="font-bold text-xl mb-10">인기 게시글</p>
                    <div className="shadow-md rounded-lg p-10 flex gap-10 justify-center">
                        {/* todo: 게시글  표시 부분 추가하기*/}
                    </div>
                </div>
            </main>
        </>
    );
}

export default MainPage;