import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { TextField } from "@material-ui/core";
import { useState, useEffect } from "react";
import FeedbackCard from "./FeedbackCard";
import { axiosFun } from "../api/axios.config";
import { fetchingProjects, createProjectFeedbacks } from "../api/queries";
import { toast } from "react-toastify";
toast.configure();

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

const ProjectFeedback = ({ match, auth }) => {
  const projectId = match.params.id;
  const classes = useStyles();
  const [feedback, setfeedback] = useState([]);
  const [pageData, setPageData] = useState([]);

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosFun(
        createProjectFeedbacks(
          projectId,
          feedback,
          auth.user.attributes.sub,
          auth.user.attributes.name
        )
      );
      await getProjects();
      let message = "Feedback added Successfully";
      toast.success(message, {
        position: "top-right",
        autoClose: 0,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setfeedback("");
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

  useEffect(() => {
    getProjects();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getProjects = async () => {
    const res = await axiosFun(fetchingProjects());
    const temp = res.data.listProjectss.items;
    const result = temp.find((p) => p.projectId === projectId);
    setPageData(result);
  };

  return (
    <>
      {pageData ? (
        <>
          {" "}
          {/* Show Individual Project Details  */}
          <Card variant="outlined" style={{ marginBottom: "20px" }}>
            <CardContent>
              <Typography variant="h5" component="h2">
                {pageData.projectsTitle}
              </Typography>
              <Typography
                variant="body2"
                component="p"
                style={{ marginTop: "5px" }}
              >
                {pageData.description}
              </Typography>
              <br />
              <Grid container spacing={1}>
                <Grid item md={6} xs={6} style={{ margin: "auto" }}>
                  {pageData.userName}
                </Grid>
                <Grid item md={6} xs={6} style={{ textAlign: "end" }}>
                  <a
                    href={pageData.projectsUrl}
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
          <Card variant="outlined" style={{ marginBottom: "20px" }}>
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
          <Card variant="outlined" style={{ marginBottom: "20px" }}>
            <CardContent>
              <Typography variant="h5" component="p" style={{ marginBottom: "10px" }}>
                Other Feedbacks Shared on this Project
              </Typography>
              {/* To-do */}
              {pageData.feedbacks.items.map((project, idx) => (
                      <Grid item xs={12} key={idx} style={{ marginBottom: "10px" }}>
                        <FeedbackCard
                          feedback={project.projectFeedback}
                          userName={project.userName}
                        />
                      </Grid>
                    ))}
            </CardContent>
          </Card>
        </>
      ) : (
        <h1> Loading </h1>
      )}
    </>
  );
};

export default ProjectFeedback;
