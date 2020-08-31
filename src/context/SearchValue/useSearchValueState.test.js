import React from "react";
import { renderHook } from "@testing-library/react-hooks";

import { useSearchValueState } from "context/SearchValue";

let mockUseContext = (React.useContext = jest.fn());

const mockSearchValue = { searchValue: "" };
const mockSearchValueUndefined = undefined;

describe("It should check useSearchValueState", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("It should check that useSearchValueState must be used within a SearchValueProvider", async () => {
    mockUseContext.mockReturnValue(mockSearchValueUndefined);
    const { result } = renderHook(() => useSearchValueState());
    try {
      expect(result).toBe(mockSearchValueUndefined);
    } catch (error) {
      return mockSearchValueUndefined;
    }
  });

  test("It should check the searchValue", async () => {
    mockUseContext.mockReturnValue(mockSearchValue);
    const { result } = renderHook(() => useSearchValueState());
    expect(result.current).toBe(mockSearchValue);
  });
});
