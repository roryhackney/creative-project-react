import React from 'react';
import { render } from '@testing-library/react';
import AppRoutes from '../components/AppRoutes';
import { BrowserRouter } from 'react-router-dom';
import Header from '../components/Header';

//check that the AppRouter renders correct paths
test('renders / as home when logged in', () => {
    render(
        <BrowserRouter>
            <Header isLoggedIn={true}/>
            <AppRoutes isLoggedIn={true}/>
        </BrowserRouter>
    );
    expect(document.title).toBe("Home | Art Supply Tracker");
});

test('renders / as about when logged out', () => {
    render(
        <BrowserRouter>
            <Header isLoggedIn={false}/>
            <AppRoutes isLoggedIn={false}/>
        </BrowserRouter>
    );
    expect(document.title).toBe("About | Art Supply Tracker");
});

