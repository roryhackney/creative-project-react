import React from 'react';
import { render, screen } from '@testing-library/react';
import Logout from '../components/Logout';
import { BrowserRouter } from 'react-router-dom';

test('user is logged out', () => {
    render(<BrowserRouter><Logout/></BrowserRouter>);
    expect(document.title).toBe("Logged Out | Art Supply Tracker");
    expect(screen.getByText("You have logged out of")).toBeInTheDocument();
});