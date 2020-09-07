import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { render, screen } from "@testing-library/react";

// Provider
import { ErrorHandler } from "./ErrorHandler";
// Consumer
import { ErrorPage } from "components";

test("It should check if ErrorHandler behavior for Page Status is working fine", () => {
  const providerWrapper = ({ children }) => (
    <ErrorHandler>{children}</ErrorHandler>
  );

  render(
    <Router>
      <ErrorPage />
    </Router>,
    { providerWrapper }
  );

  expect(screen.getByText("Page Status")).toBeInTheDocument();
  expect(screen.getByText("Not Found!")).toBeInTheDocument();
});

test("It should check if ErrorHandler behavior for API Status is working fine", () => {
  const providerWrapper = ({ children }) => (
    <ErrorHandler>{children}</ErrorHandler>
  );

  render(
    <Router>
      <ErrorPage status={400} error="Bad Request" />
    </Router>,
    { providerWrapper }
  );

  expect(screen.getByText("API Status - 400")).toBeInTheDocument();
  expect(screen.getByText("Bad Request.")).toBeInTheDocument();
});
