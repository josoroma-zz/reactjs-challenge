import React, { useEffect } from "react";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import useSWR from "swr";

import {
  useSearchValueDispatch,
  useSearchValueState,
} from "context/SearchValue";

import { endpoints } from "config/constants";
import searchUtil from "utils/searchUtil";
import csv2objFetcherService from "services/csv2objFetcherService";

import { ContentCard } from "components";
import { ContentMessage } from "components";

import useStyles from "./States.style";

const State = () => {
  const classes = useStyles();
  const { searchValue } = useSearchValueState();
  const dispatch = useSearchValueDispatch();

  const statesRequestURL = "for=state:*&DATE_CODE=1";

  const { data, error } = useSWR(
    `${endpoints.mainURL}${statesRequestURL}`,
    csv2objFetcherService
  );

  useEffect(() => {
    dispatch({ type: "setSearchValueReducer", payload: "" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error) {
    return (
      <div data-testid="id-states-error">
        <ContentMessage
          type="message"
          title="Good Catch!"
          description="Let's try again."
        />
      </div>
    );
  }

  if (!data) {
    return (
      <div data-testid="id-states-progress">
        <ContentMessage type="progress" />
      </div>
    );
  }

  const searchResults = searchUtil(data.data, searchValue);

  if (
    (Array.isArray(searchResults) && searchResults.length === 0) ||
    searchResults === undefined
  ) {
    return (
      <div data-testid="id-states-no-search-results">
        <ContentMessage
          type="message"
          title="No Search Results Found!"
          description="Let's ask again."
        />
      </div>
    );
  } else {
    return (
      <Container
        data-testid="id-states-container"
        className={classes.root}
        maxWidth="md"
      >
        <Typography variant="h1" className={classes.title}>
          US Population by State{" "}
          <small className={classes.smallTitle}>
            as per the 2010 US Census
          </small>
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
                  density={state.DENSITY}
                  population={state.POP}
                  title={state.NAME}
                />
              </Link>
            )
        )}
      </Container>
    );
  }
};

export default State;
