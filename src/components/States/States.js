import React, { useEffect } from "react";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import useSWR from "swr";

import {
  useSearchValueState,
  useSearchValueDispatch,
} from "../../context/SearchValueContext";
import {} from "../../context/SearchValueContext";

import { endpoints } from "../../config/constants";
import searchUtil from "../../utils/searchUtil";
import csv2objFetcherService from "../../services/csv2objFetcherService";
import ContentCard from "../ContentCard/ContentCard";
import ContentMessage from "../ContentMessage/ContentMessage";

import useStyles from "./States.style";

function State() {
  const classes = useStyles();
  const { searchValue } = useSearchValueState();
  const dispatch = useSearchValueDispatch();

  const requestURLConst = "for=state:*&DATE_CODE=1";

  const { data, error } = useSWR(
    `${endpoints.mainURL}${requestURLConst}`,
    csv2objFetcherService
  );

  useEffect(() => {
    dispatch({ type: "setSearchValueReducer", payload: "" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error) {
    return (
      <ContentMessage
        type="message"
        title="Good Catch!"
        description="Let's try again."
      />
    );
  }

  if (!data) {
    return <ContentMessage type="progress" />;
  }

  const searchResults = searchUtil(data.data, searchValue);

  if (searchResults.length === 0) {
    return (
      <ContentMessage
        type="message"
        title="No Search Results Found!"
        description="Let's ask again."
      />
    );
  }

  return (
    <Container className={classes.root} maxWidth="md">
      <Typography variant="h1" className={classes.title}>
        US Population by State{" "}
        <small className={classes.smallTitle}>as per the 2010 US Census</small>
      </Typography>
      <Divider className={classes.divider} />
      {searchResults.map(
        (state) =>
          state.NAME &&
          state.state && (
            <Link
              className={classes.link}
              key={Number(state.state)}
              to={`${Number(state.state)}/counties`}
            >
              <ContentCard
                title={state.NAME || ""}
                population={state.POP || ""}
                density={state.DENSITY || ""}
              />
            </Link>
          )
      )}
    </Container>
  );
}

export default State;
