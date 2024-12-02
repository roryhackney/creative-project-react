const SelectInput = (props) => {
    const updateCurrChoice = (event) => {
        if (props.setChoice) {
            const choice = event.target.value;
            props.setChoice(choice);
        }
        if (props.setCatData) {
            props.setCatData({});
        }
        if (props.changeHandler) {
            props.changeHandler(event);
        }
    }

    return (
        <div className="input-column">
            <label htmlFor={props.name}>{props.name + (props.required ? "*" : "")}</label>
            <select
                name={props.name}
                id={props.name}
                onChange={updateCurrChoice}
                required={props.required}
            >    
                <option id="no-option" value="">Select a {props.name}</option>
                {props.options.map((option) => <option id={option} key={option} value={option}>{option}</option>)}
            </select>
        </div>
    );
}

export default SelectInput;