import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { SearchValueProvider } from "context/SearchValue";

import Toolbar from "./Toolbar";

const ToolbarComponent = () => (
  <SearchValueProvider>
    <Router>
      <Toolbar />
    </Router>
  </SearchValueProvider>
);

const emptySearchValue = "";
const searchValue = "New York";
const searchBarInputValue = searchValue;

describe("It should render toolbar/searchbar", () => {
  test("It should check searchbar input when input changes on type", async () => {
    render(<ToolbarComponent />);

    const searchBarInput = screen.getByTestId("id-search-bar-input");
    expect(searchBarInput.value).toBe(emptySearchValue);

    userEvent.type(searchBarInput, searchBarInputValue);
    expect(searchBarInput.value).toBe(searchValue);
  });

  test("It should check the searchbar clean input data event on click", async () => {
    render(<ToolbarComponent />);

    const searchBarInput = screen.getByTestId("id-search-bar-input");

    const closeButton = screen
      .getByTestId("id-search-close-icon")
      .closest("button");

    userEvent.click(closeButton);
    expect(searchBarInput.value).toBe(emptySearchValue);
  });
});
