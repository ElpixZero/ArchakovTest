import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    position: 'relative',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function SimpleCard({data, changeMarkStatus, moveMainToDraft}) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" component="h2">
        {data.value ? data.value : 'Пустое описание'}
        </Typography>
        <div style={{ backgroundColor: data.isMarked ? 'green' : 'red', position: 'absolute', minWidth: 25, height: 25, top: 10, right: 10}}>
        </div>
      </CardContent>
      <CardActions>
      <Button onClick={moveMainToDraft} variant="outlined" color="secondary">
        Draft
      </Button>
      <Button onClick={changeMarkStatus} variant="outlined" color="primary">
        Mark
      </Button>
      </CardActions>
    </Card>
  );
}
