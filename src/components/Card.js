import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    marginTop: 20
  },
  title: {
    // fontSize: 14,
    display: 'block',
  },
  text: {
    fontSize: 11,
    display: 'block',
  },
  actions: {
    marginLeft: 3
  },
  content: {
    paddingBottom: 0
  }
});

export default function OutlinedCard() {
  const classes = useStyles();

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent className={classes.content}>
        <Typography variant="body2" gutterBottom className={classes.text} color="textSecondary">
          Code for Science and Society is a registered US 501(c)(3) nonprofit. Donations are tax deductible to the extent allowed by law in US. Tax ID 81-3791683
        </Typography>
        <Typography variant="body2" className={classes.text} color="textSecondary">
          Donations are processed via Stripe (fee: 2.2% + $0.30).
        </Typography>
      </CardContent>
      <CardActions className={classes.actions}>
        <Button size="small" color="primary">
          See all donation options
        </Button>
      </CardActions>
    </Card>
  );
}