import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import * as swr from "swr";
import { render, screen, wait } from "@testing-library/react";

import {
  SearchValueProvider,
  useSearchValueDispatch,
} from "context/SearchValue";

import { endpoints } from "../../config/constants";
import csv2objFetcherService from "../../services/csv2objFetcherService";
import searchUtil from "../../utils/searchUtil";

import States from "./States";

const StatesComponent = () => (
  <SearchValueProvider>
    <Router>
      <States />
    </Router>
  </SearchValueProvider>
);

const statesRequestURL = "for=state:*&DATE_CODE=1";
const endpointURL = `${endpoints.mainURL}${statesRequestURL}`;

const mockSuccessfulResponse = [
  {
    NAME: "New York",
    POP: "19378102",
    DENSITY: "411.21713488",
    DATE_CODE: "1",
    state: "36",
  },
];

jest.mock("context/SearchValue/useSearchValueDispatch");

jest.mock("../../services/csv2objFetcherService");
jest.mock("../../utils/searchUtil");

const setSearchValueReducer = { type: "setSearchValueReducer", payload: "" };
const dispatch = jest.fn();

describe("It should render a list of filtered states", () => {
  beforeEach(() => {
    fetch.resetMocks();
    jest.clearAllMocks();
    // useSearchValueDispatch / useEffect / Dispatch
    useSearchValueDispatch.mockReturnValue(dispatch);
    dispatch.mockReturnValue(setSearchValueReducer);
  });

  test("It should test the useEffect dispatch", async () => {
    render(<StatesComponent />);

    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith(setSearchValueReducer);
  });

  test("It should display a list of states", async () => {
    csv2objFetcherService.mockResolvedValue(mockSuccessfulResponse);
    searchUtil.mockReturnValue(mockSuccessfulResponse);

    render(<StatesComponent />);

    expect(screen.getByTestId("id-states-progress")).toBeInTheDocument();

    await wait(() =>
      expect(screen.getByTestId("id-states-container")).toBeInTheDocument()
    );

    mockSuccessfulResponse.forEach(
      (state) =>
        expect(screen.getByText(state.NAME)).toBeInTheDocument() &&
        expect(screen.getByText(state.state)).toBeInTheDocument()
    );

    expect(csv2objFetcherService).toHaveBeenCalledWith(endpointURL);
    expect(csv2objFetcherService).toHaveBeenCalledTimes(1);
    expect(searchUtil).toHaveBeenCalledTimes(1);
  });

  test("It should display a message when the list of states is empty", async () => {
    csv2objFetcherService.mockResolvedValue(mockSuccessfulResponse);
    searchUtil.mockReturnValue([]);

    render(<StatesComponent />);

    await wait(() =>
      expect(
        screen.getByTestId("id-states-no-search-results")
      ).toBeInTheDocument()
    );

    expect(searchUtil).toHaveBeenCalledTimes(1);
  });

  test("It should show an error message on failures", async () => {
    const spyUseSWR = jest.spyOn(swr, "default");
    spyUseSWR.mockReturnValue({ error: "Error" });

    render(<StatesComponent />);

    await wait(() =>
      expect(screen.getByTestId("id-states-error")).toBeInTheDocument()
    );
  });
});
