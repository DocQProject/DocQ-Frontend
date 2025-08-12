import axios from "axios";
import { useState, useEffect } from "react"

const token = "eyJhbGciOiJIUzUxMiJ9.eyJpZCI6NSwibG9naW5JZCI6IuyVhOydtOuUlCIsIm5hbWUiOiLshJzsp4Dsm5AiLCJyb2xlIjoiUk9MRV9BRE1JTiIsImV4cCI6MTc1NTAyNDEzOSwiaWF0IjoxNzU0OTgwOTM5fQ.So70bfnAhTffjVLaFNHXXu2WNSOyNwK0FuqvI3WK6Vvd_lYvrPhvlU2kh9ZauYl9502nzxoezchhUdLibI6azQ"

function fetchDepartments() {
    return axios.get(
        "http://localhost:8080/api/clinics/departments", {
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    })
}

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
        fetchDepartments()
            .then((res) =>
                setDepartments(res.data.departments)
            )
            .catch(err => console.log(err));
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