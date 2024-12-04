import PropTypes from "prop-types";

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

SelectInput.propTypes = {
    setChoice: PropTypes.func,
    setCatData: PropTypes.func,
    changeHandler: PropTypes.func,
    name: PropTypes.string.isRequired,
    required: PropTypes.bool.isRequired,
    options: PropTypes.array.isRequired
}

export default SelectInput;