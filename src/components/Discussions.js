import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Header from "./Header";
import { useState, useEffect } from "react";
import { TextField, Button } from "@material-ui/core";
import { axiosFun } from "../api/axios.config";
import { createOpportunites, fetchOpportunitess } from "../api/queries";
import { toast } from "react-toastify";
import Checkbox from "@material-ui/core/InputLabel";
import FormControlLabel from "@material-ui/core/FormControl";
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
      background: "#71AECA",
      opacity: 0.7,
    },
  },
  content: {
    backgroundColor: "#71AECA",
    padding: 20,
    color: "#fff",
  },
}));

export default function Discussions({ auth }) {
  const classes = useStyles();
  const [opportunityType, setopportunityType] = useState("");
  const [opportunityUrl, setopportunityUrl] = useState("");
  const [opportunityName, setopportunityName] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [opportunityList, setopportunityList] = useState([]);
  const [checked, setChecked] = useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  useEffect(() => {
    getResources();
  }, []);

  const getResources = async () => {
    const res = await axiosFun(fetchOpportunitess());
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
              {auth.user.attributes.gender !== "Female" ? (
                <>
                  <Grid item md={8} xs={12}>
                    <Header name="Discussions" />
                    <Grid container spacing={2}>
                      {/* {opportunityList.map((opportunity, idx) => (
                        <Grid item xs={12} key={idx}>
                          <OpportunityCard
                            opportunityType={opportunity.opportunityType}
                            opportunityName={opportunity.opportunityName}
                            opportunityUrl={opportunity.opportunityUrl}
                            userName={opportunity.userName}
                          />
                        </Grid>
                      ))} */}
                    </Grid>
                  </Grid>
                  <Grid item md={4} xs={12}>
                    <form onSubmit={handleSubmit}>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <h1>
                            Hey! Everyone, I would like to start a discussion on
                          </h1>
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
                            label="What your Project is about?"
                            variant="outlined"
                            fullWidth
                            className={classes.field}
                            type="text"
                            multiline
                            rows={4}
                            // value={projectDesc}
                            // onChange={(e) => setprojectDesc(e.target.value)}
                            required
                          />
                        </Grid>
                        <Grid item xs={12}>
                        <FormControlLabel
                control={
                  <Checkbox
                    checked={checked}
                    onChange={handleChange}
                    color="primary"
                  />
                }
                label="Are you women in tech"
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
                  <Grid item md={12} xs={12} style={{ textAlign: "center" }}>
                    {" "}
                    <Header name="You are not authorised to access this page" />{" "}
                  </Grid>
                </>
              )}
            </>
          ) : (
            <>
              {" "}
              <Grid item md={8} xs={12}>
                <div className={classes.container}>
                  <img
                    src={require("assets/images/2.jpeg").default}
                    alt=""
                    className={classes.image}
                  />
                </div>
              </Grid>
              <Grid item md={4} xs={12}>
                <div className={classes.content}>
                  <h1>Discussions</h1>
                  Great things start with small discussions ❤️ Join this awesome
                  WIT space’s Discussion Section and share what’s in your mind.
                  Ever thought of asking for an appraisal from your manager but
                  hesisted? Ask from other women in tech, what’s their take on
                  this? Feel free to talk your heart out.
                </div>
              </Grid>
            </>
          )}
        </Grid>
      </div>
    </div>
  );
}
