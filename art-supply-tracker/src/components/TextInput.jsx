import PropTypes from "prop-types";

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

TextInput.propTypes = {
    name: PropTypes.string.isRequired,
    required: PropTypes.bool.isRequired,
    changeHandler: PropTypes.func
}

export default TextInput;