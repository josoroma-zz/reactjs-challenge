import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import { default as AppToolbar } from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import SearchBar from "material-ui-search-bar";

import { useSearchValueDispatch } from "../../context/SearchValueContext";

import useStyles from "./Toolbar.style";

function Toolbar() {
  const classes = useStyles();
  const [searchValue] = useState("");
  const dispatch = useSearchValueDispatch();

  return (
    <header>
      <AppBar>
        <AppToolbar className={classes.toolbar}>
          <Grid container>
            <Grid item xs={6}>
              <Typography className={classes.title} variant="h6">
                Population Estimates
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <SearchBar
                value={searchValue}
                onChange={(value) => {
                  dispatch({ type: "setSearchValueReducer", payload: value });
                }}
                onCancelSearch={() =>
                  dispatch({ type: "setSearchValueReducer", payload: "" })
                }
              />
            </Grid>
          </Grid>
        </AppToolbar>
      </AppBar>
    </header>
  );
}

export default Toolbar;
