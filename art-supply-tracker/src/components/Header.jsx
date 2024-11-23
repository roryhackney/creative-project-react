import React from "react";
import { Link } from "react-router-dom";

const Header = (props) => {
    if (props.isLoggedIn) return (
        <header>
            <Link to="/"><img src="astlogo.png" alt="Logo: cartoon art supplies"/></Link>
            <Link to="/"><h1>Art Supply Tracker</h1></Link>
            <nav>
                <ul>
                    <li className="special-button pink"><Link to="/add-new">Add New</Link></li>
                    <li className="special-button blue"><Link to="/customize">Customize</Link></li>
                    <li id="logout-button" className="special-button gold"><Link to="/logout">Log Out</Link></li>
                </ul>
            </nav>
        </header>
    );
    else return (
        <header>
            <Link to="/about"><img src="astlogo.png" alt="Logo: cartoon art supplies"/></Link>
            <Link to="/about"><h1>Art Supply Tracker</h1></Link>
            <nav>
                <ul>
                    <li className="special-button pink"><Link to="/about">About</Link></li>
                    <li className="special-button blue"><Link to="/register">Register</Link></li>
                    <li className="special-button gold"><Link to="/login">Log In</Link></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;