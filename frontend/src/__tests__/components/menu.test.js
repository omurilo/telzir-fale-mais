import React from "react";
import Menu from "components/Menu";

import { render, screen } from "../test-utils";

describe("Menu", () => {
  it("should render the menu and links", () => {
    render(<Menu />);

    expect(screen.getByText(/Calcula aí!/)).toHaveAttribute("href", "/");
    expect(screen.getByText(/Sobre/)).toHaveAttribute("href", "/about");
  });
});
