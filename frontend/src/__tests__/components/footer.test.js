import React from "react";
import Footer from "components/Footer";

import { render, screen } from "../test-utils";

describe("Footer", () => {
  it("should render the Footer", () => {
    render(<Footer />);

    expect(screen.getByRole("contentinfo")).toMatchSnapshot();
  });
});
