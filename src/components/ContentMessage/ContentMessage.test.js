import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { render, screen } from "@testing-library/react";

import ContentMessage from "./ContentMessage";

const contentMessageComponent = ({ description, title, type }) => {
  render(
    <Router>
      <ContentMessage description={description} title={title} type={type} />
    </Router>
  );
};

describe("Suite - ContentMessage Component", () => {
  test("It should display both title and description when the type is message", () => {
    contentMessageComponent({
      description: "Description",
      title: "Title",
      type: "message",
    });

    const title = screen.getByText("Title");
    const description = screen.getByText("Description");

    expect(title).toBeInTheDocument();
    expect(description).toBeInTheDocument();
  });

  test("It should display a circular progress component when the type is progress", () => {
    contentMessageComponent({
      description: "",
      title: "",
      type: "progress",
    });

    expect(
      screen.getByTestId("id-content-message-progress")
    ).toBeInTheDocument();
  });
});
