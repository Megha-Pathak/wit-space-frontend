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
import { listIdeass, createIdeaComments } from "../api/queries";
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
  const ideaId = match.params.id;
  const classes = useStyles();
  const [reply, setReply] = useState([]);
  const [pageData, setPageData] = useState([]);

  useEffect(() => {
    getProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getProjects = async () => {
    const res = await axiosFun(listIdeass());
    const temp = res.data.listIdeass.items;
    const result = temp.find((p) => p.ideaId === ideaId);
    console.log(result);
    setPageData(result);
  };

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosFun(
        createIdeaComments(
          ideaId,
          reply,
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
      setReply("");
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
    <>
      {pageData ? (
        <>
          {" "}
          <Card variant="outlined" style={{ marginBottom: "20px" }}>
            <CardContent>
              <Typography variant="h5" component="h2">
               {pageData.ideaTitle}
              </Typography>
              <Typography
                variant="body2"
                component="p"
                style={{ marginTop: "5px" }}
              >
                Description
              </Typography>
              <br />
              <Grid container spacing={1}>
                <Grid item md={12} xs={12} style={{ margin: "auto" }}>
                  {pageData.userName}
                </Grid>
              </Grid>
            </CardContent>
          </Card>
          {/* Render form for submitting Feedback  */}
          <Card variant="outlined" style={{ marginBottom: "20px" }}>
            <CardContent>
              <Typography variant="h5" component="h2">
                Reply to this Discussion
              </Typography>
              <br />
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <TextField
                    label="Reply"
                    variant="outlined"
                    fullWidth
                    className={classes.field}
                    type="text"
                    multiline
                    required
                    rows={4}
                    value={reply}
                    onChange={(e) => setReply(e.target.value)}
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
          {
            pageData.comments && pageData.comments.items.length > 0 && <Card variant="outlined" style={{ marginBottom: "20px" }}>
            <CardContent>
              <Typography
                variant="h5"
                component="p"
                style={{ marginTop: "5px" }}
              >
                Other Replies on this Discussion
              </Typography>
              {/* To-do */}
              {pageData.comments.items.map((project, idx) => (
                   <Grid item xs={12} key={idx}>
                     <FeedbackCard
                       feedback={project.ideaComment}
                       userName={project.userName}
                     />
                   </Grid>
                 ))}
            </CardContent>
          </Card>
          }
        </>
      ) : (
        <h1> Loading </h1>
      )}
    </>
  );
};

export default ProjectFeedback;
