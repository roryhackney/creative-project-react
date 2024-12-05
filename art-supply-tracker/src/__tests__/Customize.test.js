import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Customize from '../components/Customize';
import userEvent from '@testing-library/user-event';

//check that the Customize page works
test('renders Customize component', () => {
    render(<Customize demoUser={{"emailVerified": true, "email": "demouser@user.com"}}/>);
    //correct page
    expect(document.title).toBe("Customize | Art Supply Tracker");
    
    //profile pic is present and default
    expect(screen.getByAltText("Profile picture of a generic user").src).toBe("http://localhost/example-user.jpg");
    
    //display name is blank
    const displayNameInput = screen.getByLabelText("Display Name"); 
    expect(displayNameInput).toBeInTheDocument();
    expect(displayNameInput.value).toBe("");
    
    //email is user's email
    const emailInput = screen.getByLabelText("Email");
    expect(emailInput).toBeInTheDocument();
    expect(emailInput.value).toBe("demouser@user.com");

    //categories are present
    expect(screen.getByText("Art Supply Categories")).toBeInTheDocument();
});

test("email input verification works", async () => {
    render(<Customize demoUser= {{"emailVerified": true, "email": "email1@user.com", "photoURL": "custom-user.jpg"}}/>);
    //initial email displayed is same as user's email
    const emailInput = screen.getByLabelText("Email");
    expect(emailInput).toBeInTheDocument();
    expect(emailInput.value).toBe("email1@user.com");
    expect(screen.queryByText("Not Verified")).not.toBeInTheDocument();

    //user's photo is displayed
    expect(screen.getByAltText("Profile picture of a generic user").src).toBe("http://localhost/custom-user.jpg");

    //if the user changes the email, it is no longer verified
    const user = userEvent.setup();
    await user.clear(emailInput);
    await user.type(emailInput, "newEmail@user.com");
    expect(emailInput.value).toBe("newEmail@user.com");
    expect(screen.getByText("Not Verified")).toBeInTheDocument();

    //if they change it back, it is verified again
    await user.clear(emailInput);
    await user.type(emailInput, "email1@user.com");
    expect(screen.queryByText("Not Verified")).not.toBeInTheDocument();
});