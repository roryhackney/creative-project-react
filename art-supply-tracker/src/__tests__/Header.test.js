import React from 'react';
import { fireEvent, waitFor, render, screen} from '@testing-library/react';
import App from '../components/App';
import Header from '../components/Header';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

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

//I wanted to try and login so I could prove that clicking logout does what it's supposed to
//but I couldn't quite figure it out
// test('logout button changes nav to logged out', async () => {
//     render(<App/>); //will render Header with actual logout function
//     //have user log in
//     const user = userEvent.setup();
//     //user navigated to register page
//     const loginButton = document.querySelector(".special-button.gold a");
//     await user.click(loginButton);
//     //correct sign up page
//     expect(screen.getByText("Sign In with GitHub")).toBeInTheDocument();

//     //user fills out form
//     const emailInput = screen.getByLabelText("Email");
//     const passInput = screen.getByLabelText("Password");
//     const submitButton = document.getElementById("submit");
//     await user.type(emailInput, "a@b.com");
//     await user.type(passInput, "12345678");
//     await user.click(submitButton);

//     //now logged in
//     expect(screen.getByText("Your Art Supplies")).toBeInTheDocument();

//     //how can I log the user in?
//     const button = document.getElementById("logout-button");
//     //if logged in
//     if (button != null) {
//         //logout button exists
//         expect(document.getElementById('logout-button')).toBeInTheDocument();
//         // clicking logout results in going to /logout and nav changing to logged out version
//         await user.click(button);        
//         expect(document.title).toBe("Logged Out | Art Supply Tracker");
//         expect(document.getElementById('logout-button')).not.toBeInTheDocument();
//     }
// })