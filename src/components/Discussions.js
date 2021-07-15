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
      background: "#71AECA",
      opacity: 0.7,
    },
  },
  content: {
    backgroundColor: "#71AECA",
    padding: 20,
    color: "#fff",
  },
}));

export default function Discussions({ auth }) {
  const classes = useStyles();
  return (
    <div>
      <div className={classes.root}>
        <Grid container spacing={2}>
          {auth.isAuthenticated ? (
            <h1>Discussions</h1>
          ) : (
            <>
              {" "}
              <Grid item md={8} xs={12}>
                <div className={classes.container}>
                  <img
                    src={require("assets/images/2.jpeg").default}
                    alt=""
                    className={classes.image}
                  />
                </div>
              </Grid>
              <Grid item md={4} xs={12}>
                <div className={classes.content}>
                  <h1>Discussions</h1>
                  Great things start with small discussions ❤️ Join this awesome
                  WIT space’s Discussion Section and share what’s in your mind.
                  Ever thought of asking for an appraisal from your manager but
                  hesisted? Ask from other women in tech, what’s their take on
                  this? Feel free to talk your heart out.
                </div>
              </Grid>
            </>
          )}
        </Grid>
      </div>
    </div>
  );
}
