function SignInFormDate({ value, inputPlaceholder }) {
    return (
        <div className="flex items-center mb-5">
            <label className="w-24 text-right mr-4">{value}</label>
            <input
                placeholder={inputPlaceholder}
                className="pl-5 pr-5 py-2 border border-gray-300 rounded w-80"
            />
        </div>
    );
}

function HorizonLine() {
    return (
        <div className="w-full text-center border-b border-gray-300 my-10"/>
    );
}

function SignInPage() {
    return (
        <>
            {/* 로그인 폼 */}
            <div className="flex justify-center h-screen w-screen mx-auto mt-20">
                <div className="flex flex-col items-center">
                    <h1 className="font-bold">로그인</h1>
                    <div className="mt-10 shadow-md rounded-lg p-15">
                        <form className="flex flex-col items-center">
                            <SignInFormDate
                                value="아이디"
                                inputPlaceholder="아이디를 입력해주세요."
                            />
                            <SignInFormDate
                                value="비밀번호"
                                inputPlaceholder="비밀번호를 입력해주세요."
                            />
                            <button
                                type="submit"
                                className="text-white bg-black px-4 py-2 rounded mt-10"
                            >
                                로그인
                            </button>
                        </form>
                    </div>

                    <HorizonLine />

                    <button
                        className="text-white bg-black px-4 rounded "
                    >
                        회원가입 하러가기
                    </button>
                </div>
            </div>
        </>
    );
}

export default SignInPage;