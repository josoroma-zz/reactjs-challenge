import React from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import useStyles from "./StateCard.style";

function StateCard() {
  const classes = useStyles();

  return (
    <Card>
      <CardHeader
        title="Shrimp and Chorizo Paella"
        classes={{ root: classes.header, title: classes.title }}
      />
      <CardContent>
        <Typography variant="body2">
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the
          mussels, if you likes.
        </Typography>
      </CardContent>
    </Card>
  );
}

export default StateCard;
