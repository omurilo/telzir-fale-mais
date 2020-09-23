import React from "react";
import Input from "components/Input";

import { render, screen } from "../test-utils";

describe("Input", () => {
  it("should render the Input without children", () => {
    render(
      <Input
        type="text"
        name="test-input"
        placeholder="Testing Input Placeholder"
        label="Test Input"
        readOnly
        value="Testando o value do input"
      />
    );

    expect(screen.getByLabelText(/Test Input/)).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/Testing Input Placeholder/)
    ).toHaveValue("Testando o value do input");
  });

  it("should render the Input with error children", () => {
    render(
      <Input
        type="text"
        name="test-input"
        placeholder="Testing Input Placeholder"
        label="Test Input"
        readOnly
        value="Testando o value do input"
      >
        <span role="alert" className="error">
          Um erro aconteceu no input
        </span>
      </Input>
    );

    const error = screen.getByRole(/alert/);

    expect(error).toHaveTextContent(/Um erro aconteceu no input/);
    expect(error).toHaveClass("error");
  });
});
