import PropTypes from "prop-types";
import React from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import { formatNumber, formatFloat } from "utils";
import useStyles from "./ContentCard.style";

const ContentCard = ({ title, population, density }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader
        title={title}
        classes={{ root: classes.header, title: classes.title }}
      />
      <CardContent>
        <Typography variant="body2">
          Population: {formatNumber(population)}
        </Typography>
        <Typography variant="body2">
          Population Density: {formatFloat(density)}
        </Typography>
      </CardContent>
    </Card>
  );
};

ContentCard.defaultProps = {
  density: "",
  population: "",
  title: "",
};

ContentCard.propTypes = {
  density: PropTypes.string,
  population: PropTypes.string,
  title: PropTypes.string,
};

export default ContentCard;
