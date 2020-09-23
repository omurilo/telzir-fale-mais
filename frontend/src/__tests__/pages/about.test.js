import React from "react";
import About from "pages/About";

import { render, screen } from "../test-utils";

describe("About", () => {
  it("should render the About page", () => {
    render(<About />);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Fale+, um plano pra tudo!"
    );
    expect(
      screen.getByText((text) =>
        text.includes("O Fale+ é um produto da Telzir")
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText((text) =>
        text.includes("O funcionamento do plano é simples")
      )
    );
    expect(
      screen.getByText((text) => text.includes("O Calcula aí!"))
    ).toBeInTheDocument();
    expect(screen.getByRole("table")).toBeInTheDocument();
    expect(screen.getAllByRole("row")).toHaveLength(4);
    expect(screen.getAllByRole("columnheader")).toHaveLength(2);
    expect(screen.getAllByRole("cell")).toHaveLength(6);
  });
});
