import React from "react";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import useSWR from "swr";

import { endpoints } from "../../config/constants";
import csv2objFetcherService from "../../services/csv2objFetcherService";
import StateCard from "../StateCard/StateCard";

import useStyles from "./States.style";

function Layout() {
  const classes = useStyles();

  console.log("endpoints.populationByState", endpoints.populationByState);

  const { data, error } = useSWR(
    endpoints.populationByState,
    csv2objFetcherService
  );

  if (error) return "An error has occurred.";
  if (!data) return "Loading...";

  console.log("data", data);

  return (
    <Container className={classes.root} maxWidth="md">
      <Typography variant="h1" className={classes.title}>
        US Population by State{" "}
        <small className={classes.smallTitle}>as per the 2010 US Census</small>
      </Typography>
      <Divider className={classes.divider} />
      {data.map(
        (state) =>
          state.NAME && (
            <StateCard
              key={state.state}
              title={state.NAME}
              population={state.POP}
              density={state.DENSITY}
            />
          )
      )}
    </Container>
  );
}

export default Layout;
