import React from "react";
import Title from "components/Title";

import { render, screen } from "../test-utils";

describe("Title", () => {
  it("should render the Title", () => {
    render(<Title>The H1 Test Title</Title>);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      /The H1 Test Title/
    );
  });

  it("should render the Title with variant", () => {
    render(<Title variant="h2">The H2 variant Test Title</Title>);

    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      /The H2 variant Test Title/
    );
  });
});
