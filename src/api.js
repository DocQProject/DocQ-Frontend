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
            params: {
                "sort": "createdAt,desc"
            },
            headers: {
                "Authorization": `Bearer ${token}`
            },
        },
    )
}

export function fetchSignUp(signUpInfo) {

    return api.post(
        "/auth/sign-up",
        signUpInfo,
    )
}

export function fetchCheckLoginIdAvailability(loginId) {

    return api.post(
        "/auth/check/loginId",
        {
            "loginId": `${loginId}`
        }
    )
}

export function fetchSearchClinicByQuery(keyword, currentPage) {
    const token = localStorage.getItem("accessToken")?.trim();

    return api.get(
        "/search",
        {
            params: {
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

// 게시글 관련 API

export const createPost = (postData) => {
    const token = localStorage.getItem("accessToken").trim();
    return api.post('/posts', postData, {
        headers: { 
            "Authorization": `Bearer ${token}`
        }
    });
}

export const fetchAllPosts = (page = 0, size = 10) => {
  const token = localStorage.getItem("accessToken")?.trim();
  return api.get(`/posts?page=${page}&size=${size}`, {
    headers: { 
      Authorization: `Bearer ${token}`
    }
  });
};

export const fetchPostById = (postId) => {
    const token = localStorage.getItem("accessToken").trim();
    return api.get(`/posts/${postId}`, {
        headers: { 
            "Authorization": `Bearer ${token}`
        }
    });
}

export const editPostById = (postId, postData) => {
    const token = localStorage.getItem("accessToken").trim();
    return api.put(`/posts/${postId}`, postData, {
        headers: { 
            "Authorization": `Bearer ${token}`
        }
    });
}

export const deletePostById = (postId) => {
    const token = localStorage.getItem("accessToken").trim();
    return api.delete(`/posts/${postId}`, {
        headers: { 
            "Authorization": `Bearer ${token}`
        }
    });
}

export function fetchClinicInfo(clinicId) {
    const token = localStorage.getItem("accessToken").trim();

    return api.get(
        `/clinics/${clinicId}`,
        {
            headers: {
                "Authorization": `Bearer ${token}`
            },
        }
    )
}

export function fetchReview(page, clinicParam) {
    const token = localStorage.getItem("accessToken").trim();

    return api.get(
        `/clinics/${clinicParam.id}/reviews`,
        {
            params: {
                "page": page
            },
            headers: {
                "Authorization": `Bearer ${token}`
            },
        }
    )
}

export function fetchCreateReview(clickedStarNum, reviewContent, clinicId) {
    const token = localStorage.getItem("accessToken").trim();

    return api.post(
        `/clinics/${clinicId}/reviews`,
        {
            content: reviewContent,
            starPoint: clickedStarNum
        },
        {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
    )
}

export function fetchCreateImage(file, reviewId) {
    const token = localStorage.getItem("accessToken").trim();

    const formData = new FormData();
    formData.append("file", file);  // file 넣기

    return api.post(
        `/images/${reviewId}?referenceType=REVIEW`,
        formData,
        {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "multipart/form-data"
            }
        }
    )
}