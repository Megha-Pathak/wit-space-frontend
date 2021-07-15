import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Auth } from "aws-amplify";
import {
  Grid,
  Container,
  TextField,
  Button,
  Typography,
  makeStyles,
  CssBaseline,
  InputLabel,
  MenuItem,
  Select
} from "@material-ui/core";
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

export default function Signup() {
  // State Variables
  const classes = useStyles();
  const history = useHistory();
  const [name, setName] = useState("");
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [gender, setAge] = useState();

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await Auth.signUp({
        username,
        password,
        attributes: {
          name: name,
          gender: gender,
        },
      });

      let message =
        "Verification email successfully. Please verify your account by clicking that link before logging in.";
      toast.success(message, {
        position: "top-right",
        autoClose: 0,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      history.push(`/login`);
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 0,
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
          Signup
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Name"
                variant="outlined"
                required
                fullWidth
                className={classes.field}
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email"
                variant="outlined"
                required
                fullWidth
                className={classes.field}
                type="email"
                value={username}
                onChange={(e) => setusername(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={(e) => setpassword(e.target.value)}
                label="Password (min 8 chars: lc+uc+sc+num)"
                variant="outlined"
                required
                fullWidth
                type="password"
                value={password}
                className={classes.field}
              />
            </Grid>
            <Grid item xs={12}>
          <p>Note: Some sections of this app are available for women and non-binary individuals only.</p>
          </Grid>
          <Grid item xs={12}>
          <InputLabel id="demo-simple-select-label">Gender</InputLabel>
          <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={gender}
          onChange={handleChange}
        >
          <MenuItem value= "Female">Female or Non binary</MenuItem>
          <MenuItem value="Male">Male </MenuItem>
        </Select>

            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Signup
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/login" variant="body2">
                Already have an account? Sign In
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
