import React from "react";
import { useLocation } from "react-router-dom";
import _get from "lodash.get";

import { ErrorPage } from "components";

/**
 * Not exactly a Context but it behaves the same, as a wrapper.
 */
const ErrorHandler = ({ children }) => {
  const location = useLocation();

  const status = _get(location, "state.status", 0);
  const error = _get(location, "state.error", "");

  // console.log("===> ErrorHandler - API Status: ", status);
  // console.log("===> ErrorHandler - API Error: ", error);

  switch (true) {
    case status === 400:
      return <ErrorPage status={status} error={error} />;

    // Add new cases for other types of errors here.

    default:
      return children;
  }
};

export default ErrorHandler;
