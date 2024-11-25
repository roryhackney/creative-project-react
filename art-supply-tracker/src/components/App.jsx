import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './Header';
import Footer from './Footer';
import React from 'react';
import {useEffect, useState } from "react";
import {onAuthStateChanged, signOut} from "firebase/auth";
import {auth } from "../firebase";

import Home from "./Home";
import About from "./About";
import NotFound from './NotFound';
import Logout from "./Logout";
import Login from "./Login";
import Register from "./Register";

const App = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    
    onAuthStateChanged(auth, (user) => {
        if (user && ! isLoggedIn) {
            //logged in
            const userId = user.uid;
            setIsLoggedIn(true);
        } else if (! user && isLoggedIn) {
            //logged out
            setIsLoggedIn(false);
        }
    })

    const logout = () => {
        auth.signOut();
    }

    return (
        <React.StrictMode>
        <BrowserRouter>
            <Header isLoggedIn={isLoggedIn}/>
            <Routes>
                <Route path="/" element={<Home/>}></Route>
                <Route path="/about" element={<About/>}></Route>
                <Route path="/logout" element={<Logout logout={logout}/>}></Route>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="*" element={<NotFound/>}></Route>
            </Routes>
        </BrowserRouter>
        <Footer />
        </React.StrictMode>
    );
}

export default App;