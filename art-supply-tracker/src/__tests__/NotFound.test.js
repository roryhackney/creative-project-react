import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import NotFound from "../components/NotFound";

test("Renders Not Found page content", async () => {
    render(<BrowserRouter><NotFound/></BrowserRouter>);
    expect(await screen.getByText("Page Not Found")).toBeInTheDocument();
});