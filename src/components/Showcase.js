import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { useState, useEffect } from "react";
import Header from "./Header";
import { TextField, Button } from "@material-ui/core";
import { axiosFun } from "../api/axios.config";
import { createProjects, fetchingProjects } from "../api/queries";
import { toast } from "react-toastify";
import ProjectCard from "./ProjectCard";
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

export default function Showcase({ auth }) {
  const classes = useStyles();
  const [projectTitle, setprojectTitle] = useState("");
  const [projectLink, setprojectLink] = useState("");
  const [projectDesc, setprojectDesc] = useState("");
  const [projectsList, setProjectsList] = useState([]);

  useEffect(() => {
    getProjects();
  }, []);

  const getProjects = async () => {
    const res = await axiosFun(fetchingProjects());
    setProjectsList(res.data.listProjectss.items);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosFun(
        createProjects(
          projectDesc,
          projectTitle,
          projectLink,
          auth.user.attributes.sub,
          auth.user.attributes.name
        )
      );
      await getProjects();
      let message = "Project added Successfully";
      toast.success(message, {
        position: "top-right",
        autoClose: 0,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setprojectTitle("");
      setprojectLink("");
      setprojectDesc("");
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
    <div>
      <div className={classes.root}>
        <Grid container spacing={2}>
          {auth.isAuthenticated ? (
            <>
              <Grid item md={8} xs={12}>
                <Header name="Project Showcase" />
                <Grid container spacing={2}>
                  {projectsList.map((project, idx) => (
                    <Grid item xs={12} key={idx}>
                      <ProjectCard
                        description={project.description}
                        projectsTitle={project.projectsTitle}
                        projectsUrl={project.projectsUrl}
                        userName={project.userName}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Grid>
              <Grid item md={4} xs={12}>
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <h1>
                        Hey! Everyone, I would love to get your feedback on
                      </h1>
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
                        required
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
                        required
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
                        rows={4}
                        value={projectDesc}
                        onChange={(e) => setprojectDesc(e.target.value)}
                        required
                      />
                    </Grid>

                    <Grid item xs={12}></Grid>
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
                  <Grid container justifyContent="flex-end"></Grid>
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
                  Have an awesome project but hesitate to share? Don’t worry! We
                  have got you covered :) This is that space you wanted. Feel
                  free to share ideas, show projects, get feedback and what not!
                  We believe feedback is the greatest gift. If you’re not
                  confident about your product or your content, ship it here and
                  see the magic.
                </div>
              </Grid>
            </>
          )}
        </Grid>
      </div>
    </div>
  );
}
