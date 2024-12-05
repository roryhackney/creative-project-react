import React from 'react';
import { BrowserRouter } from "react-router-dom";
import Header from './Header';
import Footer from './Footer';
import { useState } from "react";
import {onAuthStateChanged} from "firebase/auth";
import {auth } from "../firebase";

import AppRoutes from "./AppRoutes";

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    
    onAuthStateChanged(auth, (user) => {
        if (user && ! isLoggedIn) {
            //logged in
            // const userId = user.uid;
            setIsLoggedIn(true);
        } else if (! user && isLoggedIn) {
            //logged out
            setIsLoggedIn(false);
        }
    })

    return (
        <React.StrictMode>
        <BrowserRouter>
            <Header isLoggedIn={isLoggedIn}/>
            <AppRoutes isLoggedIn={isLoggedIn}/>
        </BrowserRouter>
        <Footer />
        </React.StrictMode>
    );
    
}

export default App;