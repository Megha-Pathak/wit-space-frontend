import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Header from "./Header";
import { useState, useEffect } from "react";
import { TextField, Button } from "@material-ui/core";
import { axiosFun } from "../api/axios.config";
import { createIdeas, listIdeass } from "../api/queries";
import { toast } from "react-toastify";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import DiscussionCard from "./DiscussionCard";
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
  const [description, setdescription] = useState("");
  const [title, settitle] = useState("");
  const [ideasList, setideasList] = useState([]);
  const [checked, setChecked] = useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  useEffect(() => {
    getIdeas();
  }, []);

  const getIdeas = async () => {
    const res = await axiosFun(listIdeass());
    setideasList(res.data.listIdeass.items.reverse());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosFun(
        createIdeas(
          description,
          title,
          checked,
          auth.user.attributes.sub,
          auth.user.attributes.name
        )
      );
      await getIdeas();
      let message = "Discussion added Successfully";
      toast.success(message, {
        position: "top-right",
        autoClose: 0,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setdescription("");
      settitle("");
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
                      {ideasList.map((idea, idx) => (
                        <Grid item xs={12} key={idx}>
                          <DiscussionCard
                            title={idea.ideaTitle}
                            isAnoymous={idea.isAnoymous}
                            description={idea.ideaDescription}
                            userName={idea.userName}
                            ideaId = {idea.ideaId}
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
                            Hey! Everyone, I would like to start a discussion on
                          </h1>
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            label="Discussion Title"
                            variant="outlined"
                            fullWidth
                            className={classes.field}
                            type="text"
                            value={title}
                            onChange={(e) => settitle(e.target.value)}
                            required
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            label="Describe the context of discussion?"
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
                        <Grid item xs={12}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={checked}
                                onChange={handleChange}
                                color="primary"
                              />
                            }
                            label="Keep it Anonymous"
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
