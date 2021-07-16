import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
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
      background: "#2883BB",
      opacity: 0.7,
    },
  },
  content: {
    backgroundColor: "#2883BB",
    padding: 20,
    color: "#fff",
  },
}));

export default function Home(props) {
  const classes = useStyles();
  return (
    <div>
      <div className={classes.root}>
        <Grid container spacing={2}>
          <Grid item md={8} xs={12}>
            <div className={classes.container}>
              <img
                src={require("assets/images/1.jpeg").default}
                alt=""
                className={classes.image}
              />
            </div>
          </Grid>
          <Grid item md={4} xs={12}>
            <div className={classes.content}>
              <h1>Welcome to WIT SPACE</h1>
              Together we all can achieve more 💜 Here we have created an exciting and safe space for all the awesome women in tech like you. This is your one stop place for all discussions, doubts, resources, tips and a lot more 🤗 once again welcome to your next home!
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
