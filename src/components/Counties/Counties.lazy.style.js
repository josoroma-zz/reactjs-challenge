import { makeStyles } from "@material-ui/core/styles";

const Style = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(6),
    paddingTop: theme.spacing(20),
    paddingBottom: 0,
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(3),
      paddingTop: theme.spacing(16),
    },
  },
  link: {
    textDecoration: "none",
  },
  title: {
    fontSize: 36,
    fontWeight: 500,
    lineHeight: 1.1,
    [theme.breakpoints.down("sm")]: {
      fontSize: 14,
    },
  },
  smallTitle: {
    fontSize: "65%",
    fontWeight: 400,
    lineHeight: 1,
    color: "#777",
  },
  divider: {
    margin: `${theme.spacing(3)}px 0`,
  },
}));

export default Style;
