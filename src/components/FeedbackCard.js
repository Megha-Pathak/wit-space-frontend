import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const FeedbackCard = ({ feedback, userName}) => {

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h6" component="p" >
          {feedback}
        </Typography>
        <br />
        <Grid container spacing={1}>
          <Grid item md={12} xs={12} style={{ margin: "auto" }}>
           {userName}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default FeedbackCard;
