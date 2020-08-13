import { makeStyles } from "@material-ui/core/styles";

const Style = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(6),
    paddingTop: theme.spacing(14),
    paddingBottom: theme.spacing(2),
  },
  title: {
    fontSize: 36,
    fontWeight: 500,
    lineHeight: 1.1,
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
