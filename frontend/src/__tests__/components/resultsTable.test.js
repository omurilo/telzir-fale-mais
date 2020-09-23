import React from "react";
import ResultsTable from "components/ResultsTable";

import { render, screen } from "../test-utils";

describe("Results Table", () => {
  it("should render the Results Table", () => {
    render(
      <ResultsTable
        values={{
          minuteCost: 0.9,
          faleMaisCost: 0,
          withoutFaleMaisCost: 35.55,
        }}
      />
    );

    expect(screen.getAllByText(/Custo da ligação/)).toMatchSnapshot();
    expect(screen.getByRole("group")).toBeInTheDocument();
    expect(screen.getByText(/Taxa de minutos excedentes/)).toBeInTheDocument();
    expect(
      screen.getByText(/Os minutos excedentes tem um acréscimo de/)
    ).toContainHTML('<p>Os minutos excedentes tem um acréscimo de <strong>10%</strong> sobre a tarifa normal do minuto.</p>');
  });
});
