import { useState, useEffect, } from "react"
import { fetchDepartments, fetchPosts } from "../api";
import { useNavigate } from "react-router-dom";

function handleNavigateDepartment(name, navigate) {
    navigate(`/search?q=${name}`)
}

function DepartmentIcon({ imageUrl, name, navigate }) {
    return (
        <div
            className="text-center bg-gray-100 px-10 py-5 rounded-lg shadow hover:shadow-md cursor-pointer"
            onClick={() => handleNavigateDepartment(name, navigate)}
        >
            <img
                src={imageUrl}
                className="px-2 py-2"
            />
            <p className="font-bold">{name}</p>
        </div>
    );
}

function Post({ title, author, content, viewCount, createdAt }) {
    return (
        <div className="bg-white border border-gray-200 px-4 py-3 mt-5 rounded-lg shadow-sm hover:shadow-md cursor-pointer">
            <div className="mb-2">
                <h3 className="font-bold mb-3">
                    {title}
                </h3>
                <p className="text-sm">
                    {content}
                </p>
            </div>

            <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center space-x-3">
                    <span className="flex items-center">
                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                        {author}
                    </span>
                    <span className="flex items-center">
                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                        </svg>
                        {viewCount}
                    </span>
                </div>
                <span className="text-gray-400">
                    {createdAt}
                </span>
            </div>
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
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchDepartments(setDepartments)
            .then((res) =>
                setDepartments(res.data.departments)
            )
            .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        fetchPosts()
            .then((res) => {
                //게시글 3개만 가져오기
                console.log(res.data.content);
                const limitedPosts = res.data.content.slice(0, 3);

                setPosts(limitedPosts)
            })
    }, [])

    return (
        <>
            <main>
                {/* 진료과 표시 부분 */}
                <div className="w-full max-w-10xl mx-auto px-100 flex-1 pt-[10rem] pb-[2rem]">
                    <p className="font-bold text-xl mb-5">진료과로 병원 찾기</p>
                    <div className="shadow-md rounded-lg p-10 flex gap-10 justify-center w-full overflow-x-auto scrollbar-hide">
                        {departments.map((department, index) =>
                            <DepartmentIcon
                                key={index}
                                name={department.name}
                                imageUrl={departmentsIcon[index]}
                                navigate={navigate}
                            />
                        )}
                    </div>
                </div>

                {/* 게시글 부분 */}
                <div className=" w-full max-w-10xl mx-auto px-100 mb-10">
                    <p className="font-bold text-xl mt-5 mb-5">게시글</p>
                    <div className="shadow-md rounded-lg p-10 ">
                        {
                            posts.length === 0 ? <p>게시글이 존재하지 않습니다.</p> :

                                posts.map((post, index) => (
                                    <Post
                                        key={index}
                                        title={post.title}
                                        author={post.author}
                                        content={post.content}
                                        viewCount={post.viewCount}
                                        createdAt={post.createdAt.replace("T", " ")}
                                    />
                                ))}
                    </div>
                </div>
            </main>
        </>
    );
}

export default MainPage;