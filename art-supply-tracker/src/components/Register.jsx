import React, {createRef} from "react";
import {getAuth, createUserWithEmailAndPassword} from "firebase/auth";
import { firebaseApp } from "../firebase";

const Register = (props) => {
    const emailRef = createRef();
    const passwordRef = createRef();

    /**
     * Checks all form fields for validity before submitting
     * @param {*} event submit button click event 
     */
    const validate = (event) => {
        const emailValid = validateEmail();
        const passwordValid = validatePassword();
        if (! emailValid || ! passwordValid) event.preventDefault();
    }

    /**
    * Checks that email is formatted x@y.z
    */
    const validateEmail = () => {
        const emailErr = document.getElementById("email-error");
        const emailPattern = /.+@.+\..+/;
        if (! emailPattern.test(emailRef.current.value)) {
            emailErr.innerText = "Please enter a valid email address";
            return false;
        } else {
            emailErr.innerText = "";
            return true;
        }
    }

    /**
     * Checks that password is 8+ chars
     */
    const validatePassword = () => {
        const passErr = document.getElementById("password-error");
        if (passwordRef.current.value.length < 8) {
            passErr.innerText = "Password must be at least 8 characters";
            return false;
        } else {
            passErr.innerText = "";
            return true;
        }
    }

    /**
     * Attempts to register the new user and displays any error messages
     */
    const register = (event) => {
        event.preventDefault();
        const auth = getAuth(firebaseApp);
        createUserWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value)
        .then((userCred) => {
            //signed up and logged in
            const user = userCred.user;
            console.log(user);
            console.log("Successfully registered and signed in, next setup account");
        }).catch((error) => {
            const emailErr = document.getElementById("email-error");
            if (error.code === "auth/email-already-in-use") {
                emailErr.innerHTML = "Email already exists. Would you like to <a href='/login'>login</a>?";
            } else if (error.code === "auth/too-many-requests") {
                emailErr.innerText = "Too many attempts. Please try again later.";
            } else if (error.code === "auth/invalid-email") {
                //in case the user gets past my email validation
                emailErr.innerText = "Please enter a valid email address";
            } else {
                emailErr.innerText = "Unable to register. Please try again later.";
                // console.log(error.code);
            }
            return false;
        })
    }

    return (
        <main>
        <h2><span>Sign Up for</span>your art supply tracker!</h2>
        <a href="">Google Sign Up</a>
        <form method="POST" id="register-form" onSubmit={register}>
            <label htmlFor="email">Email</label>
            <input type="text" name="email" id="email" ref={emailRef}/>
            <span id="email-error"></span>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" ref={passwordRef}/>
            <span id="password-error"></span>
            <button type="submit" onClick={validate}>Sign Up</button>
        </form>
        </main>
    );
}

export default Register;