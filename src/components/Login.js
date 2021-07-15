import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Auth } from "aws-amplify";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { toast } from "react-toastify";
toast.configure();

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn({ auth }) {
  // State Variables
  const classes = useStyles();
  const history = useHistory();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [resendEmail, setResendEmail] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await Auth.signIn(email, password);
      let message = "Signed in successfully! Welcome back!!";
      toast.success(message, {
        position: "top-right",
        autoClose: 0,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      auth.setAuthenticated(true);
      auth.setUser(res);
      history.push(`/`);
    } catch (err) {
      let error = err.message;
      if (err.message === "User is not confirmed.") {
        error =
          "Your account verification not complete. Please complete the verification before logging in.";
      }
      toast.error(error, {
        position: "top-right",
        autoClose: 0,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      if (err.message === "User is not confirmed.") setResendEmail(true);
    }
  };

  // Resend Confirmation Link
  const resendConfirmationLink = async (e) => {
    e.preventDefault();
    try {
      await Auth.resendSignUp(email);
      toast.success(
        "Verification email resent successfully. Please verify your account by clicking that link before logging in.",
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        }
      );
      setResendEmail(false);
    } catch (err) {
      let error = err.message || "Something went wrong!";
      toast.error(error, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                value={email}
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={(e) => setemail(e.target.value)}
              />
              {resendEmail && (
                <Typography variant="subtitle2" gutterBottom align="right">
                  <span onClick={(e) => resendConfirmationLink(e)}>
                    {" "}
                    Missed Confirmation Link?
                  </span>
                </Typography>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Login
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/signup" variant="body2">
                Already have an account? Sign up
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
