import searchValueReducer from "./searchValueReducer";

describe("Suite - searchValueReducer", () => {
  test("It should check the behavior of the `Unhandled action type` case", () => {
    const action = {
      type: "undefined",
    };

    try {
      const output = searchValueReducer(undefined, action);
      expect(output).toStrictEqual({});
    } catch (error) {}
  });

  test("It should check the behavior of the `setSearchValueReducer` case", () => {
    const searchValue = "Texas";

    const action = {
      payload: searchValue,
      type: "setSearchValueReducer",
    };

    const output = searchValueReducer({}, action);

    expect(output).toStrictEqual({ searchValue: searchValue });
  });
});
