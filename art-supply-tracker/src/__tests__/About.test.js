import React from 'react';
import { render } from '@testing-library/react';
import About from '../components/About';

test('renders About component', () => {
    render(<About/>);
    expect(document.title).toBe("About | Art Supply Tracker");
    expect(document.querySelector('main')).toBeInTheDocument();
    expect(document.querySelector('.star')).toBeInTheDocument();
});
