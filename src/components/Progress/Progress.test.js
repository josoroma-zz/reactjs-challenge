import React from "react";
import { render, screen } from "@testing-library/react";

import Progress from "./Progress";

const ErrorPageComponent = () => <Progress />;

describe("Suite - Progress Component", () => {
  test("It should display a progress loader", () => {
    render(<ErrorPageComponent />);

    expect(screen.getByTestId("id-request-progress")).toBeInTheDocument();
  });
});
