import React from "react";
import { render, screen } from "@testing-library/react";

// Provider
import { SearchValueProvider } from "./SearchValueContext";
// Consumer
const SearchValueConsumer = () => <>Search Value Consumer</>;

test("It should check if SearchValueProvider behavior is working fine", () => {
  const providerWrapper = ({ children }) => (
    <SearchValueProvider>{children}</SearchValueProvider>
  );

  render(<SearchValueConsumer />, { providerWrapper });

  expect(screen.getByText("Search Value Consumer")).toBeInTheDocument();
});
