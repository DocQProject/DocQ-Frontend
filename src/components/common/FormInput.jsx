function FormInput({label, name, type, value, placeholder, setInfo, isLoginInput }) {
    return (
        <>
            <label className="w-36 text-left mr-4">{label}</label>
            <input
                name={name}
                type={type}
                value={value}
                placeholder={placeholder}
                className="pl-5 pr-5 py-2 border border-gray-300 rounded w-80 flex flex-col"
                onChange={isLoginInput ? 
                    e => setInfo(info => ({
                        ...info,
                        [e.target.name]: e.target.value,
                    }))
                    : e => setInfo(e.target.value) 
                }
            />
        </>
    );
}

export default FormInput;