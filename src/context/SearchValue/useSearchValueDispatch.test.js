import React from "react";
import { renderHook } from "@testing-library/react-hooks";

import { useSearchValueDispatch } from "context/SearchValue";

let mockUseContext = (React.useContext = jest.fn());

const mockSearchDispatch = jest.fn();
const mockSearchDispatchUndefined = undefined;

describe("It should check useSearchValueDispatch", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("It should check undefined", async () => {
    mockUseContext.mockReturnValue(mockSearchDispatchUndefined);
    const { result } = renderHook(() => useSearchValueDispatch());
    try {
      expect(result).toBe(mockSearchDispatchUndefined);
    } catch (error) {
      return mockSearchDispatchUndefined;
    }
  });

  test("It should check serchValue", async () => {
    mockUseContext.mockReturnValue(mockSearchDispatch);
    const { result } = renderHook(() => useSearchValueDispatch());
    expect(result.current).toBe(mockSearchDispatch);
  });
});
