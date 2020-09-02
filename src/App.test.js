import React from "react";
import { render } from "@testing-library/react";

import App from "./App";

const AppComponent = () => <App />;

describe("It should test the app component", () => {
  test("It should render the app component", async () => {
    render(<AppComponent />);
  });
});
