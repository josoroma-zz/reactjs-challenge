import React, { useEffect } from "react";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import { Redirect, useParams, useHistory } from "react-router-dom";
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

import useStyles from "./Counties.lazy.style";

const CountiesLazy = () => {
  const classes = useStyles();
  const history = useHistory();

  const { stateId } = useParams();

  const { searchValue } = useSearchValueState();
  const dispatch = useSearchValueDispatch();

  const requestURLConst = `for=county:*&in=state:${Number(stateId)}`;

  const { data } = useSWR(
    `${endpoints.mainURL}${requestURLConst}`,
    csv2objFetcherService,
    { suspense: true }
  );

  const response = {
    status: _get(data, "status", 200),
    data: _get(data, "data", []),
    error: _get(data, "error", ""),
  };

  useEffect(() => {
    dispatch({ type: "setSearchValueReducer", payload: "" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (response.status !== 200 && response.error !== "") {
    return (
      <div data-testid="id-counties-response-error">
        <Redirect
          to={{
            pathname: history.location.pathname,
            state: { status: response.status, error: response.error },
          }}
        />
      </div>
    );
  }

  const searchResults = searchUtil(response.data, searchValue);

  if (searchResults && searchResults.length === 0) {
    return (
      <div data-testid="id-counties-no-search-results">
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
      data-testid="id-counties-container"
      className={classes.root}
      maxWidth="md"
    >
      <Typography variant="h1" className={classes.title}>
        Counties
      </Typography>
      <Divider className={classes.divider} />
      {searchResults.map(
        (county) =>
          county.NAME &&
          county.state &&
          county.county && (
            <ContentCard
              // Key
              key={Number(county.county)}
              // Rest of the Props
              density={county.DENSITY}
              population={county.POP}
              title={county.NAME}
            />
          )
      )}
    </Container>
  );
};

export default CountiesLazy;
