import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { render, screen, act } from "@testing-library/react";

import { SearchValueProvider } from "context/SearchValue";

import Counties from "./Counties";

const CountiesComponent = () => (
  <SearchValueProvider>
    <Router>
      <Counties />
    </Router>
  </SearchValueProvider>
);

describe("It should test the counties component", () => {
  test("It should lazy-render the counties component", async () => {
    render(<CountiesComponent />);

    expect(screen.getByTestId("id-request-progress")).toBeInTheDocument();

    act(() =>
      expect(screen.getByTestId("id-counties-lazy")).toBeInTheDocument()
    );
  });
});
