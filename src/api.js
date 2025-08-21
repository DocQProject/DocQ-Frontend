import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
        'Content-Type': 'application/json',
    }
});

export function fetchSignIn(signInInfo) {
    return api.post(
        "/auth/sign-in",
        signInInfo,
    )
}

export function fetchDepartments() {
    const token = localStorage.getItem("accessToken")?.trim();

    return api.get(
        "/clinics/departments",
        {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        },
    )
}

export function fetchPosts() {
    const token = localStorage.getItem("accessToken")?.trim();
    
    return api.get(
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
}

export function fetchSearchClinicByQuery(keyword, currentPage) {
    const token = localStorage.getItem("accessToken")?.trim();
    
    return api.get(
        "/search",
        {
            params : {
                "q": `${keyword}`,
                "page": `${currentPage}`
            },
            headers: {
                "Authorization": `Bearer ${token}`
            },
        },
    )
}