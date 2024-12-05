import React from 'react';
import { render, screen } from '@testing-library/react';
import Login from '../components/Login';
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom';

test('renders Login component', () => {
    render(<BrowserRouter><Login/></BrowserRouter>);
    expect(document.title).toBe("Login | Art Supply Tracker");
    expect(document.querySelector('main')).toBeInTheDocument();
    expect(screen.getByText("Login to")).toBeInTheDocument();
});

test('email input validation', async () => {
    render(<BrowserRouter><Login/></BrowserRouter>);
    const emailInput = screen.getByLabelText("Email");
    const loginButton = document.getElementById("submit");

    //if blank, email is required
    const user = userEvent.setup();
    await user.click(loginButton);
    expect(screen.getByText("Email is required")).toBeInTheDocument();

    //if doesn't pass regex, enter valid email
    await user.type(emailInput, "a");
    await user.click(loginButton);
    expect(screen.getByText("Please enter a valid email address")).toBeInTheDocument();

    //if valid (but no password), no email error
    await user.type(emailInput, "@a.com");
    await user.click(loginButton);
    expect(screen.queryByText("Please enter a valid email address")).not.toBeInTheDocument();
})

test('password input validation', async () => {
    render(<BrowserRouter><Login/></BrowserRouter>);
    const passInput = screen.getByLabelText("Password");
    const loginButton = document.getElementById("submit");

    const user = userEvent.setup();

    //if blank, password is required
    await user.click(loginButton);
    expect(screen.getByText("Password is required")).toBeInTheDocument();

    //if too short, reset message
    await user.type(passInput, "a");
    await user.click(loginButton);
    expect(screen.getByText("reset your password")).toBeInTheDocument();

    //if valid (but no email), no password error
    await user.type(passInput, "bcdefgh");
    await user.click(loginButton);
    expect(screen.queryByText("reset your password")).not.toBeInTheDocument();
})
