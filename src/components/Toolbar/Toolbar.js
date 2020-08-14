import React from "react";
import AppBar from "@material-ui/core/AppBar";
import { default as AppToolbar } from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import useStyles from "./Toolbar.style";

function Toolbar() {
  const classes = useStyles();

  return (
    <header>
      <AppBar>
        <AppToolbar className={classes.toolbar}>
          <Typography variant="h6">Population Estimates Program</Typography>
        </AppToolbar>
      </AppBar>
    </header>
  );
}

export default Toolbar;
