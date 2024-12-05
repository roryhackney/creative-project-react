import React, {createRef} from "react";
import {createUserWithEmailAndPassword, signInWithPopup, GithubAuthProvider} from "firebase/auth";
import {database, auth } from "../firebase";
import { catProps, categories as cats, properties } from "./SampleData";
import { useNavigate, Link } from "react-router-dom";
import { ref, set } from "firebase/database";

const Register = () => {
    document.title = "Register | Art Supply Tracker";
    
    const nav = useNavigate();
    const emailRef = createRef();
    const passwordRef = createRef();

    const [errors, setErrors] = React.useState({"email": "", "password": "", "github": ""});

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
        const emailPattern = /.+@.+\..+/;
        if (! emailPattern.test(emailRef.current.value)) {
            setErrors((prev) => ({...prev, "email": "Please enter a valid email address"}));
            return false;
        } else {
            setErrors(prev => ({...prev, "email": ""}));
            return true;
        }
    }

    /**
     * Checks that password is 8+ chars
     */
    const validatePassword = () => {
        if (passwordRef.current.value.length < 8) {
            setErrors((prev) => ({...prev, "password": "Password must be at least 8 characters"}));
            return false;
        } else {
            setErrors(prev => ({...prev, "password": ""}));
            return true;
        }
    }

    /**
     * Attempts to register the new user and displays any error messages
     */
    const register = (event) => {
        event.preventDefault();
        createUserWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value)
        .then((userCred) => {
            //signed up and logged in
            const user = userCred.user;
            // console.log(user);
            // console.log("Successfully registered and signed in, next setup account");
            setupNewUser(user);
        }).catch((error) => {
            if (error.code === "auth/email-already-in-use") {
                setErrors((prev) => ({...prev, "email": <>You already have an account. Would you like to <Link to="/login">log in</Link>?</>}));
            } else if (error.code === "auth/too-many-requests") {
                setErrors((prev) => ({...prev, "email": "Too many attempts. Please try again later."}));
            } else if (error.code === "auth/invalid-email") {
                //in case the user gets past my email validation
                setErrors((prev) => ({...prev, "email": "Please enter a valid email address"}));
            } else {
                setErrors((prev) => ({...prev, "email": "Unable to register. Please try again later."}));
                // console.log(error.code);
            }
            return false;
        })
    }

    const setupNewUser = (user) => {
        const refToDb = ref(database, "users/" + user.uid);
        set(refToDb, {
            "categories": cats,
            "properties": properties,
            "category-properties": catProps
        }).then(() => {
            // console.log("Inserted user data");
            nav("/customize");
        }).catch((error) => {
            // console.log("Could not save new user's db content");
        });
    }

    //registers and logs the user in with github or displays an error message on failure
    const handleGitHubSignup = () => {
        signInWithPopup(auth, new GithubAuthProvider())
        .then(() => nav("/"))
        .catch(() => {
            setErrors((prev) => ({...prev, "github": "Unable to sign up with GitHub."}));
        });
    }
    

    return (
        <main>
        <h2><span>Sign up for</span>the Art Supply Tracker!</h2>
        <button type="button" onClick={handleGitHubSignup}>Sign Up with GitHub</button>
        <span>{errors["github"]}</span>
        <form id="register-form" onSubmit={register}>
            <label htmlFor="email">Email</label>
            <input type="text" name="email" id="email" ref={emailRef}/>
            <span>{errors["email"]}</span>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" ref={passwordRef}/>
            <span>{errors["password"]}</span>
            <button id="submit" type="submit" onClick={validate}>Sign Up</button>
        </form>
        </main>
    );
}

export default Register;