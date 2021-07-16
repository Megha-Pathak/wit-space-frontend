import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import {useHistory } from "react-router-dom";


const ReplyCard = ({ feedback, userName}) => {
  const history = useHistory();


  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h6" component="p" style={{ marginTop: "5px" }}>
            Reply
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

export default ReplyCard;
