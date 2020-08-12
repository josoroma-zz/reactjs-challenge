import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

function Layout() {
  return (
    <>
      <header>
        <AppBar>
          <Toolbar>
            <Typography variant="h6">Josoroma ReactJS Challenge</Typography>
          </Toolbar>
        </AppBar>
      </header>
    </>
  );
}

export default Layout;
