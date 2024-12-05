import React from "react";
import {auth} from "../firebase";
import { onAuthStateChanged, reauthenticateWithCredential, EmailAuthProvider, sendEmailVerification, verifyBeforeUpdateEmail, updateProfile } from "firebase/auth";
import ListCategories from "./ListCategories";
import PropTypes from "prop-types";

const Customize = (props) => {
    document.title = "Customize | Art Supply Tracker";
    
    //if component is being used for testing, use demoUser
    //if being used for the actual run, uses current user
    //if the current user ever changes, it will be due to logout which will make this page inaccessible
    const [currUser, setUser] = React.useState(
        props.demoUser ? props.demoUser : auth.currentUser
    );

    const [errors, setErrors] = React.useState({
        "email": "",
        "isVerified": currUser.emailVerified ? "Verified" : "Not Verified",
        "displayName": ""}
    );
    
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
     * Validates the form
     * @param {*} event submit button click event 
     */
    const validate = (event) => {
        const validEmail = emailError(emailRef.current.value);
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
            .then(() => 
                {
                    setErrors(prev => ({...prev, "email": "Successfully updated"}));
                }
            ).catch((error) => {
                if (error.code === "auth/invalid-email") {
                    setErrors(prev => ({...prev, "email": "Please enter a valid email address"}));
                } else if (error.code === "auth/email-already-in-use") {
                    //don't tell them another user is using it for security
                    setErrors(prev => ({...prev, "email": "Email cannot be used"}));;
                } else if (error.code === "auth/requires-recent-login") {
                    if (reauthenticate() === true) {
                        updateUserEmail(); //should go through this time
                    } else {
                        setErrors(prev => ({...prev, "email": "Unable to update email, please try again"}));
                    }
                } else {
                    setErrors(prev => ({...prev, "email": "Unable to update email, please try again later"}));
                    // console.log("ERROR:", error.code + error.message);
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
        // console.log(currUser.displayName);
        //if blank set to null
        const newName = displayNameRef.current.value.trim() === "" ? null : displayNameRef.current.value;
        if (newName !== currUser.displayName) {
            setErrors(prev => ({...prev, "displayName": ""}))
            //cannot replace existing display name with null
            if (newName === null) {
                setErrors(prev => ({...prev, "displayName": "Unable to update display name. Please try again later."}));
            } else {
                //set to new name
                updateProfile(currUser, {displayName: newName})
                .then(() => {
                    setErrors(prev => ({...prev, "displayName": "Successfully updated name"}));
                }).catch(() => {
                    //unlikely there would be an error, but just in case
                    setErrors(prev => ({...prev, "displayName": "Unable to update display name. Please try again later."}));
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
     * When the user edits the email field, display whether the current email is verified
     */
    const handleEmailChange = () => {
        if (errors["isVerified"] == "Verified" && currUser.email !== emailRef.current.value) {
            setErrors(prev => ({...prev, "isVerified": "Not Verified"}));
        } else if (errors["isVerified"] == "Not Verified" && currUser.email === emailRef.current.value) {
            setErrors(prev => ({...prev, "isVerified": "Verified"}));
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
                    <span>{errors["displayName"]}</span>  
                    <label htmlFor="email">Email</label>
                    <div>
                        <input type="text" name="email" id="email" defaultValue={currUser.email} ref={emailRef} onChange={handleEmailChange}/>
                    </div>
                    <span>{errors["isVerified"]}</span>
                    <span>Note: you must click the link in the verification email to update your email</span>
                    <span>{errors["email"]}</span>
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

Customize.propTypes = {
    demoUser: PropTypes.shape({
        displayName: PropTypes.string,
        emailVerified: PropTypes.bool.isRequired,
        email: PropTypes.string.isRequired,
        photoURL: PropTypes.string
    })
};

export default Customize;