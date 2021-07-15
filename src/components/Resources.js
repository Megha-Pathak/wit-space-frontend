import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { useState, useEffect } from "react";
import Header from "./Header";
import { TextField, Button } from "@material-ui/core";
import { axiosFun } from "../api/axios.config";
import { createResources, fetchingResources } from "../api/queries";
import { toast } from "react-toastify";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import ResourceCard from "./ResouceCard";
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
      background: "#EDC123",
      opacity: 0.4,
    },
  },
  content: {
    backgroundColor: "#EDC123",
    padding: 20,
    color: "#fff",
  },
}));

export default function Resources({ auth }) {
  const classes = useStyles();
  const [resourceType, setresourceType] = useState("");
  const [resourceUrl, setresourceUrl] = useState("");
  const [description, setdescription] = useState("");
  const [resourcesList, setresourcesList] = useState([]);

  const handleChange = (event) => {
    setresourceType(event.target.value);
  };

  useEffect(() => {
    getResources();
  }, []);

  const getResources = async () => {
    const res = await axiosFun(fetchingResources());
    console.log(res.data.listResourcess.items);
    setresourcesList(res.data.listResourcess.items);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosFun(
        createResources(
          description,
          resourceType,
          resourceUrl,
          auth.user.attributes.sub,
          auth.user.attributes.name
        )
      );
      await getResources();
      let message = "Resource added Successfully";
      toast.success(message, {
        position: "top-right",
        autoClose: 0,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setresourceType("");
      setresourceUrl("");
      setdescription("");
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
              {" "}
              <Grid item md={8} xs={12}>
                <Header name="Resources" />
                <Grid container spacing={2}>
                  {resourcesList.map((project, idx) => (
                    <Grid item xs={12} key={idx}>
                      <ResourceCard
                        resourceType = {project.resourceType}
                        description={project.resourceDescription}
                        resourceUrl={project.resourceUrl}
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
                        Hey! Everyone, I would love to share my favourite
                        resources
                      </h1>
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl style={{ width: "100%" }}>
                        <InputLabel id="demo-controlled-open-select-label">
                          Resource Type
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-filled-label"
                          id="demo-simple-select-filled"
                          style={{ width: "100%" }}
                          value={resourceType}
                          onChange={handleChange}
                        >
                          <MenuItem value="1">Blogs</MenuItem>
                          <MenuItem value="2">Vidos</MenuItem>
                          <MenuItem value="3">Hackathons</MenuItem>
                          <MenuItem value="4">Other</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Resource Url"
                        variant="outlined"
                        fullWidth
                        className={classes.field}
                        type="text"
                        value={resourceUrl}
                        onChange={(e) => setresourceUrl(e.target.value)}
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Resource Description"
                        variant="outlined"
                        fullWidth
                        className={classes.field}
                        type="text"
                        multiline
                        rows={4}
                        value={description}
                        onChange={(e) => setdescription(e.target.value)}
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
              {" "}
              <Grid item md={8} xs={12}>
                <div className={classes.container}>
                  <img
                    src={require("assets/images/5.jpeg").default}
                    alt=""
                    className={classes.image}
                  />
                </div>
              </Grid>
              <Grid item md={4} xs={12}>
                <div className={classes.content}>
                  <h1>Resources</h1>
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
