import React from 'react';
import { fireEvent, waitFor, render, screen } from '@testing-library/react';
import App from '../components/App';
import Header from '../components/Header';
import { BrowserRouter } from 'react-router-dom';

//check that the Header renders correct nav based on login status
test('header logged out displays correct nav', async () => {
    render(<BrowserRouter><Header isLoggedIn = {false} logout={()=>{}}/></BrowserRouter>);
    //check that Header contains nav links
    expect(document.querySelector("header nav li a")).toBeInTheDocument();
    //if not logged in, nav with Log Out button does not exist
    expect(document.getElementById('logout-button')).not.toBeInTheDocument();
    //and Log In button does exist
    expect(await screen.queryByText("Log In")).toBeInTheDocument();
});

test('header logged in displays correct nav', async () => {
    render(<BrowserRouter><Header isLoggedIn = {true} logout={()=>{}}/></BrowserRouter>);
    //check that Header contains nav links
    expect(document.querySelector("header nav li a")).toBeInTheDocument();
    //if not logged in, nav with Log Out button does exist
    expect(document.getElementById('logout-button')).toBeInTheDocument();
    //and Log In button does not exist
    expect(await screen.queryByText("Log In")).not.toBeInTheDocument();
});

test('logout button changes nav to logged out', async () => {
    render(<App/>); //will render Header with actual logout function
    const button = document.getElementById("logout-button");
    //if logged in
    if (button != null) {
        //logout button exists
        expect(document.getElementById('logout-button')).toBeInTheDocument();
        // clicking logout results in going to /logout and nav changing
        fireEvent.click(button);
        
        await waitFor(() => {
            expect(document.title).toBe("Logged Out | Art Supply Tracker");
            expect(document.getElementById('logout-button')).not.toBeInTheDocument();
        });
    }
})