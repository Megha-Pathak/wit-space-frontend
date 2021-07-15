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
      background: "#FF3E74",
      opacity: 0.5,
    },
  },
  content: {
    backgroundColor: "#FF3E74",
    padding: 20,
    color: "#fff",
  },
}));

export default function DevSelfCare({ auth }) {
  const classes = useStyles();
  return (
    <div>
      <div className={classes.root}>
        <Grid container spacing={2}>
          {auth.isAuthenticated ? (
            <h1>Dev Self Care</h1>
          ) : (
            <>
              {" "}
              <Grid item md={8} xs={12}>
                <div className={classes.container}>
                  <img
                    src={require("assets/images/6.jpg").default}
                    alt=""
                    className={classes.image}
                  />
                </div>
              </Grid>
              <Grid item md={4} xs={12}>
                <div className={classes.content}>
                  <h1>Dev Self Care</h1>
                  Engaging in a self-care routine has been clinically proven to
                  reduce anxiety, stress, improve concentration and overall
                  productivity. This is your space to take time off and enjoy
                  time with peer devs 🍵️
                </div>
              </Grid>{" "}
            </>
          )}
        </Grid>
      </div>
    </div>
  );
}
