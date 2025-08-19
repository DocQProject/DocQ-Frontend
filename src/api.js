import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
        'Content-Type': 'application/json',
    }
});

export function fetchSignIn(signInInfo, setErrors, navigate) {
    api.post(
        "/auth/sign-in",
        signInInfo,
    )
        .then((res) => {
            localStorage.setItem("accessToken", res.data.token.trim()),
            setErrors({ loginIdError: "", passwordError: "", globalError: "" }),
            navigate("/");
        })
        .catch(err => {
            const errorMessages = err.response?.data;
            const Errors = {};

            //잘못된 로그인 정보를 입력한 경우
            if (err.response?.status === 404 || err.response?.status === 401) {
                Errors.globalError = "아이디 혹은 비밀번호가 일치하지 않습니다.";
            }

            //유효성 검증이 실패한 경우
            if (err.response?.status === 400) {

                errorMessages.forEach(element => {
                    if (element.includes("아이디")) {
                        Errors.loginIdError = element;
                    }
                    if (element.includes("비밀번호")) {
                        Errors.passwordError = element;
                    }
                });
            }

            setErrors(prev => ({ ...prev, ...Errors }));
        })
}

export function fetchDepartments(setDepartments) {
    const token = localStorage.getItem("accessToken")?.trim();

    api.get(
        "/clinics/departments",
        {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        },

    )
        .then((res) =>
            setDepartments(res.data.departments)
        )
        .catch(err => console.log(err));
}

export function fetchPosts(setPosts) {
    const token = localStorage.getItem("accessToken")?.trim();
    
    api.get(
        "/posts",
        {
            params : {
                "sort": "createdAt,desc"
            },
            headers: {
                "Authorization": `Bearer ${token}`
            },
        },

    )
        .then((res) => {
            //게시글 3개만 가져오기
            console.log(res.data.content);
            const limitedPosts = res.data.content.slice(0, 3);

            setPosts(limitedPosts)
        }
        )
}

// MyPage
export async function fetchUserInfo() {
    const token = localStorage.getItem("accessToken").trim();
    return api.get('/users/me',
                {
            headers: { 
                "Content-Type": "application/json", 
                "Authorization": `Bearer ${token}`
            }
        },
    )
}

export const updateUserInfo = (formData) => {
    const token = localStorage.getItem("accessToken").trim();
    return api.patch('/users/profile', formData, {
        headers: { 
            "Content-Type": "application/json", 
            "Authorization": `Bearer ${token}`
        }
    });
}