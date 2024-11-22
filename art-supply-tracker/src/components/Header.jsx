import React from "react";
import { Link } from "react-router-dom";

const Header = (props) => {
    const createMenu = () => {
        if (props.isLoggedIn) return (
            <ul>
                <li className="special-button pink"><Link to="/add-new">Add New</Link></li>
                <li className="special-button blue"><Link to="/customize">Customize</Link></li>
                <li onClick={props.logout} id="logout-button" className="special-button gold"><Link to="/logout">Log Out</Link></li>
            </ul>
        );
        else return (
            <ul>
                <li className="special-button gray"><Link to="/about">About</Link></li>
                <li className="special-button blue"><Link to="/register">Register</Link></li>
                <li className="special-button gold"><Link to="/login">Log In</Link></li>
            </ul>
        );
    }
    return (
        <header>
            <Link to="/"><img src="astlogo.png" alt="Logo: cartoon art supplies"/></Link>
            <Link to="/"><h1>Art Supply Tracker</h1></Link>
            <nav>{createMenu()}</nav>
        </header>
    );
}

export default Header;