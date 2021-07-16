import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import {useHistory } from "react-router-dom";
import { TextField  } from "@material-ui/core";
import { useState } from "react";
import FeedbackCard from "./FeedbackCard";

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

const ProjectFeedback = ({ projectsTitle, projectsUrl, description, userName, projectId }) => {
  const history = useHistory();
  const classes = useStyles();
  const [feedback, setfeedback] = useState([]);

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    console.log("Feedback Submitted");
    setfeedback("");
    } 

  return (
    <>
    {/* Show Individual Project Details  */}

    <Card variant="outlined">
      <CardContent>
        <Typography variant="h5" component="h2">
          Project Title
        </Typography>
        <Typography variant="body2" component="p" style={{ marginTop: "5px" }}>
          Description
        </Typography>
        <br />
        <Grid container spacing={1}>
          <Grid item md={6} xs={6} style={{ margin: "auto" }}>
            Momo Masala
          </Grid>
          <Grid item md={6} xs={6} style={{ textAlign: "end" }}>
            <a
              href={projectsUrl}
              target="_blank"
              style={{ textDecoration: "none" }}
              rel="noreferrer"
            >
              <Button variant="contained" color="primary">
                Project Link
              </Button>
            </a>
          </Grid>
        </Grid>
      </CardContent>
    </Card>

{/* Render form for submitting Feedback  */}

    <Card variant="outlined">
      <CardContent>
        <Typography variant="h5" component="h2">
          Give Feedback and Suggestions
        </Typography>
        <br />
        <Grid container spacing={1}>
        <Grid item xs={12}>
                      <TextField
                        label="Feedback"
                        variant="outlined"
                        fullWidth
                        className={classes.field}
                        type="text"
                        multiline
                        required
                        rows={4}
                        value={feedback}
                        onChange={(e) => setfeedback(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={3}>
                    <Button
                    onClick={handleFeedbackSubmit} 
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                  >
                    Submit it!
                  </Button>
                  </Grid>
        </Grid>
      </CardContent>
    </Card>

 {/* Render all the Replies */}

 <Card variant="outlined">
      <CardContent>
      <Typography variant="h5" component="p" style={{ marginTop: "5px" }}>
            Other Feedbacks Shared on this Project
        </Typography>
        <FeedbackCard/>
      </CardContent>
    </Card>
</>
  );
};

export default ProjectFeedback;
