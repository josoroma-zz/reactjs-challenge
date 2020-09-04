import React, { useEffect } from "react";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import { Redirect, useHistory } from "react-router-dom";
import _get from "lodash.get";
import useSWR from "swr";

import {
  useSearchValueDispatch,
  useSearchValueState,
} from "context/SearchValue";

import { endpoints } from "config";
import { searchUtil } from "utils";
import { csv2objFetcherService } from "services";

import { ContentCard, ContentMessage } from "components";

import useStyles from "./States.lazy.style";

const StatesLazy = () => {
  const classes = useStyles();
  const history = useHistory();

  const { searchValue } = useSearchValueState();
  const dispatch = useSearchValueDispatch();

  const requestURLConst = "for=state:*&DATE_CODE=1";

  const { data } = useSWR(
    `${endpoints.mainURL}${requestURLConst}`,
    csv2objFetcherService,
    { suspense: true }
  );

  const responseStatus = _get(data, "status");
  const responseError = _get(data, "error", "");

  useEffect(() => {
    dispatch({ type: "setSearchValueReducer", payload: "" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (responseStatus !== 200 && responseError !== "") {
    return (
      <div data-testid="id-states-response-error">
        <Redirect
          to={{
            pathname: history.location.pathname,
            state: { status: responseStatus, error: responseError },
          }}
        />
      </div>
    );
  }

  const searchResults = searchUtil(_get(data, "data", []), searchValue);

  if (searchResults && searchResults.length === 0) {
    return (
      <div data-testid="id-states-no-search-results">
        <ContentMessage
          type="message"
          title="No Results Found!"
          description="Let's ask again."
        />
      </div>
    );
  }

  return (
    <Container
      data-testid="id-states-container"
      className={classes.root}
      maxWidth="md"
    >
      <Typography variant="h1" className={classes.title}>
        States
      </Typography>
      <Divider className={classes.divider} />
      {searchResults.map(
        (state) =>
          state.NAME &&
          state.state && (
            <Link
              // Key
              key={Number(state.state)}
              // Rest of the Props
              className={classes.link}
              to={`${Number(state.state)}/counties`}
            >
              <ContentCard
                // Key
                key={Number(state.state)}
                // Rest of the Props
                density={state.DENSITY}
                population={state.POP}
                title={state.NAME}
              />
            </Link>
          )
      )}
    </Container>
  );
};

export default StatesLazy;
