import axios from "axios";

export function fetchSignIn(signInInfo) {
    axios.post(
        "http://localhost:8080/api/auth/sign-in",
        signInInfo,
        {
            headers: { "Content-Type": "application/json" }
        },
    )
        .then((res) =>
            localStorage.setItem("accessToken", res.data.token.trim())
        )
        .catch(err => console.log(err));
}

export function fetchDepartments(setDepartments) {
    const token = localStorage.getItem("accessToken")?.trim();

    axios.get(
        "http://localhost:8080/api/clinics/departments",
        {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        },

    )
        .then((res) =>
            setDepartments(res.data.departments)
        )
        .catch(err => console.log(err));
}
