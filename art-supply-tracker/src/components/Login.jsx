import React, {createRef} from "react";
import {signInWithEmailAndPassword} from "firebase/auth";
import { auth } from "../firebase";
import {useNavigate} from "react-router-dom";

const Login = () => {
    //use refs instead of input.value
    const emailRef = createRef();
    const passwordRef = createRef();

    //for redirecting after successful login
    const nav = useNavigate();

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
     * Checks that email is not blank or a non email
     */
    const validateEmail = () => {
        const emailErr = document.getElementById("email-error");
        if (emailRef.current.value === "") {
            emailErr.innerText = "Email is required";
            return false;
        } else if (! /.+@.+\..+/.test(emailRef.current.value)) {
            //don't provide hints that narrow down possible emails
            emailErr.innerHTML = "Email not found. Would you like to <a href='/register'>register</a>?";
            return false;
        } else {
            emailErr.innerText = "";
            return true;
        }
    }

    /**
     * Checks that password is not blank or too short
     */
    const validatePassword = () => {
        const passErr = document.getElementById("password-error");
        const length = passwordRef.current.value.length;
        if (length === 0) {
            passErr.innerText = "Password is required";
            return false;
        }
        if (length < 8) {
            //do not provide hints that narrow down possible passwords
            passErr.innerHTML = "Unable to login. Would you like to <a href='/reset'>reset your password</a>?";
            return false;
        }
        passErr.innerText = "";
        return true;
        
    }

    /**
     * Attempts to log the user in and displays any error messages
     * @param {*} event the submit form event
     */
    const login = (event) => {
        event.preventDefault();
        signInWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value)
        .then((userCred) => {
            console.log(userCred.user);
            nav("/customize");
        }).catch((error) => {
            const passErr = document.getElementById("password-error");
            if (error.code === "auth/invalid-credential" || error.code === "auth/wrong-password") {
                //provide minimal info
                passErr.innerHTML = "Unable to login. Would you like to <a href='/reset'>reset your password</a>?";
            } else if (error.code === "auth/too-many-requests") {
                passErr.innerText = "Too many login attempts. Please try again later.";
            } else {
                passErr.innerText = "Unable to login. Please try again later.";
            }
            //prevent submit going through
            return false;
        })
    }

    return (
        <main>
        <h2><span>Login to</span>your Art Supply Tracker!</h2>
        <a href="TODO: implement google login">Google Login</a>
        <form onSubmit={login}>
            <label htmlFor="email">Email</label>
            <input type="text" name="email" id="email" ref={emailRef}/>
            <span id="email-error"></span>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" ref={passwordRef}/>
            <span id="password-error"></span>
            <button type="submit" onClick={validate}>Login</button>
        </form>
        </main>
    );
}

export default Login;