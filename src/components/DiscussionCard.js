import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import {useHistory } from "react-router-dom";

const DiscussionCard = ({ title, description, userName, isAnoymous, ideaId }) => {
  const history = useHistory();
  
  const handleDiscussionsPage = async (e) => {
    e.preventDefault();
      history.push(`/discussions/${ideaId}`);

    } 
  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h5" component="h2">
          {title}
        </Typography>
        <Typography variant="body2" component="p" style={{ marginTop: "5px" }}>
          {description}
        </Typography>
        <br />
        <Grid container spacing={1}>
          <Grid item md={6} xs={6} style={{ margin: "auto" }}>
            {isAnoymous ? "Anonymous" : userName}
          </Grid>
          <Grid item md={6} xs={6} style={{ textAlign: "end" }}>
            <Button onClick={handleDiscussionsPage} variant="contained" color="secondary">
              Reply
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default DiscussionCard;
