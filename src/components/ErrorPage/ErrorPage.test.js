import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { render, screen } from "@testing-library/react";

import ErrorPage from "./ErrorPage";

const errorPageComponent = ({ error, status }) => {
  render(
    <Router>
      <ErrorPage error={error} status={status} />
    </Router>
  );
};

describe("Suite - ErrorPage Component", () => {
  test("It should display dynamic API Status Error", () => {
    errorPageComponent({
      error: "Bad Request",
      status: 400,
    });

    expect(screen.getByTestId("id-error-message")).toBeInTheDocument();
    expect(screen.getByText("API Status - 400")).toBeInTheDocument();
  });

  test("It should display dynamic Page Status Error", () => {
    errorPageComponent({
      error: "",
      status: 0,
    });

    expect(screen.getByTestId("id-error-message")).toBeInTheDocument();
    expect(screen.getByText("Page Status")).toBeInTheDocument();
  });
});
