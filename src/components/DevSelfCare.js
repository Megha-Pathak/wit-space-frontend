import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { useState, useEffect } from "react";
import Header from "./Header";
import { TextField, Button } from "@material-ui/core";
import { axiosFun } from "../api/axios.config";
import { createDevCare, listDevCares } from "../api/queries";
import { uploadImage } from "../api/uploadImage.crud";
import { toast } from "react-toastify";
import DevCareCard from "./DevCareCard";
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
      background: "#FF3E74",
      opacity: 0.5,
    },
  },
  content: {
    backgroundColor: "#FF3E74",
    padding: 20,
    color: "#fff",
  },
}));

export default function DevSelfCare({ auth }) {
  const classes = useStyles();
  const [resourceType, setresourceType] = useState("");
  const [resourceUrl, setresourceUrl] = useState("");
  const [description, setdescription] = useState("");
  const [devCaresList, setdevCaresList] = useState([]);
  const [file, setFile] = useState("");
  const [S3URL, setS3URL] = useState("");

  useEffect(() => {
    getResources();
  }, []);

  // Coverting File to Data URL
  const handleUpload = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setFile(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const getResources = async () => {
    const res = await axiosFun(listDevCares());
    setdevCaresList(res.data.listDevCares.items);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await uploadImage(file);
      setS3URL(result.data);
      await axiosFun(
        createDevCare(
          description,
          result.data,
          auth.user.attributes.sub,
          auth.user.attributes.name
        )
      );
      await getResources();
      let message = "Image added Successfully";
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
              <Grid item md={8} xs={12}>
                <Header name="Dev Self Care" />
                <Grid container spacing={2}>
                  {devCaresList.map((devcare, idx) => (
                    <Grid item md={6} xs={12} key={idx}>
                      <DevCareCard
                        imageUrl={devcare.imageUrl}
                        description={devcare.description}
                        userName={devcare.userName}
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
                        Hey! Everyone, I would love to share something funny I
                        did/liked
                      </h1>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Snap Description"
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
                      <TextField
                        variant="outlined"
                        fullWidth
                        className={classes.field}
                        type="file"
                        onChange={handleUpload}
                        accept=".png,.jpeg, .jpg"
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      {" "}
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
                    src={require("assets/images/6.jpg").default}
                    alt=""
                    className={classes.image}
                  />
                </div>
              </Grid>
              <Grid item md={4} xs={12}>
                <div className={classes.content}>
                  <h1>Dev Self Care</h1>
                  Engaging in a self-care routine has been clinically proven to
                  reduce anxiety, stress, improve concentration and overall
                  productivity. This is your space to take time off and enjoy
                  time with peer devs 🍵️
                </div>
              </Grid>{" "}
            </>
          )}
        </Grid>
      </div>
    </div>
  );
}
