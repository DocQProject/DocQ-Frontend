import axios from "axios";
import { useState, useEffect } from "react"

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
    const [departments, setDepartments] = useState([]);
    const token = "eyJhbGciOiJIUzUxMiJ9.eyJpZCI6NSwibG9naW5JZCI6IuyVhOydtOuUlCIsIm5hbWUiOiLshJzsp4Dsm5AiLCJyb2xlIjoiUk9MRV9BRE1JTiIsImV4cCI6MTc1NDkzMzIxMSwiaWF0IjoxNzU0ODkwMDExfQ.A9C7_-WFhkMiWhoXSldtCnzTZr2Hd53rypE_2gpXroW0EGhau-QWIMCd7jqJaeAphp-GOPqnkl-lIyjoIhQGfg"

    useEffect(() => {
        axios.get(
            "http://localhost:8080/api/clinics/departments", {
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        }
        )
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
                                imageUrl={department.icon}
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