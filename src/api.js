import axios from "axios";

export function fetchSignIn(signInInfo, setErrorMessage) {
    axios.post(
        "http://localhost:8080/api/auth/sign-in",
        signInInfo,
        {
            headers: { "Content-Type": "application/json" }
        },
    )
        .then((res) => {
            localStorage.setItem("accessToken", res.data.token.trim()),
            setErrorMessage({ loginIdError: "", passwordError: "", globalError: "" })

        })
        .catch(err => {
            const errorMessages = err.response?.data;
            const Errors = {};

            console.log(errorMessages);
            console.log(typeof errorMessages);

            if (typeof errorMessages === "string") {
                if (errorMessages.includes("존재하지 않는 회원")) {
                    Errors.globalError = errorMessages;
                }

                if (errorMessages.includes("비밀번호")) {
                    Errors.globalError = "아이디 혹은 비밀번호가 일치하지 않습니다.";
                }

            } else {
                errorMessages.forEach(element => {
                    if (element.includes("아이디")) {
                        Errors.loginIdError = element;
                    }
                    if (element.includes("비밀번호")) {
                        Errors.passwordError = element;
                    }
                });
            }


            setErrorMessage(prev => ({ ...prev, ...Errors }));
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
