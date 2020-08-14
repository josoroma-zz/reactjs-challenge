import { makeStyles } from "@material-ui/core/styles";

const Style = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(3),
  },
  header: {
    backgroundColor: "#fafafa",
    paddingBottom: 0,
  },
  title: {
    marginTop: 0,
    marginBottom: theme.spacing(2),
    fontSize: theme.spacing(2),
  },
}));

export default Style;
