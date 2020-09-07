import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import CircularProgress from "@material-ui/core/CircularProgress";
import Container from "@material-ui/core/Container";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";

import useStyles from "./ContentMessage.style";

const ContentMessage = ({ description, title, type }) => {
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
        <div data-testid="id-content-message-progress">
          <CircularProgress />
        </div>
      )}
    </Container>
  );
};

ContentMessage.defaultProps = {
  type: "message",
};

ContentMessage.propTypes = {
  description: PropTypes.string,
  title: PropTypes.string,
  type: PropTypes.string.isRequired,
};

export default ContentMessage;
