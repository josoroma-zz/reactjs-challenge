import React from "react";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import { useParams } from "react-router-dom";
import useSWR from "swr";

import { endpoints } from "../../config/constants";
import csv2objFetcherService from "../../services/csv2objFetcherService";
import ContentCard from "../ContentCard/ContentCard";
import ContentMessage from "../ContentMessage/ContentMessage";

import useStyles from "./Counties.style";

function Counties() {
  const classes = useStyles();
  const { stateId } = useParams();

  const requestURLConst = `for=county:*&in=state:${Number(stateId)}`;

  const { data, error } = useSWR(
    `${endpoints.mainURL}${requestURLConst}`,
    csv2objFetcherService
  );

  if (error) {
    return (
      <Link className={classes.link} to={"/"}>
        <ContentMessage
          type="message"
          title="No data found!"
          description="Let's try with another State."
        />
      </Link>
    );
  }

  if (!data) {
    return <ContentMessage type="progress" />;
  }

  const { data: response } = data;

  return (
    <Container className={classes.root} maxWidth="md">
      <Typography variant="h1" className={classes.title}>
        Counties
      </Typography>
      <Divider className={classes.divider} />
      {response.map(
        (county) =>
          county.NAME &&
          county.state &&
          county.county && (
            <ContentCard
              key={Number(county.county)}
              title={county.NAME}
              population={county.POP}
              density={county.DENSITY}
            />
          )
      )}
    </Container>
  );
}

export default Counties;
