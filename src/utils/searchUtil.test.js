import searchUtil from "./searchUtil";

const mockParamSubstr = "New York";
const mockParamSubstrWithNoMatch = "None";

const mockParamArray = [
  {
    NAME: "Alabama",
    POP: "4779736",
    DENSITY: "94.37419562200000",
    DATE_CODE: "1",
    state: "01",
  },
  {
    NAME: mockParamSubstr,
    POP: "19378102",
    DENSITY: "411.21713488000000",
    DATE_CODE: "1",
    state: "36",
  },
  {
    NAME: "Wyoming",
    POP: "563626",
    DENSITY: "5.80526855310000",
    DATE_CODE: "1",
    state: "56",
  },
];

const mockOutput = [
  {
    NAME: mockParamSubstr,
    POP: "19378102",
    DENSITY: "411.21713488000000",
    DATE_CODE: "1",
    state: "36",
  },
];

test("It should check searchUtil util behavior when there is a match", () => {
  const output = searchUtil(mockParamArray, mockParamSubstr);
  expect(output).toStrictEqual(mockOutput);
});

test("It should check searchUtil util behavior when there is no match", () => {
  const output = searchUtil(mockParamArray, mockParamSubstrWithNoMatch);
  expect(output).toStrictEqual([]);
});
