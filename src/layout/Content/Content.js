import React from "react";
import PropTypes from "prop-types";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

import useStyles from "./Content.style";

function Layout() {
  const classes = useStyles();

  return (
    <div>
      <Container className={classes.root} maxWidth="md">
        <Typography>
          {[...new Array(12)]
            .map(
              () =>
                `Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition. Organically grow the holistic world view of disruptive innovation via workplace diversity and empowerment.`
            )
            .join("\n")}
        </Typography>
      </Container>
    </div>
  );
}

export default Layout;
