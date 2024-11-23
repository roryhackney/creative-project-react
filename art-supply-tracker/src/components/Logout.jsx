import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const Logout = (props) => {
    useEffect(() => props.logout(), []);

    return (
        <main>
            <h2><span>You have logged out of</span>your Art Supply Tracker!</h2>
            <Link to="/login" className="button">Back to Login</Link>
            <Link to="/about" className="button">Back to About</Link>
        </main>
    );
}

export default Logout;