import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { render, screen } from "@testing-library/react";

import ContentCard from "./ContentCard";

const contentCardComponent = ({ density, population, title }) => {
  render(
    <Router>
      <ContentCard density={density} population={population} title={title} />
    </Router>
  );
};

describe("Suite - ContentCard Component", () => {
  test("It should display a dynamic Page Status Error", () => {
    contentCardComponent({
      density: "19378102",
      population: "19378102",
      title: "New York",
    });

    const title = screen.getByText("New York");
    const population = screen.getByText("Population: 19,378,102");
    const density = screen.getByText("Population Density: 19378102.00");

    expect(title).toBeInTheDocument();
    expect(population).toBeInTheDocument();
    expect(density).toBeInTheDocument();
  });
});
