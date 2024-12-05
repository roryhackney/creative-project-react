import React from 'react';
import { render, screen } from '@testing-library/react';
import Register from '../components/Register';
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom';

test('renders Register component', () => {
    render(<BrowserRouter><Register/></BrowserRouter>);
    expect(document.title).toBe("Register | Art Supply Tracker");
    expect(document.querySelector('main')).toBeInTheDocument();
    expect(screen.getByText("Sign up for")).toBeInTheDocument();
});

test('email input validation', async () => {
    render(<BrowserRouter><Register/></BrowserRouter>);
    const emailInput = screen.getByLabelText("Email");
    const loginButton = document.getElementById("submit");

    //if blank, email is required
    const user = userEvent.setup();

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
    render(<BrowserRouter><Register/></BrowserRouter>);
    const passInput = screen.getByLabelText("Password");
    const loginButton = document.getElementById("submit");

    const user = userEvent.setup();
    expect(screen.queryByText("Password must be at least 8 characters")).not.toBeInTheDocument();

    //if too short, length requirement
    await user.type(passInput, "1234567");
    await user.click(loginButton);
    expect(screen.getByText("Password must be at least 8 characters")).toBeInTheDocument();

    //if valid (but no email), no password error
    await user.type(passInput, "8");
    await user.click(loginButton);
    expect(screen.queryByText("Password must be at least 8 characters")).not.toBeInTheDocument();
})
