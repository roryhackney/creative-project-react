const emailError = (email, errorSpan) => {
    if (email === "") {
        errorSpan.innerText = "Email is required";
    } else if (! /.+@.+\..+/.test(email)) {
        errorSpan.innerHTML = "Please enter a valid email address";
    } else {
        errorSpan.innerText = "";
        return true;
    }
    return false;
}

const passwordError = (password, errorSpan) => {
    
}

export {emailError};