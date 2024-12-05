import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import NotFound from "../components/NotFound";

test("Renders Not Found page content", async () => {
    render(<BrowserRouter><NotFound/></BrowserRouter>);
    expect(document.title).toBe("Page Not Found | Art Supply Tracker");
    expect(screen.getByText("Page not found in")).toBeInTheDocument();
});