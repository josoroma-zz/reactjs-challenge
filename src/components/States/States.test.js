import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { act, render, screen } from "@testing-library/react";

import { SearchValueProvider } from "context/SearchValue";

import States from "./States";

const StatesComponent = () => (
  <SearchValueProvider>
    <Router>
      <States />
    </Router>
  </SearchValueProvider>
);

describe("It should test the states component", () => {
  test("It should lazy-render the states component", async () => {
    render(<StatesComponent />);

    expect(screen.getByTestId("id-request-progress")).toBeInTheDocument();

    act(() => expect(screen.getByTestId("id-states-lazy")).toBeInTheDocument());
  });
});
