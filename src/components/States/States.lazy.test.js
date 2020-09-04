import React, { Suspense } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import * as swr from "swr";
import {
  render,
  screen,
  wait,
  waitForElementToBeRemoved,
} from "@testing-library/react";

import { ErrorHandler } from "context/ErrorHandler";

import {
  SearchValueProvider,
  useSearchValueDispatch,
} from "context/SearchValue";

import csv2objFetcherService from "services/csv2objFetcherService";
import searchUtil from "utils/searchUtil";
import { endpoints } from "config";

import { Progress } from "components";

import StatesLazy from "./States.lazy";

const StatesLazyComponent = () => (
  <SearchValueProvider>
    <Router>
      <ErrorHandler>
        <Suspense fallback={<Progress />}>
          <StatesLazy />
        </Suspense>
      </ErrorHandler>
    </Router>
  </SearchValueProvider>
);

const mockStateId = "36";

const statesRequestURL = "for=state:*&DATE_CODE=1";
const endpointURL = `${endpoints.mainURL}${statesRequestURL}`;

const mockSuccessfulResponse = [
  {
    NAME: "New York",
    POP: "19378102",
    DENSITY: "411.21713488",
    DATE_CODE: "1",
    state: mockStateId,
  },
];

const mockUnsuccessfulResponse = {
  data: {
    data: [],
    error: "Bad Request",
    status: 400,
  },
};

jest.mock("context/SearchValue/useSearchValueDispatch");
jest.mock("services/csv2objFetcherService");
jest.mock("utils/searchUtil");

const setSearchValueReducer = { type: "setSearchValueReducer", payload: "" };
const dispatch = jest.fn();

describe("Group - States Lazy", () => {
  beforeEach(() => {
    fetch.resetMocks();
    jest.resetAllMocks();
    // Mock - useEffect dispatch
    useSearchValueDispatch.mockReturnValue(dispatch);
    dispatch.mockReturnValue(setSearchValueReducer);
  });

  test("It should display a container with a list of states", async () => {
    csv2objFetcherService.mockResolvedValue(mockSuccessfulResponse);
    searchUtil.mockReturnValue(mockSuccessfulResponse);

    render(<StatesLazyComponent />);

    await waitForElementToBeRemoved(() =>
      screen.getByTestId("id-request-progress")
    );

    await wait(() => {
      expect(screen.getByTestId("id-states-container")).toBeInTheDocument();
    });

    mockSuccessfulResponse.forEach((county) => {
      expect(screen.getByText(county.NAME)).toBeInTheDocument() &&
        expect(screen.getByText(county.state)).toBeInTheDocument() &&
        expect(screen.getByText(county.county)).toBeInTheDocument();
    });

    expect(csv2objFetcherService).toHaveBeenCalledWith(endpointURL);
    expect(csv2objFetcherService).toHaveBeenCalledTimes(1);

    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith(setSearchValueReducer);

    expect(searchUtil).toHaveBeenCalled();
  });

  test("It should display a message when the list of states is empty", async () => {
    csv2objFetcherService.mockResolvedValue(mockSuccessfulResponse);
    searchUtil.mockReturnValue([]);

    render(<StatesLazyComponent />);

    await wait(() => {
      expect(
        screen.getByTestId("id-states-no-search-results")
      ).toBeInTheDocument();
    });

    expect(searchUtil).toHaveBeenCalled();
  });

  test("It should display an error message on request failures", async () => {
    const spyUseSWR = jest.spyOn(swr, "default");
    spyUseSWR.mockReturnValue(mockUnsuccessfulResponse);

    render(<StatesLazyComponent />);

    await wait(() => {
      expect(screen.getByTestId("id-error-message")).toBeInTheDocument();
    });

    expect(searchUtil).not.toHaveBeenCalled();
  });
});
