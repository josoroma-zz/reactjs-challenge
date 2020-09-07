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

import CountiesLazy from "./Counties.lazy";

const CountiesLazyComponent = () => (
  <SearchValueProvider>
    <Router>
      <ErrorHandler>
        <Suspense fallback={<Progress />}>
          <CountiesLazy />
        </Suspense>
      </ErrorHandler>
    </Router>
  </SearchValueProvider>
);

const mockStateId = "36";

const countiesRequestURL = "for=county:*&in=state:36";
const endpointURL = `${endpoints.mainURL}${countiesRequestURL}`;

const mockSuccessfulResponse = [
  {
    NAME: "Allegany County, New York",
    POP: "46091",
    DENSITY: "44.77637219000000",
    state: mockStateId,
    county: "003",
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

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({
    stateId: mockStateId,
  }),
  useRouteMatch: () => ({ url: `/${mockStateId}/counties` }),
}));

const setSearchValueReducer = { type: "setSearchValueReducer", payload: "" };
const dispatch = jest.fn();

describe("Group - Counties Lazy", () => {
  beforeEach(() => {
    fetch.resetMocks();
    jest.resetAllMocks();
    // Mock - useEffect dispatch
    useSearchValueDispatch.mockReturnValue(dispatch);
    dispatch.mockReturnValue(setSearchValueReducer);
  });

  test("It should display a container with a list of counties", async () => {
    csv2objFetcherService.mockResolvedValue(mockSuccessfulResponse);
    searchUtil.mockReturnValue(mockSuccessfulResponse);

    render(<CountiesLazyComponent />);

    await waitForElementToBeRemoved(() =>
      screen.getByTestId("id-request-progress")
    );

    await wait(() => {
      expect(screen.getByTestId("id-counties-container")).toBeInTheDocument();
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

  test("It should display a message when the list of counties is empty", async () => {
    csv2objFetcherService.mockResolvedValue(mockSuccessfulResponse);
    searchUtil.mockReturnValue([]);

    render(<CountiesLazyComponent />);

    await wait(() => {
      expect(
        screen.getByTestId("id-counties-no-search-results")
      ).toBeInTheDocument();
    });

    expect(searchUtil).toHaveBeenCalled();
  });

  test("It should display an error message on request failures", async () => {
    const spyUseSWR = jest.spyOn(swr, "default");
    spyUseSWR.mockReturnValue(mockUnsuccessfulResponse);

    render(<CountiesLazyComponent />);

    await wait(() => {
      expect(screen.getByTestId("id-error-message")).toBeInTheDocument();
    });

    expect(searchUtil).not.toHaveBeenCalled();

    expect(spyUseSWR).toHaveBeenCalledTimes(1);
  });
});
