import React from "react";
import {auth} from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

const Customize = () => {
    const [currUser, setUser] = React.useState(auth.currentUser);

    onAuthStateChanged(auth, (user) => {
        if (user) setUser(user);
    })

    const getProfilePic = () => {
        if (currUser && currUser.photoURL) {
            return currUser.photoURL;
        } else {
            return "example-user.jpg";
        }
    }

    return (
        <main id="customize-page">
            <h2><span>Customize</span>your Art Supply Tracker!</h2>
            <form>
                <div id="profile">
                    <img src={getProfilePic()} alt="Profile picture of a generic user"/>
                    <span>Change Profile Pic</span>
                </div>
                <div>

                    <label htmlFor="display-name">Display Name</label>
                    <div className="input-with-button">
                        <input type="text" name="display-name" id="display-name" defaultValue={currUser.displayName} placeholder="Your Majesty"/>
                        <button type="button">Random</button>
                    </div>    
                    <label htmlFor="email">Email</label>
                    <input type="text" name="email" id="email" defaultValue={currUser.email}/>
                    <span id="email-verified">{currUser.emailVerified ? "Verified" : "Unverified"}</span>
                    <fieldset>
                        <legend>Art Supply Categories</legend>
                        <div>
                            <label htmlFor="markers">Pens / Markers</label>
                            <input type="checkbox" name="markers" id="markers" defaultChecked="checked"/>
                        </div>
                        <div>
                            <label htmlFor="paint">Acrylic Paint</label>
                            <input type="checkbox" name="paint" id="paint"/>
                        </div>
                        <div>
                            <label htmlFor="watercolor-pencils">Watercolor Pencils</label>
                            <input type="checkbox" name="watercolor-pencils" id="watercolor-pencils" defaultChecked="checked"/>
                        </div>
                        <div>
                            <label htmlFor="yarn">Yarn</label>
                            <input type="checkbox" name="yarn" id="yarn"/>
                        </div>
                    </fieldset>
                    <button type="submit">Save</button>
                </div>
            </form>
        </main>
    );
}

export default Customize;