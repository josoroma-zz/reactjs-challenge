import PropTypes from "prop-types";
import React from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Container from "@material-ui/core/Container";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";

import useStyles from "./ContentMessage.style";

function ContentMessage({ title, description, type }) {
  const classes = useStyles();
  const isMessage = type === "message";
  const containerClass = isMessage ? classes.message : classes.progress;

  return (
    <Container className={containerClass} maxWidth="md">
      {isMessage ? (
        <Card>
          <CardHeader
            title={title}
            classes={{ root: classes.header, title: classes.title }}
          />
          <CardContent>
            <Typography variant="body2">{description}</Typography>
          </CardContent>
        </Card>
      ) : (
        <CircularProgress />
      )}
    </Container>
  );
}

ContentMessage.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  type: PropTypes.string,
};

export default ContentMessage;
