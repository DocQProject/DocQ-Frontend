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

// MyPage

// Profile 관련 API
export function fetchUserInfo() {
    const token = localStorage.getItem("accessToken").trim();
    return api.get('/users/me',
                {
            headers: { 
                "Authorization": `Bearer ${token}`
            }
        },
    )
}

export const updateUserInfo = (formData) => {
    const token = localStorage.getItem("accessToken").trim();
    return api.patch('/users/profile', formData, {
        headers: { 
            "Authorization": `Bearer ${token}`
        }
    });
}

// Reservation 관련 API
export const fetchReservations = () => {
    const token = localStorage.getItem("accessToken").trim();
    return api.get('/reservations/me', {
        headers: { 
            "Authorization": `Bearer ${token}`
        }
    });
}

// 병원 관련 API
export const fetchMyClinicInfo = () => {
    const token = localStorage.getItem("accessToken").trim();
    return api.get('/clinics/my-clinic', {
        headers: { 
            "Authorization": `Bearer ${token}`
        }
    });
}

export const registerMyClinic = (clinicData) => {
    const token = localStorage.getItem("accessToken").trim();
    return api.post('/clinics', clinicData, {
        headers: { 
            "Authorization": `Bearer ${token}`
        }
    })
}

export const deleteClinic = () => { 
    const token = localStorage.getItem("accessToken").trim();
    return api.delete('/clinics/my-clinic', {
        headers: { 
            "Authorization": `Bearer ${token}`
        }
    });
}

// 회원탈퇴 API
export const deleteAccount = (password) => {
    const token = localStorage.getItem("accessToken").trim();
    return api.delete('/users', {
        headers: { 
            "Authorization": `Bearer ${token}`
        },
        data: password
    });
}