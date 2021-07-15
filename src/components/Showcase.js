import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Header from "./Header"
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import { Auth } from "aws-amplify";
import React from "react";
import {
  Container,
  TextField,
  TextareaAutosize,
  Button,
  Typography,
  Checkbox,
  CssBaseline,
  FormControlLabel,
} from "@material-ui/core";
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

export default function Showcase({ auth }) {
  const classes = useStyles();

const [projectTitle, setprojectTitle] = useState("");
const [projectLink, setprojectLink] = useState("");
const [projectDesc, setprojectDesc] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault();
   console.log("Project Submitted.")
  };


  return (
    <div>
      <div className={classes.root}>
        <Grid container spacing={2}>
          {auth.isAuthenticated ? (
            <>
            <Grid item md={8} xs={12}>
            <Header name ="Showcase" />
            </Grid>
             <Grid item md={4} xs={12}>
             <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
          <Grid item xs={12}>
            <h1>Hey! Everyone, I would love to get your feedback on</h1>
          </Grid>
            <Grid item xs={12}>
              <TextField
                label="Project Title"
                variant="outlined"
                fullWidth
                className={classes.field}
                type="text"
                value={projectTitle}
                onChange={(e) => setprojectTitle(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Project Link"
                variant="outlined"
                fullWidth
                className={classes.field}
                type="text"
                value={projectLink}
                onChange={(e) => setprojectLink(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="What your Project is about?"
                variant="outlined"
                fullWidth
                className={classes.field}
                type="text"
                multiline 
                rows ={4}
                value={projectDesc}
                onChange={(e) => setprojectDesc(e.target.value)}
              />
            </Grid>
          
          <Grid item xs={12}>
        

            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Submit it!
          </Button>
          <Grid container justify="flex-end">
          </Grid>
        </form>
             </Grid>
             </>
            
          ) : (
            <>
              <Grid item md={8} xs={12}>
                <div className={classes.container}>
                  <img
                    src={require("assets/images/7.jpg").default}
                    alt=""
                    className={classes.image}
                  />
                </div>
              </Grid>
              <Grid item md={4} xs={12}>
                <div className={classes.content}>
                  <h1>Showcase</h1>
                  The grid creates visual consistency between layouts while
                  allowing flexibility across a wide variety of designs.
                  Material Design’s responsive UI is based on a 12-column grid
                  layout.
                </div>
              </Grid>
            </>
          )}
        </Grid>
      </div>
    </div>
  );
}
