import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '../components/Home';
import userEvent from '@testing-library/user-event'

test('renders Home component', () => {
    render(<Home/>);
    expect(document.title).toBe("Home | Art Supply Tracker");
    expect(document.querySelector('main')).toBeInTheDocument();
    expect(screen.getByText("Welcome to")).toBeInTheDocument();
    expect(screen.getByText("Load Supplies")).toBeInTheDocument();
});

test('button loads user supplies', async () => {
    render(<Home testing={true}/>);
    const button = screen.getByText("Load Supplies");
    const user = userEvent.setup();
    await user.click(button);
    //wait 2 seconds then check
    await new Promise((r) => setTimeout(r, 2000));
    expect(screen.getByText("Glitter Glue Pink")).toBeInTheDocument();
})
