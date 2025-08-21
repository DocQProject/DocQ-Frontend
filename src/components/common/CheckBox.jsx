function CheckBox({boxName, show, setShow}) {
    return (
        <label className="flex items-center mx-5">
            <input
                name = {boxName}
                type="checkbox"
                className="mx-2"
                checked={show}
                onChange={(e) => setShow(e.target.checked)}
            />
            {boxName}
        </label>
    );
}

export default CheckBox;