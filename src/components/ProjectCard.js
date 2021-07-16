import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import {useHistory } from "react-router-dom";
import ProjectFeedback from "./ProjectFeedback";


const ProjectCard = ({ projectsTitle, projectsUrl, description, userName, projectId }) => {
  const history = useHistory();

  const handleFeedbackPage = async (e) => {
    e.preventDefault();
      history.push(`/showcase/${projectId}`);
      <ProjectFeedback description={description}
      projectsTitle={projectsTitle}
      projectsUrl={projectsUrl}
      userName={userName}
      projectId = {projectId}/>
    } 

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h5" component="h2">
          {projectsTitle}
        </Typography>
        <Typography variant="body2" component="p" style={{ marginTop: "5px" }}>
          {description}
        </Typography>
        <br />
        <Grid container spacing={1}>
          <Grid item md={6} xs={6} style={{ margin: "auto" }}>
            {userName}
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
            &nbsp;
            <Button onClick={handleFeedbackPage} variant="contained" color="secondary">
              Feedback
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
