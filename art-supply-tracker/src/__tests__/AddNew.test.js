import React from 'react';
import { render, screen } from '@testing-library/react';
import AddNew from '../components/AddNew';
import userEvent from '@testing-library/user-event';

test('renders AddNew component', () => {
    render(<AddNew/>);
    expect(document.title).toBe("Add New | Art Supply Tracker");
    expect(document.querySelector('main')).toBeInTheDocument();
    expect(screen.getByText('General fields')).toBeInTheDocument();
});

test('selecting a category loads its fields', async () => {
    render(<AddNew/>);
    const user = userEvent.setup();
    expect(screen.queryByText('Canvas fields')).not.toBeInTheDocument();
    const selectInput = document.getElementById("Category");
    await user.selectOptions(selectInput, 'Canvas');
    expect(selectInput.value).toBe("Canvas");
    
    expect(screen.getByText('Canvas fields')).toBeInTheDocument();
});

test('filling out and resetting clears the form', async () => {
    render(<AddNew/>);
    const user = userEvent.setup();
    
    //general fields
    const nameField = screen.getByLabelText("Name");
    expect(nameField.value).toBe("");
    await user.type(nameField, "Testing");
    expect(nameField.value).toBe("Testing");

    //category fields
    const selectInput = document.getElementById("Category");
    await user.selectOptions(selectInput, 'Canvas');
    expect(selectInput.value).toBe("Canvas");
    const widthField = screen.getByLabelText("Width*");
    await user.type(widthField, "11");
    expect(widthField.value).toBe("11");

    //clears the form
    const resetButton = screen.queryAllByText("Reset")[0];
    await user.click(resetButton);
    expect(nameField.value).toBe("");
    expect(widthField).not.toBeInTheDocument();
});

//not really sure how to test the functions that check firebase and catch and display errors
//or to put data in database
//oh well for now I guess