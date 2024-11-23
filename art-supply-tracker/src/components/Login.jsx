import React from "react";

const Login = (props) => {

    const validateEmail = () => {
        //TODO: use refs instead as per right side
        const emailRef = ref(document.getElementById("email"));
        const emailErr = document.getElementById("email-error");
        const emailPattern = /.+@.+\..+/;
        if (! emailPattern.test(email.value)) {
            emailErr.innerText = "Please enter a valid email address";
            errors++;
        } else {
            emailErr.innerText = "";
        }
    }

    return (
        <main>
        <h2><span>Login to</span>your art supply tracker!</h2>
        <form method="POST" id="login-form">
            <label for="email">Email</label>
            <input type="text" name="email" id="email"/>
            <span id="email-error"></span>
            <label for="password">Password</label>
            <input type="password" name="password" id="password"/>
            <span id="password-error"></span>
            <button type="submit">Login</button>
        </form>
        </main>
    );
}