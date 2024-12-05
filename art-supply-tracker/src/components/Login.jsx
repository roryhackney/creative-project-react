import React, {createRef} from "react";
import {GithubAuthProvider, signInWithEmailAndPassword, signInWithPopup} from "firebase/auth";
import { auth } from "../firebase";
import {useNavigate, Link} from "react-router-dom";

const Login = () => {
    document.title = "Login | Art Supply Tracker";
    
    //use refs instead of input.value
    const emailRef = createRef();
    const passwordRef = createRef();

    //for redirecting after successful login
    const nav = useNavigate();

    //display github error
    const [errors, setErrors] = React.useState({"email": "", "password": "", "github": ""});

    //checks if email is valid and sets the error message to display
    const emailError = (email) => {
        if (email === "") {
            setErrors((prev) => ({...prev, "email": "Email is required"}));
            return false;
        } else if (! /.+@.+\..+/.test(email)) {
            setErrors((prev) => ({...prev, "email": "Please enter a valid email address"}));
            return false;
        } else {
            setErrors(prev => ({...prev, "email": ""}));
            return true;
        }
    }

    /**
     * Checks email and password form fields for validity before submitting
     * @param {*} event submit button click event 
     */
    const validate = (event) => {
        //validate email
        const emailValid = emailError(emailRef.current.value);
        
        //validate password
        const passwordValid = validatePassword();
        
        //don't process if either is invalid
        if (! emailValid || ! passwordValid) event.preventDefault();
    }

    /**
     * Checks that password is not blank or too short
     */
    const validatePassword = () => {
        const length = passwordRef.current.value.length;
        if (length === 0) {
            setErrors(prev => ({...prev, "password": "Password is required"}));
            return false;
        }
        if (length < 8) {
            //do not provide hints that narrow down possible passwords
            //TODO: reset password page
            setErrors(prev => ({...prev, "password": <>Unable to login. Would you like to <Link to='/reset'>reset your password</Link>?</>}));
            return false;
        }
        setErrors(prev => ({...prev, "password": ""}));
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
            // console.log(userCred.user);
            nav("/");
        }).catch((error) => {
            if (error.code === "auth/invalid-credential" || error.code === "auth/wrong-password") {
                //provide minimal info
                setErrors(prev => ({...prev, "password": <>Unable to login. Would you like to <Link to='/reset'>reset your password</Link>?</>}));
            } else if (error.code === "auth/too-many-requests") {
                setErrors(prev => ({...prev, "password": "Too many login attempts. Please try again later."}));
            } else {
                setErrors(prev => ({...prev, "password": "Unable to login. Please try again later."}));
            }
            //prevent submit going through
            return false;
        })
    }

    //logs the user in with github or displays an error message on failure
    const handleGitHubLogin = () => {
        signInWithPopup(auth, new GithubAuthProvider())
        .then(() => nav("/"))
        .catch(() => {
            setErrors(prev => ({...prev, "github": "Unable to sign in with GitHub."}));
        });
    }

    return (
        <main>
        <h2><span>Login to</span>your Art Supply Tracker!</h2>
        <button type="button" onClick={handleGitHubLogin}>GitHub Login</button>
        <span>{errors["github"]}</span>
        <form onSubmit={login}>
            <label htmlFor="email">Email</label>
            <input type="text" name="email" id="email" ref={emailRef}/>
            <span>{errors["email"]}</span>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" ref={passwordRef}/>
            <span>{errors["password"]}</span>
            <button type="submit" onClick={validate}>Login</button>
        </form>
        </main>
    );
}

export default Login;