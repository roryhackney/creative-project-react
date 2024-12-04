import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {auth } from "../firebase";

const Logout = () => {
    document.title = "Logged Out | Art Supply Tracker";
    useEffect(() => {
        const logout = async () => {
            await auth.signOut();
        }
        logout();
    }, []);

    return (
        <main>
            <h2><span>You have logged out of</span>your Art Supply Tracker!</h2>
            <Link to="/login" className="button">Back to Login</Link>
            <Link to="/" className="button">Back to Home</Link>
        </main>
    );
}

export default Logout;