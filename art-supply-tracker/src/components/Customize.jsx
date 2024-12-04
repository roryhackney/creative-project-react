import React from "react";
import {auth} from "../firebase";
import { onAuthStateChanged, reauthenticateWithCredential, updateEmail, EmailAuthProvider, sendEmailVerification, verifyBeforeUpdateEmail, updateProfile } from "firebase/auth";
import ListCategories from "./ListCategories";
import { emailError } from "../helpers";

const Customize = () => {
    document.title = "Customize | Art Supply Tracker";
    
    //current user in state so changing user rerenders page
    const [currUser, setUser] = React.useState(auth.currentUser);
    
    //form fields
    const displayNameRef = React.useRef();
    const emailRef = React.useRef();
    
    //list of silly names for random function
    const sillyNames = ["Pumpkin", "Your Majesty", "Dark Lord", "Gremlin", "AAAAAAAAAAAA", "Buzzin' Bumblebee", "Stinky"];
    
    /**
     * Gets a random silly name from the list of silly names
     * @param {*} sillyNames list of silly names to choose from
     * @returns a random silly name from the list
     */
    const getSillyName = (sillyNames) => {
        const index = Math.floor(Math.random() * sillyNames.length);
        return sillyNames[index];
    }

    /**
     * When the Random button is clicked, sets display name to random name
     */
    const handleClickRandom = () => {
        displayNameRef.current.value = getSillyName(sillyNames);
    }

    /**
     * When the current user is changed, updates the user state
    */
    onAuthStateChanged(auth, (user) => {
        if (user) setUser(user);
    })

    /**
     * Retrieves the user's profile photo url, if it exists, or placeholder image
     * @returns src for the user's profile picture
     */
    const getProfilePic = () => {
        if (currUser && currUser.photoURL) {
            return currUser.photoURL;
        } else {
            return "example-user.jpg";
        }
    }

    /**
     * Validates the form
     * @param {*} event submit button click event 
     */
    const validate = (event) => {
        const validEmail = emailError(emailRef.current.value, document.getElementById("email-error"));
        if (! validEmail) event.preventDefault();
    }

    /**
     * Tries to update the user's email, displaying errors on failure or success message
     */
    const updateUserEmail = () => {
        //try to update the email
        const newEmail = emailRef.current.value;
        if (newEmail !== currUser.email) {
            verifyBeforeUpdateEmail(currUser, newEmail)
            .then(() => console.log("Successfully updated"))
            .catch((error) => {
                const errorSpan = document.getElementById("email-error");
                if (error.code === "auth/invalid-email") {
                    errorSpan.innerText = "Please enter a valid email address";
                } else if (error.code === "auth/email-already-in-use") {
                    //don't tell them another user is using it for security
                    errorSpan.innerText = "Email cannot be used";
                } else if (error.code === "auth/requires-recent-login") {
                    if (reauthenticate() === true) {
                        updateUserEmail(); //should go through this time
                    } else {
                        errorSpan.innerText = "Unable to update email, please try again";
                    }
                } else {
                    errorSpan.innerText = "Unable to update email, please try again later";
                    console.log("ERROR:", error.code + error.message);
                }
            })
        }
    }

    /**
     * Reauthenticates the user for sensitive operations like email updates
     * @returns Whether reauthentication was successful
     */
    const reauthenticate = () => {
        //TODO: use a form with js instead but for now this is fine
        const password = prompt("Please enter your password to update your email");
        if (password === null || password.length < 8) {
            return false;
        }
        const creds = EmailAuthProvider.credential(currUser.email, password);
        //try to reauthenticate only if possibly a password
        reauthenticateWithCredential(currUser, creds)
        .then(() => {
            return true;
        }).catch(() => {
            return false;
        })
    }

    /**
     * Updates the user's display name if it was changed in the form
     */
    const updateDisplayName = () => {
        console.log(currUser.displayName);
        //if blank set to null
        const newName = displayNameRef.current.value.trim() === "" ? null : displayNameRef.current.value;
        if (newName !== currUser.displayName) {
            const displayNameErr = document.getElementById("display-name-error");
            displayNameErr.innerText = "";
            //cannot replace existing display name with null
            if (newName === null) {
                displayNameErr.innerText = "Unable to update display name. Please try again later.";
                displayNameErr.classList.remove("green");
            } else {
                //set to new name
                updateProfile(currUser, {displayName: newName})
                .then(() => {
                    displayNameErr.innerText = "Successfully updated name"
                    displayNameErr.className = "green";
                }).catch(() => {
                    //unlikely there would be an error, but just in case
                    displayNameErr.innerText = "Unable to update display name. Please try again later.";
                    displayNameErr.classList.remove("green");
                })
            }
        }
    }

    /**
     * Updates the user's email and display name in firebase if possible, displaying any errors
     * @param {*} event form submit event
     */
    const saveUserData = event => {
        event.preventDefault();
        updateUserEmail();
        updateDisplayName();
        //TODO: updateImage(), may require firebase storage setup to store image files
        //TODO (advanced): allow the user to enable/disable categories or even create/edit custom categories
    }

    /**
     * Returns a span displaying whether user's current email is verified
     * @returns <span> html element containing verified email status
     */
    const initialVerifiedSpan = () => {
        if (currUser.emailVerified) {
            return <span id="is-verified" className="green">Verified</span>
        } else {
            return <span id="is-verified">Not Verified</span>
        }
    }

    /**
     * When the user edits the email field, display whether the current email is verified
     */
    const handleEmailChange = () => {
        const span = document.getElementById("is-verified");
        if (span.innerText === "Verified" && currUser.email !== emailRef.current.validEmail) {
            span.innerText = "Not Verified";
            span.className = "";
        } else if (span.innerText === "Not Verified" && currUser.email === emailRef.current.value) {
            span.innerText = "Verified";
            span.className = "green";
        }
    }

    /**
     * Return the HTML content for the Customize page
     */
    return (
        <main id="customize-page">
            <h2><span>Customize</span>your Art Supply Tracker!</h2>
            <form onSubmit={saveUserData}>
                <div id="profile">
                    <img src={getProfilePic()} alt="Profile picture of a generic user"/>
                    <span>Change Profile Pic</span>
                </div>
                <div>
                    <label htmlFor="display-name">Display Name</label>
                    <div className="input-with-button">
                        <input type="text" name="display-name" id="display-name"
                         defaultValue={currUser.displayName} placeholder="Your Majesty"
                         ref={displayNameRef}/>
                        <button type="button" onClick={handleClickRandom}>Random</button>
                    </div>  
                    <span id="display-name-error"></span>  
                    <label htmlFor="email">Email</label>
                    <div>
                        <input type="text" name="email" id="email" defaultValue={currUser.email} ref={emailRef} onChange={handleEmailChange}/>
                    </div>
                    {initialVerifiedSpan()}
                    <span>Note: you must click the link in the verification email to update your email</span>
                    <span id="email-error"></span>
                    <button type="submit" onClick={validate}>Save</button>
                    <fieldset>
                        <legend>Art Supply Categories</legend>
                        {<ul><ListCategories/></ul>}
                    </fieldset>
                </div>
            </form>
        </main>
    );
}

export default Customize;