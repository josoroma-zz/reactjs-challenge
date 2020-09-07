import React from "react";

import {
  act,
  render,
  screen,
  wait,
  waitForElementToBeRemoved,
} from "@testing-library/react";

import { createMemoryHistory } from "history";

import { SearchValueProvider } from "context/SearchValue";
import csv2objFetcherService from "services/csv2objFetcherService";
import searchUtil from "utils/searchUtil";

import Routes from "./Routes";

jest.mock("services/csv2objFetcherService");
jest.mock("utils/searchUtil");

const MockToolbar = () => <div>Mock Toolbar</div>;

const Layout = {
  Toolbar: MockToolbar,
};

const mockStatesSuccessfulResponse = [
  {
    NAME: "Allegany County, New York",
    POP: "46091",
    DENSITY: "44.77637219000000",
    state: "36",
    county: "003",
  },
];

const mockCountiesSuccessfulResponse = [
  {
    NAME: "Allegany County, New York",
    POP: "46091",
    DENSITY: "44.77637219000000",
    state: "36",
    county: "003",
  },
];

const routesComponent = ({ history, Layout }) => {
  render(
    <SearchValueProvider>
      <Routes history={history} Layout={Layout} />
    </SearchValueProvider>
  );
};

describe("Suite - Routes Component", () => {
  let history = null;

  beforeEach(() => {
    jest.resetAllMocks();
    history = createMemoryHistory();
  });

  test("It should test the behavior of the default States route", async () => {
    history.push("/");

    csv2objFetcherService.mockResolvedValue(mockStatesSuccessfulResponse);
    searchUtil.mockReturnValue(mockStatesSuccessfulResponse);

    act(() => {
      routesComponent({ history, Layout });
    });

    await waitForElementToBeRemoved(() =>
      screen.getByTestId("id-request-progress")
    );

    await wait(() => {
      expect(screen.getByText(/States/)).toBeInTheDocument();
    });
  });

  test("It should test the behavior of the Counties route", async () => {
    history.push("/36/counties");

    csv2objFetcherService.mockResolvedValue(mockCountiesSuccessfulResponse);
    searchUtil.mockReturnValue(mockCountiesSuccessfulResponse);

    routesComponent({ history, Layout });

    await waitForElementToBeRemoved(() =>
      screen.getByTestId("id-request-progress")
    );

    await wait(() => {
      expect(screen.getByText(/Counties/)).toBeInTheDocument();
    });
  });

  test("It should test the behavior of a non existent route", async () => {
    history.push("/error-page");

    routesComponent({ history, Layout });

    await waitForElementToBeRemoved(() =>
      screen.getByTestId("id-request-progress")
    );

    await wait(() => {
      expect(screen.getByText(/Page Status/)).toBeInTheDocument();
    });
  });
});
