import React from 'react'
import { withStyles, createMuiTheme, MuiThemeProvider, makeStyles} from '@material-ui/core/styles';
import {Button, Dialog, Select, MenuItem, OutlinedInput, FormControl, InputLabel, Typography, IconButton, DialogTitle as MuiDialogTitle, DialogContent as MuiDialogContent } from '@material-ui/core';
import {Close as CloseIcon, ExpandMore, SaveAlt, Cached as CachedIcon } from '@material-ui/icons';

import Card from './MainCard';

export default function DraftData({data, changeMarkStatus, moveMainToDraft}) {
  return (
    <div style={{display: 'flex', flex: '1 1 100%', padding: '0 20px', flexWrap: 'wrap'}}>
    {
      data.map( item => <div style={{margin: 10}}>
        <Card moveMainToDraft={moveMainToDraft.bind(this, item)} changeMarkStatus={changeMarkStatus.bind(this, item)} data={item} /> 
      </div>)
    }
    </div>
  );
}
