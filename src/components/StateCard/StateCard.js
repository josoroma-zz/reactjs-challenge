import PropTypes from "prop-types";
import React from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import useStyles from "./StateCard.style";

function StateCard({ title, population, density }) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader
        title={title}
        classes={{ root: classes.header, title: classes.title }}
      />
      <CardContent>
        <Typography variant="body2">Population: {population}</Typography>
        <Typography variant="body2">Population Density: {density}</Typography>
      </CardContent>
    </Card>
  );
}

StateCard.propTypes = {
  density: PropTypes.string,
  population: PropTypes.string,
  title: PropTypes.string,
};

export default StateCard;
