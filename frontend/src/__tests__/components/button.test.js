import React from "react";
import Button from "components/Button";

import { render, screen } from "../test-utils";

describe("Button", () => {
  it("should render the button", () => {
    render(
      <Button type="submit" aria-label="test button">
        <span>Test Button</span>
      </Button>
    );

    const button = screen.getByLabelText(/test button/);

    expect(button).toBeInTheDocument();
    expect(button).toContainHTML("<span>Test Button</span>");
  });

  it("should render the button disabled", () => {
    render(
      <Button type="submit" aria-label="test button" disabled>
        <span>Loading...</span>
      </Button>
    );

    const button = screen.getByLabelText(/test button/);

    expect(button).toBeDisabled();
    expect(button).toContainHTML("<span>Loading...</span>");
  });
});
