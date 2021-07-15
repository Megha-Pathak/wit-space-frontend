import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const ResourceCard = ({ resourceType, resourceUrl, description, userName }) => {
  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h5" component="h2">
          {resourceType === 1
            ? "Blog"
            : resourceType === 2
            ? "Video"
            : resourceType === 3
            ? "Hackathon"
            : "Other"}
        </Typography>
        <Typography variant="body2" component="p" style={{ marginTop: "5px" }}>
          {description}
        </Typography>
        <br />
        <Grid container spacing={1}>
          <Grid item md={6} xs={6} style={{ margin: "auto" }}>
            {userName}
          </Grid>
          <Grid item md={6} xs={6} style={{ textAlign: "end" }}>
            <a
              href={resourceUrl}
              target="_blank"
              style={{ textDecoration: "none" }}
              rel="noreferrer"
            >
              <Button variant="contained" color="primary">
                Resource Link
              </Button>
            </a>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ResourceCard;
