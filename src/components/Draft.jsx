import React from 'react';
import { withStyles, createMuiTheme, MuiThemeProvider, makeStyles} from '@material-ui/core/styles';
import {Button, Dialog, MenuItem, OutlinedInput, FormControl, InputLabel, Typography, IconButton, DialogTitle as MuiDialogTitle, DialogContent as MuiDialogContent, TextField } from '@material-ui/core';
import {Close as CloseIcon, ExpandMore, SaveAlt, Cached as CachedIcon } from '@material-ui/icons';

import Card from './Card';

export default function DraftData({data, setDraftData, removeDraft, moveDraftToMain, addObjToMain}) {
  const [dataInput, setDataInput] = React.useState('');
  return (
    <div style={{display: 'flex', flexDirection: 'column', padding: 20, borderRight: '2px solid black'}}>
      <div style={{marginBottom: 30}}>      
        <TextField value={dataInput} onChange={e => setDataInput(e.target.value)} style={{marginBottom: 20}} fullWidth variant="outlined"></TextField>
        <Button onClick={setDraftData.bind(this, dataInput)} style={{marginRight: 10}} variant="contained" color="secondary">
          Draft
        </Button>     
        <Button onClick={addObjToMain.bind(this, {value: dataInput, id: new Date().getTime()})} variant="contained" color="primary">
          Save
        </Button>
      </div>
      <div style={{display: 'flex', flexDirection: 'column'}}>
        {
          data.map( item => <Card moveDraftToMain={moveDraftToMain.bind(this, item)} data={item.value} removeDraft={removeDraft.bind(this, item)} /> )
        }
      </div>
    </div>
  );
}
