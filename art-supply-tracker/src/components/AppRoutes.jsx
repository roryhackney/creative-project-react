import React from "react";
import PropTypes from "prop-types";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import NotFound from './NotFound';
import Logout from "./Logout";
import Login from "./Login";
import Register from "./Register";
import Customize from "./Customize";
import AddNew from "./AddNew";

const AppRoutes = (props) => {
    if (props.isLoggedIn) {
        return (
            //home (user-supplies), logout, add-new, account-settings
            <Routes>
                <Route index element={<Home/>}></Route>
                <Route path="/add-new" element={<AddNew/>}/>
                <Route path="/customize" element={<Customize/>}/>
                <Route path="/logout" element={<Logout/>}></Route>
                <Route path="*" element={<NotFound/>}></Route>
            </Routes>
        );
    } else {
        return (
            //about, login, register
            <Routes>
                <Route index element={<About/>}/>
                <Route path="/logout" element={<Logout/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        );
    }
}

AppRoutes.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired
}

export default AppRoutes;