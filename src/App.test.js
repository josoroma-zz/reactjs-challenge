import React from "react";
import { render } from "@testing-library/react";

import App from "./App";

const AppComponent = () => <App />;

describe("Suite App", () => {
  test("It should render the App component", async () => {
    render(<AppComponent />);
  });
});
