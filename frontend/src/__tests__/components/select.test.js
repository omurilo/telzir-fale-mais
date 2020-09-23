import React from "react";
import Select from "components/Select";

import { render, fireEvent, screen } from "../test-utils";

describe("Select", () => {
  it("should render the Select without children", async () => {
    render(
      <Select
        name="test-select"
        label="Test Select"
        placeholder="Testing Select Placeholder"
        options={[{ value: "first", label: "First Test Option" }]}
        blurInputOnSelect
        className="radiusTop"
      />
    );

    const select = screen.getByRole("textbox");

    fireEvent.change(select, {
      target: { value: "first" },
    });

    expect(screen.getByText(/First Test Option/)).toBeInTheDocument();
  });
});
