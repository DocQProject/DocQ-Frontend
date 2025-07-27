function SignUpFormData({ value, inputPlaceholder }) {
    return (
        <div className="flex items-center mb-10">
            <label className="w-36 text-left mr-4">{value}</label>
            <input
                placeholder={inputPlaceholder}
                className="pl-5 pr-5 py-2 border border-gray-300 rounded w-80"
            />
        </div>
    );
}

function UserSignUpPage() {
    return (
        <>
            {/* 회원가입 폼 */}
            <div className="flex justify-center h-screen w-screen mx-auto mt-20">
                <div className="flex flex-col items-center">
                    <h1 className="font-bold">회원가입</h1>
                    <div className="mt-10 shadow-md rounded-lg p-15 ">
                        <form className="flex flex-col items-left">
                            <SignUpFormData
                                value="이름"
                                inputPlaceholder="이름 입력해주세요."
                            />
                            <SignUpFormData
                                value="이메일"
                                inputPlaceholder="이메일을 입력해주세요."
                            />
                            <div className="flex items-center">
                                <SignUpFormData
                                    value="아이디"
                                    inputPlaceholder="아이디를 입력해주세요."
                                />
                                <button
                                    type="button"
                                    className="text-white bg-black rounded ml-3 mb-10"
                                >
                                    중복확인
                                </button>
                            </div>
                            <SignUpFormData
                                value="비밀번호"
                                inputPlaceholder="비밀번호를 입력해주세요."
                            />
                            <SignUpFormData
                                value="비밀번호 확인"
                                inputPlaceholder="비밀번호를 다시 입력해주세요."
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

export default UserSignUpPage;