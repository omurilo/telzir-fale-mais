import React from "react";
import Header from "components/Header";

import { render, screen } from "../test-utils";

describe("Header", () => {
  it("should render the Header", () => {
    render(<Header />);

    expect(screen.getByRole("banner")).toMatchSnapshot();
  });
});
