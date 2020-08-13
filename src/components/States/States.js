import React from "react";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";

import StateCard from "../StateCard/StateCard";

import useStyles from "./States.style";

function Layout() {
  const classes = useStyles();

  return (
    <Container className={classes.root} maxWidth="md">
      <Typography variant="h1" className={classes.title}>
        US Population by State{" "}
        <small className={classes.smallTitle}>as per the 2010 US Census</small>
      </Typography>
      <Divider className={classes.divider} />
      <StateCard title={"title"} population={10} density={1} />
    </Container>
  );
}

export default Layout;
