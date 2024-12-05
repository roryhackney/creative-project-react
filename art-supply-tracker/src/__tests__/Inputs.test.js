import React from 'react';
import { render, screen } from '@testing-library/react';
import FloatInput from '../components/FloatInput';

test('renders required FloatInput component', () => {
    render(<FloatInput name={"Test"} required={true} />);
    const label = document.querySelector("label");
    expect(label).toBeInTheDocument();
    const floatInput = screen.getByLabelText("Test*");
    expect(floatInput).toBeInTheDocument();
    expect(floatInput.step).toBe("0.01");
    expect(floatInput.id).toBe("Test");
    expect(floatInput.onchange).toBe(null);
    expect(floatInput.required).toBe(true);
});

test('renders optional FloatInput component', () => {
    render(<FloatInput name={"Test"} required={false}/>);
    const label = document.querySelector("label");
    expect(label).toBeInTheDocument();
    const floatInput = screen.getByLabelText("Test");
    expect(floatInput).toBeInTheDocument();
    expect(floatInput.step).toBe("0.01");
    expect(floatInput.id).toBe("Test");
    expect(floatInput.required).toBe(false);
});

//int input

//select input

//text input