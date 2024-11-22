import React from "react";
import { Link } from "react-router-dom";

const NotFound = (props) => {
    return (
        <main>
            <h2 className=""><span>404 Error</span>Page Not Found</h2>
            <Link className="button" to="/">Back to Home</Link>
        </main>
    );
};

export default NotFound;