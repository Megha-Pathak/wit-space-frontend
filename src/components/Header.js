import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    marginBottom: "20px"
  },
  title: {
    fontSize: 40,
  },
  pos: {
    marginBottom: 12,
    marginLeft: 60,
  },
});

export default function OutlinedCard(props) {
  const classes = useStyles();

  return (
      <Card className={classes.root} variant="outlined" >
        <CardContent>
          <Typography className={classes.title} component="h2">
            {props.name}
          </Typography>
        </CardContent>
      </Card>
  );
}
