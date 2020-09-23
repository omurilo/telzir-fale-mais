import React from "react";
import MobileMenu from "components/MobileMenu";

import { render, fireEvent, screen } from "../test-utils";

describe("Mobile Menu", () => {
  it("should render the mobile menu and links", () => {
    render(<MobileMenu />);

    fireEvent.click(screen.getByRole("menu"));

    expect(screen.getByText(/Calcula aí!/)).toHaveAttribute("href", "/");
    expect(screen.getByText(/Sobre/)).toHaveAttribute("href", "/about");
  });
});
