const FloatInput = (props) => {
    return (
        <div className="input-column">
            <label htmlFor={props.name}>{props.name + (props.required ? "*" : "")}</label>
            <input
                type="number"
                id={props.name}
                name={props.name}
                step="0.01"
                min="0"
                max="999999"
                required={props.required}
                onChange={props.changeHandler ? props.changeHandler : ()=>{}}
            />;
        </div>
    );
}

export default FloatInput;