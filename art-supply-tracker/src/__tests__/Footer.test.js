import React from "react";
import { render } from '@testing-library/react';
import Footer from "../components/Footer";

test("Renders Footer component", () => {
    render(<Footer/>);
    expect(document.querySelector("footer")).toBeInTheDocument();
    expect(document.querySelector("footer ul li a")).toBeInTheDocument();
});