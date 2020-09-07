import { endpoints } from "config";

import * as service from "./csv2objFetcherService";

const mockEndpointURL = `${endpoints.mainURL}for=state:*&DATE_CODE=1`;

const mockResponse = [
  {
    NAME: "Alaska",
    POP: "710231",
    DENSITY: "1.24380020440000",
    DATE_CODE: "1",
    state: "02",
  },
  {
    NAME: "New York",
    POP: "19378102",
    DENSITY: "411.21713488000000",
    DATE_CODE: "1",
    state: "36",
  },
];

const mockSucessfulResponse = { data: [{}], error: "", status: 200 };
const mockUnsucessfulResponse = { data: [], error: "Bad Request", status: 400 };
const mockParamURLEmptyResponse = { data: [], error: "", status: 0 };

beforeEach(() => {
  fetch.resetMocks();
});

test("It should csv2objFetcherService behavior when successful response", async () => {
  fetch.mockResponse(JSON.stringify(mockResponse));

  const input = await service.default(mockEndpointURL);

  const output = mockSucessfulResponse;

  expect(input).toStrictEqual(output);
});

test("It should csv2objFetcherService behavior when empty response", async () => {
  fetch.mockResponse(null);

  const input = await service.default("");

  const output = mockParamURLEmptyResponse;

  expect(input).toStrictEqual(output);
});

test("It should csv2objFetcherService behavior when unsuccessful response", async () => {
  fetch.mockResponse(null, { status: 400 });

  const input = await service.default(mockEndpointURL);

  const output = mockUnsucessfulResponse;

  expect(input).toStrictEqual(output);
});
