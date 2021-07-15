import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Header from "./Header";
import { useState, useEffect } from "react";
import { TextField, Button } from "@material-ui/core";
import { axiosFun } from "../api/axios.config";
import { createOpportunites, fetchOpportunitess } from "../api/queries";
import { toast } from "react-toastify";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import OpportunityCard from "./OpportunityCard";
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
      background: "#0E7867",
      opacity: 0.7,
    },
  },
  content: {
    backgroundColor: "#0E7867",
    padding: 20,
    color: "#fff",
  },
}));

export default function Opportunities({ auth }) {
  const classes = useStyles();
  const [opportunityType, setopportunityType] = useState("");
  const [opportunityUrl, setopportunityUrl] = useState("");
  const [opportunityName, setopportunityName] = useState("");
  const [opportunityList, setopportunityList] = useState([]);

  const handleChange = (event) => {
    setopportunityType(event.target.value);
  };

  useEffect(() => {
    getResources();
  }, []);

  const getResources = async () => {
    const res = await axiosFun(fetchOpportunitess());
    console.log(res.data.listOpportunitess.items);
    setopportunityList(res.data.listOpportunitess.items);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosFun(
        createOpportunites(
          opportunityUrl,
          opportunityName,
          opportunityType,
          auth.user.attributes.sub,
          auth.user.attributes.name
        )
      );
      await getResources();
      let message = "Opportunity added Successfully";
      toast.success(message, {
        position: "top-right",
        autoClose: 0,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setopportunityType("");
      setopportunityUrl("");
      setopportunityName("");
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
              {auth.user.attributes.gender === "Female" ? (
                <>
                  {" "}
                  <Grid item md={8} xs={12}>
                    <Header name="Opportunities" />
                    <Grid container spacing={2}>
                      {opportunityList.map((project, idx) => (
                        <Grid item xs={12} key={idx}>
                          <OpportunityCard
                            opportunityType={project.opportunityType}
                            opportunityName={project.opportunityName}
                            opportunityUrl={project.opportunityUrl}
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
                            Hey! Everyone, I would love to share an Opportunity with you
                          </h1>
                        </Grid>
                        <Grid item xs={12}>
                          <FormControl style={{ width: "100%" }}>
                            <InputLabel id="demo-controlled-open-select-label">
                             Opportunity Type
                            </InputLabel>
                            <Select
                              labelId="demo-simple-select-filled-label"
                              id="demo-simple-select-filled"
                              style={{ width: "100%" }}
                              value={opportunityType}
                              onChange={handleChange}
                            >
                              <MenuItem value="1">Internship</MenuItem>
                              <MenuItem value="2">Full Time</MenuItem>
                              <MenuItem value="3">Other</MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            label="Opportunity Name"
                            variant="outlined"
                            fullWidth
                            className={classes.field}
                            type="text"
                            value={opportunityName}
                            onChange={(e) => setopportunityName(e.target.value)}
                            required
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            label="Opportunity Url"
                            variant="outlined"
                            fullWidth
                            className={classes.field}
                            type="text"
                            value={opportunityUrl}
                            onChange={(e) => setopportunityUrl(e.target.value)}
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
                <Grid item md={12} xs={12} style={{ textAlign: "center" }}>
                  {" "}
                  <Header name="You are not authorised to access this page" />{" "}
                </Grid>
              )}
            </>
          ) : (
            <>
              {" "}
              <Grid item md={8} xs={12}>
                <div className={classes.container}>
                  <img
                    src={require("assets/images/4.jpeg").default}
                    alt=""
                    className={classes.image}
                  />
                </div>
              </Grid>
              <Grid item md={4} xs={12}>
                <div className={classes.content}>
                  <h1>Opportunities</h1>
                  We don’t want you to miss out on awesome opportunities
                  available. Check the clutter free opportunities section to
                  apply for those dream scholarships, fellowships, internships
                  and jobs. We have each category sorted for you. No more
                  missing of deadlines ✨️
                </div>
              </Grid>{" "}
            </>
          )}
        </Grid>
      </div>
    </div>
  );
}
