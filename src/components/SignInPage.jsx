import { useState, useEffect } from "react";
import { fetchSignIn } from "../api";

function handleSubmit(e, signInInfo, setErrorMessage) {
    e.preventDefault();

    setErrorMessage({ loginIdError: "", passwordError: "" });
    fetchSignIn(signInInfo, setErrorMessage)
}

function IsInputValue({ value, setSignInInfo }) {
    return (
        <p
            className="font-bold text-top text-xs text-red-400 ml-28 mb-10"
        > {value}</p>
    );
}

function IsGlobalError({ value }) {

    return (
        <p
            className="flex font-bold text-xs text-red-400 justify-center mt-10"
        > {value}</p>
    );
}

function SignInFormData({ name, labelName, value, type = "", inputPlaceholder, isChecked, setIsChecked, setSignInInfo, errorMessage }) {
    const isPassword = type === "password";
    const isError = errorMessage !== "";

    return (
        <div className="flex flex-col">
            <div className="flex items-center mb-5">
                <label className="w-24 text-left mr-4">{labelName}</label>
                <input
                    name={name}
                    type={isPassword && isChecked ? "text" : type}
                    value={value}
                    placeholder={inputPlaceholder}
                    className="pl-5 pr-5 py-2 border border-gray-300 rounded w-80 flex flex-col"
                    onChange={e => setSignInInfo(info => ({
                        ...info,
                        [e.target.name]: e.target.value,
                    }))}
                />
                {/* 체크 박스 표시 부분 */}
                {
                    isPassword ?
                        <label className="flex items-center mx-5">
                            <input
                                type="checkbox"
                                className="mx-2"
                                checked={isChecked}
                                onChange={(e) => setIsChecked(e.target.checked)}
                            />
                            비밀번호 보기
                        </label> : null
                }
            </div>
            {/* 경고 문자 표시 부분 */}
            {
                isError ?
                    <IsInputValue
                        value={errorMessage}
                        setSignInInfo={setSignInInfo}
                    /> : null
            }
        </div>


    );
}

function SignInPage() {
    const [isChecked, setIsChecked] = useState(false);
    const [signInInfo, setSignInInfo] = useState({ loginId: "", password: "" });
    const [errorMessage, setErrorMessage] = useState({ loginIdError: "", passwordError: "", globalError: "" });

    useEffect(() => {
        if (errorMessage.globalError !== "") {
            setSignInInfo(prev => ({
                ...prev,
                "password": ""
            }));
        }
    }, [errorMessage.globalError]);

    return (
        <>
            {/* 로그인 폼 */}
            <div className="flex justify-center w-screen h-screen my-auto mx-auto py-40">
                <div className="flex flex-col items-center">
                    <h1 className="font-bold text-5xl">로그인</h1>
                    <div className="mt-10 shadow-md rounded-lg p-15">
                        <form
                            className="flex flex-col items-left"
                            onSubmit={e => handleSubmit(e, signInInfo, setErrorMessage)}
                        >
                            <SignInFormData
                                name="loginId"
                                labelName="아이디"
                                value={signInInfo.loginId}
                                inputPlaceholder="아이디를 입력해주세요."
                                setSignInInfo={setSignInInfo}
                                errorMessage={errorMessage.loginIdError}
                            />
                            <SignInFormData
                                name="password"
                                labelName="비밀번호"
                                type="password"
                                value={signInInfo.password}
                                inputPlaceholder="비밀번호를 입력해주세요."
                                isChecked={isChecked}
                                setIsChecked={setIsChecked}
                                setSignInInfo={setSignInInfo}
                                errorMessage={errorMessage.passwordError}
                            />
                            {
                                errorMessage.globalError !== "" ? <IsGlobalError value={errorMessage.globalError} /> : null
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
                    >
                        회원가입 하러가기
                    </button>
                </div>
            </div>
        </>
    );
}

export default SignInPage;