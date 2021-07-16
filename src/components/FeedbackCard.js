import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import {useHistory } from "react-router-dom";
import ProjectFeedback from "./ProjectFeedback";


const FeedbackCard = ({ feedback, userName}) => {
  const history = useHistory();


  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h6" component="p" style={{ marginTop: "5px" }}>
          feedback
        </Typography>
        <br />
        <Grid container spacing={1}>
          <Grid item md={12} xs={12} style={{ margin: "auto" }}>
            User Name
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default FeedbackCard;
