import React from "react";
import Logo from "components/Logo";

import { render, screen } from "../test-utils";

describe("Logo", () => {
  it("should render the Logo", () => {
    render(<Logo />);

    expect(screen.getByText(/T/)).toBeInTheDocument();
    expect(screen.getByText(/E/)).toBeInTheDocument();
    expect(screen.getByText(/L/)).toBeInTheDocument();
    expect(screen.getByText(/Z/)).toBeInTheDocument();
    expect(screen.getByText(/I/)).toBeInTheDocument();
    expect(screen.getByText(/R/)).toBeInTheDocument();

    expect(screen.getByText(/Z/)).toHaveAttribute("color", "secondary");
  });
});
