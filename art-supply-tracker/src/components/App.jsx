import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './Header';
import Footer from './Footer';
import React from 'react';
import {useEffect, useState } from "react";

import Home from "./Home";
import About from "./About";
import NotFound from './NotFound';
import Logout from "./Logout";

const App = (props) => {
    //TODO: replace with authentication using FireBase
    const [isLoggedIn, setIsLoggedIn] = useState(true);

    const logout = () => {
        setIsLoggedIn(false);
    }

    return (
        <React.StrictMode>
        <BrowserRouter>
            <Header isLoggedIn={isLoggedIn}/>
            <Routes>
                <Route path="/" element={<Home/>}></Route>
                <Route path="/about" element={<About/>}></Route>
                <Route path="/logout" element={<Logout logout={logout}/>}></Route>
                <Route path="*" element={<NotFound/>}></Route>
            </Routes>
        </BrowserRouter>
        <Footer />
        </React.StrictMode>
    );
}

export default App;