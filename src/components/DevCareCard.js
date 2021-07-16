import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const DevCareCard = ({ imageUrl, description, userName }) => {
  return (
    <Card variant="outlined">
      <img src={imageUrl} width="100%" />
      <CardContent>
        <Typography variant="body2" component="p" style={{ marginTop: "5px" }}>
          {description}
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

export default DevCareCard;
