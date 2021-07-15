import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const OpportunityCard = ({
  opportunityUrl,
  opportunityName,
  opportunityType,
  userName,
}) => {
  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="body2" component="p">
          {opportunityType === 1
            ? "Internship"
            : opportunityType === 2
            ? "Full Time"
            : "Other"}
        </Typography>
        <Typography variant="h5" component="h2" style={{ marginTop: "5px" }}>
          {opportunityName}
        </Typography>
        <br />
        <Grid container spacing={1}>
          <Grid item md={6} xs={6} style={{ margin: "auto" }}>
            {userName}
          </Grid>
          <Grid item md={6} xs={6} style={{ textAlign: "end" }}>
            <a
              href={opportunityUrl}
              target="_blank"
              style={{ textDecoration: "none" }}
              rel="noreferrer"
            >
              <Button variant="contained" color="primary">
                Opportunity Link
              </Button>
            </a>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default OpportunityCard;
