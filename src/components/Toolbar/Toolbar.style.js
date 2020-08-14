import { makeStyles } from "@material-ui/core/styles";

const Style = makeStyles((theme) => ({
  toolbar: {
    minHeight: theme.spacing(12),
  },
  link: {
    textDecoration: "none",
    color: theme.palette.common.white,
  },
  title: {
    marginTop: theme.spacing(1),
  },
}));

export default Style;
