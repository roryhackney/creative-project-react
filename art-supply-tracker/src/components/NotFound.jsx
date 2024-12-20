import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
    document.title = "Page Not Found | Art Supply Tracker";
    return (
        <main>
            <h2 className=""><span>Page not found in</span>the Art Supply Tracker!</h2>
            <Link className="button" to="/">Back to Home</Link>
        </main>
    );
};

export default NotFound;