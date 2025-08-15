import axios from "axios";

export function fetchSignIn(signInInfo, setErrors, navigate) {
    axios.post(
        "http://localhost:8080/api/auth/sign-in",
        signInInfo,
        {
            headers: { "Content-Type": "application/json" }
        },
    )
        .then((res) => {
            localStorage.setItem("accessToken", res.data.token.trim()),
            setErrors({ loginIdError: "", passwordError: "", globalError: "" }),
            navigate("/");
        })
        .catch(err => {
            const errorMessages = err.response?.data;
            const Errors = {};

            //존재하지 않은 회원인 경우
            if (err.response?.status === 404) {
                Errors.globalError = errorMessages;
            }

            //잘못되 로그인 정보를 입력한 경우
            if (err.response?.status === 401) {
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
