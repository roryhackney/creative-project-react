const TextInput = (props) => {
    return (
        <div className="input-column">
            <label htmlFor={props.name}>{props.name + (props.required ? "*" : "")}</label>
            <input
                type="text"
                id={props.name}
                name={props.name}
                required={props.required}
                onChange={props.changeHandler ? props.changeHandler : () => {}}
            />
        </div>
    );
}

export default TextInput;