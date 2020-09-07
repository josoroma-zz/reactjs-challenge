import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { ContentMessage } from "components";

import useStyles from "./ErrorPage.style";

const ErrorPage = ({ error, status }) => {
  const classes = useStyles();

  return (
    <div data-testid="id-error-message">
      <Link className={classes.link} to={"/"}>
        <ContentMessage
          type="message"
          title={status ? `API Status - ${status}` : "Page Status"}
          description={error ? `${error}.` : "Not Found!"}
        />
      </Link>
    </div>
  );
};

ErrorPage.propTypes = {
  error: PropTypes.string,
  status: PropTypes.number,
};

export default ErrorPage;
