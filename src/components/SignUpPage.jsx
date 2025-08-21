import { useState } from "react";
import { fetchCheckLoginIdAvailability, fetchSignUp } from "../api";
import { useLocation, useNavigate } from "react-router-dom";
import CheckBox from "./common/CheckBox";

function SignUpFormData({ name, value, type, inputPlaceholder, check = false, checkLoginId, setCheckLoginId, error, setErrors, showPassword, setShowPassword }) {
    const [loginId, setLoginId] = useState("")
    const isError = error !== ""
    const button = check ?
        <button
            type="button"
            className="text-white bg-black rounded ml-3 px-3 py-2"
            onClick={() => handleCheckLoginId(loginId, setCheckLoginId, setErrors)}
        >
            중복확인
        </button> : null;

    return (
        <>
            <div className="mb-6">
                <div className="flex items-center">
                    <label className="w-36 text-left mr-4">{value}</label>
                    <input
                        type={showPassword ? "text" : type}
                        name={name}
                        onChange={check ? (e) => setLoginId(e.target.value) : null}
                        placeholder={inputPlaceholder}
                        className="pl-5 pr-5 py-2 border border-gray-300 rounded w-80"
                    />
                    {
                        type === "password" && name === "password" ?
                            <CheckBox
                                boxName="비밀번호 보기"
                                show={showPassword}
                                setShow={setShowPassword}
                            /> : null
                    }
                    {button}
                </div>
                {
                    isError || checkLoginId ?
                        <FieldMessage
                            value={isError ? error: "사용 가능한 아이디 입니다."}
                            isSuccess={isError ? false : true}
                        /> : null
                }
            </div>
        </>
    );
}

function FieldMessage({ value, isSuccess }) {
    return (
        <p
            className={`font-bold text-top text-xs mt-5 ml-40 ${isSuccess ? "text-green-600" : "text-red-400"}`}
        > {value}</p>
    );
}

function handleCheckLoginId(loginId, setCheckLoginId, setErrors) {
    fetchCheckLoginIdAvailability(loginId)
        .then((res) => {
            console.log(res.data)
            setErrors((prev) => ({
                ...prev,
                "loginIdError": ""
            }))
            setCheckLoginId(res.data)
        })
        .catch((err) => {
            setErrors((prev) => ({
                ...prev,
                "loginIdError": err.response?.data
            }))
        })
}

function handleError(errorMessages) {
    const errors = {}
    if (errorMessages.includes("아이디")) {
        errors.loginIdError = errorMessages;
    }
    if (errorMessages.includes("비밀번호")) {
        errors.checkPasswordError = errorMessages;
    }

    return errors;
}

function handleValidationError(errorMessages, isPasswordEmpty, isEmailEmpty) {
    const errors = {}
    errorMessages.forEach(m => {
        if (m.includes("아이디")) {
            errors.loginIdError = m;
        }
        if (m.includes("비밀번호")) {
            if (isPasswordEmpty && m.includes("필수")) {
                errors.passwordError = m;
            }
            if (!isPasswordEmpty && m.includes("형식")) {
                errors.passwordError = m;
            }
        }
        if (m.includes("재입력")) {
            errors.checkPasswordError = m;
        }
        if (m.includes("이름")) {
            errors.nameError = m;
        }
        if (m.includes("이메일")) {
            if (isEmailEmpty && m.includes("필수")) {
                errors.emailError = m;
            }
            if (!isEmailEmpty && m.includes("형식")) {
                errors.emailError = m;
            }
        }
    })

    return errors;
}

function SignUpPage() {
    const [checkLoginId, setCheckLoginId] = useState(false)
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const initialErrors = {
        nameError: "",
        emailError: "",
        loginIdError: "",
        passwordError: "",
        checkPasswordError: "",
    }
    const [errors, setErrors] = useState(initialErrors)
    const location = useLocation();
    const role = location.pathname.includes("/doctor") ? "ROLE_DOCTOR" : "ROLE_USER";

    const handleSignUpSubmit = (e) => {
        e.preventDefault();

        const signUpInfo = {
            loginId: `${e.target.loginId.value}`,
            name: `${e.target.name.value}`,
            password: `${e.target.password.value}`,
            checkPassword: `${e.target.checkPassword.value}`,
            email: `${e.target.email.value}`,
            role: `${role}`
        }
        const isPasswordEmpty = e.target.password.value === "";
        const isEmailEmpty = e.target.email.value === "";

        setErrors(initialErrors);
        fetchSignUp(signUpInfo)
            .then((res) => {
                localStorage.setItem("accessToken", res.data.token.trim()),
                    setErrors(initialErrors);
                navigate("/");
            })
            .catch((err => {
                const errorMessages = err.response?.data;
                let errors = {};

                //잘못된 정보를 입력한 경우
                if (err.response?.status === 409 || err.response?.status === 401) {
                    errors = handleError(errorMessages)
                }

                //유효성 검증이 실패한 경우
                if (err.response?.status === 400) {
                    errors = handleValidationError(errorMessages, isPasswordEmpty, isEmailEmpty);
                }

                setErrors(prev => ({ ...prev, ...errors }));
            }))

    };

    return (
        <>
            {/* 회원가입 폼 */}
            <div className="flex justify-center h-screen w-screen mx-auto my-auto py-10">
                <div className="flex flex-col items-center">
                    <h1 className="font-bold text-5xl">회원가입</h1>
                    <div className="mt-10 shadow-md rounded-lg p-15 ">
                        <form
                            className="flex flex-col items-left"
                            onSubmit={handleSignUpSubmit}
                        >
                            <SignUpFormData
                                name="name"
                                value="이름"
                                type="text"
                                inputPlaceholder="이름 입력해주세요."
                                error={errors.nameError}
                            />
                            <SignUpFormData
                                name="email"
                                value="이메일"
                                type="text"
                                inputPlaceholder="이메일을 입력해주세요."
                                error={errors.emailError}
                            />
                            <div className="flex items-center">
                                <SignUpFormData
                                    name="loginId"
                                    value="아이디"
                                    type="text"
                                    inputPlaceholder="아이디를 입력해주세요."
                                    check={true}
                                    checkLoginId={checkLoginId}
                                    setCheckLoginId={setCheckLoginId}
                                    error={errors.loginIdError}
                                    setErrors={setErrors}
                                />
                            </div>
                            <SignUpFormData
                                name="password"
                                value="비밀번호"
                                type="password"
                                inputPlaceholder="비밀번호를 입력해주세요."
                                error={errors.passwordError}
                                showPassword={showPassword}
                                setShowPassword={setShowPassword}
                            />
                            <SignUpFormData
                                name="checkPassword"
                                value="비밀번호 확인"
                                type="password"
                                inputPlaceholder="비밀번호를 다시 입력해주세요."
                                error={errors.checkPasswordError}
                                showPassword={showPassword}
                            />
                            <button
                                type="submit"
                                className="text-white bg-black px-4 py-2 rounded mt-10"
                            >
                                회원가입
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>

    );
}

export default SignUpPage;