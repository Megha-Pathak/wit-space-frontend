import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  image: {
    width: "100%",
  },
  container: {
    position: "relative",
    "&::after": {
      content: '""',
      display: "block",
      position: "absolute",
      top: 0,
      left: 0,
      height: "100%",
      width: "100%",
      background: "#0E7867",
      opacity: 0.7,
    },
  },
  content: {
    backgroundColor: "#0E7867",
    padding: 20,
    color: "#fff",
  },
}));

export default function Opportunities() {
  const classes = useStyles();
  return (
    <div>
      <div className={classes.root}>
        <Grid container spacing={2}>
          <Grid item md={8} xs={12}>
            <div className={classes.container}>
              <img
                src={require("assets/images/4.jpeg").default}
                alt=""
                className={classes.image}
              />
            </div>
          </Grid>
          <Grid item md={4} xs={12}>
            <div className={classes.content}>
              <h1>Opportunities</h1>
              The grid creates visual consistency between layouts while allowing
              flexibility across a wide variety of designs. Material Design’s
              responsive UI is based on a 12-column grid layout.
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
