import { useState, useEffect } from "react";
import { fetchSignIn } from "../api";
import { useNavigate } from "react-router-dom";
import CheckBox from "./common/CheckBox";
import FormInput from "./common/FormInput";

function FieldErrorMessage({ value }) {
    return (
        <p
            className="font-bold text-top text-xs text-red-400 ml-28 mb-10"
        > {value}</p>
    );
}

function GlobalErrorMessage({ value }) {

    return (
        <p
            className="flex font-bold text-xs text-red-400 justify-center mt-10"
        > {value}</p>
    );
}

function SignInField({ baseField, showPassword, setShowPassword, setSignInInfo }) {
    const isPassword = baseField.type === "password";
    const isError = baseField.error !== "";

    return (
        <div className="flex flex-col">
            <div className="flex items-center mb-5">
                <FormInput
                    label={baseField.label}
                    name={baseField.name}
                    type={isPassword && showPassword ? "text" : baseField.type}
                    value={baseField.value}
                    placeholder={baseField.placeholder}
                    setInfo={setSignInInfo}
                    isLoginInput={true}
                />
                {
                    isPassword ?
                        <CheckBox
                            boxName="비밀번호 보기"
                            show={showPassword}
                            setShow={setShowPassword}
                        /> : null
                }
            </div>
            {/* 경고 문자 표시 부분 */}
            {
                isError ?
                    <FieldErrorMessage
                        value={baseField.error}
                    /> : null
            }
        </div>


    );
}

function SignInPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [signInInfo, setSignInInfo] = useState({ loginId: "", password: "" });
    const [errors, setErrors] = useState({ loginIdError: "", passwordError: "", globalError: "" });
    const navigate = useNavigate()

    const fields = [
        { name: "loginId", label: "아이디", type: "text", value: signInInfo.loginId, placeholder: "아이디를 입력해주세요.", error: errors.loginIdError },
        { name: "password", label: "비밀번호", type: "password", value: signInInfo.password, placeholder: "비밀번호를 입력해주세요.", error: errors.passwordError }
    ];

    //로그인 폼 제출 
    function handleSignInSubmit(e, signInInfo, setErrors, navigate) {
        e.preventDefault();

        setErrors({ loginIdError: "", passwordError: "" });
        fetchSignIn(signInInfo)
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

    //비밀번호 초기화 (에러가 발생한 경우)
    useEffect(() => {
        if (errors.globalError !== "") {
            setSignInInfo(prev => ({
                ...prev,
                "password": ""
            }));
        }
    }, [errors.globalError]);

    return (
        <>
            <div className="flex justify-center w-screen h-screen my-auto mx-auto py-10">
                <div className="flex flex-col items-center">
                    <h1 className="font-bold text-5xl">로그인</h1>
                    <div className="mt-10 shadow-md rounded-lg p-15">
                        <form
                            className="flex flex-col items-left"
                            onSubmit={e => handleSignInSubmit(e, signInInfo, setErrors, navigate)}
                        >
                            <SignInField
                                baseField={fields[0]}
                                setSignInInfo={setSignInInfo}
                                error={errors.loginIdError}
                            />
                            <SignInField
                                baseField={fields[1]}
                                showPassword={showPassword}
                                setShowPassword={setShowPassword}
                                setSignInInfo={setSignInInfo}
                                error={errors.passwordError}
                            />
                            {
                                errors.globalError !== "" ? <GlobalErrorMessage value={errors.globalError} /> : null
                            }
                            <button
                                type="submit"
                                className="text-white bg-black px-4 py-2 rounded mt-10 mx-40"
                            >
                                로그인
                            </button>
                        </form>
                    </div>

                    <div className="w-full text-center border-b border-gray-300 my-10" />

                    <button
                        className="text-white bg-black px-4 py-4 rounded"
                        onClick={() => navigate("/sign-up")}
                    >
                        회원가입 하러가기
                    </button>
                </div>
            </div>
        </>
    );
}

export default SignInPage;