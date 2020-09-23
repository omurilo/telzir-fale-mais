import React from "react";
import userEvent from "@testing-library/user-event";
import MockAdapter from "axios-mock-adapter";
import SelectEvent from "react-select-event";
import api from 'services/api';

import Home from "pages/Home";

import { render, fireEvent, screen, waitFor } from "../test-utils";

const mock = new MockAdapter(api);

mock.onGet("plans").reply(200, {
  plans: [
    {
      id: "e08e4de2-254c-410b-accd-336a85cb81cd",
      name: "Fale Mais 60",
      quota: 60,
    },
  ],
});

mock.onPost("calculate").reply(200, {
  minuteCost: 0.9,
  faleMaisCost: 0,
  withoutFaleMaisCost: 35.55,
});

describe("Home", () => {
  it("should render the Home page", async () => {
    render(<Home />);

    const select = screen.getByLabelText(/Plano Fale Mais/);
    const origin = screen.getByPlaceholderText(/Digite o DDD de origem/);
    const destiny = screen.getByPlaceholderText(/Digite o DDD de destin/);
    const time = screen.getByPlaceholderText(/Digite a duração da ligação/);
    const button = screen.getByLabelText(/calcular valor/);
    const form = screen.getByTestId(/form/);

    await waitFor(() => screen.findByText(/Calcular/));

    userEvent.type(origin, "011");
    userEvent.type(destiny, "018");
    userEvent.type(time, "60");

    await SelectEvent.select(select, "Fale Mais 60");

    expect(form).toHaveFormValues({
      origin: "011",
      destiny: "018",
      time: "60",
      plan: "e08e4de2-254c-410b-accd-336a85cb81cd",
    });
    expect(button).not.toBeDisabled();

    fireEvent.click(screen.getByText(/Calcular/));

    await waitFor(() => screen.getByRole("group"));

    expect(screen.getByText(/Taxa de minutos excedentes/)).toBeInTheDocument();
  });
});
