const IntInput = (props) => {
    return (
        <div className="input-column">
            <label htmlFor={props.name}>{props.name + (props.required ? "*" : "")}</label>
            <input
                type="number"
                id={props.name}
                name={props.name}
                step="1"
                min="0"
                defaultValue="1"
                max="999999"
                required={props.required}
                onChange = {props.changeHandler ? props.changeHandler : ()=>{}}
            />;
        </div>
    );
}

export default IntInput;