import React from 'react';
import { withStyles, createMuiTheme, MuiThemeProvider, makeStyles} from '@material-ui/core/styles';
import {Button, Dialog, Select, MenuItem, OutlinedInput, FormControl, InputLabel, Typography, IconButton, DialogTitle as MuiDialogTitle, DialogContent as MuiDialogContent } from '@material-ui/core';
import {Close as CloseIcon, ExpandMore, SaveAlt, Cached as CachedIcon } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  root: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    padding: '1px 0',
  },
  dialogTitle: {
    fontSize: 14,
    fontWeight: 700,
    display: 'flex',
    alignItems: 'center',
    color: '#455A64',
  },
  icon: {
    color: '#1E88E5',
  },
  dialogTitleIcon: {
    paddingLeft: 0,
    marginRight: 13,
    color: '#455A64',
  },
  rootItem: {
    borderRadius: 0,
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    color: '#1E88E5',
    fontWeight: 600,
    maxWidth: 204,
    width: '100%',
    marginLeft: 5,
  },
  formField: {
    width: '100%',
  },
  dialogContainer: {
    maxWidth: 700,
    width: '100%',
  },
  formButton: {
    width: '100%',
    border: '2px solid #1E88E5',
    borderRadius: 4,
    fontSize: 13,
    color: '#1E88E5',
    fontWeight: 600,
    marginTop: 10,
    marginBottom: 5,
  },
  selectBorder: {
    border: '1px solid #A3D2FC',
  },
  dialogBold: {
    fontWeight: 700,
    color: '#455A64',
    marginBottom: 16,
  },
  fieldContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 24,
  },
  dialogDescription: {
    fontWeight: 500,
    fontSize: 12,
    color: '#99ABB4',
  },
  dialogAnchor: {
    fontWeight: 700,
    color: '#1E88E5',
    textDecoration: 'underline',
  },
  dialogButtonIcon: {
    marginRight: 5,
  },
  labelButton: {
    display: 'flex',
    alignItems: 'center',
  },
}));

const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
    padding: 0,
  },
});

const THEME = createMuiTheme({
  typography: {
   "fontFamily": "\"Montserrat\", sans-serif",
   "fontSize": 14,
  }
});

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

export default function CustomizedDialogs({data, onPreview, selectedFields}) {
  const classes = useStyles();
  const [isOpenModal, setOpenModal] = React.useState(false);
  const fieldLabels = ['', 'Customer Name', 'Phone', 'Email', 'Contacts']; //пустая строка для "Не выбрано"
  const [dialogData, setDialogData] = React.useState( ( ) => {
    if (selectedFields) {
      let resultArray = [];
      for (const key in selectedFields) {
        resultArray[selectedFields[key]] = key; 
      }

      return data.map( (item, i) => {
        return {
          label: fieldLabels.includes(resultArray[i]) ? resultArray[i] : '' ,
          value: item
        }
      });
    }

    return data.map( (item, i) => {
      return {
        label: '',
        value: item
      }
    });
  });

  const setDialogField = (number, value) => {
    let updatedFields = dialogData.map( (item, i) => {
      if (i === number) return {
        ...item,
        label: value
      };

      return item;
    });;

    setDialogData(updatedFields);
  }

  const changeFieldText = (number, text) => {
    let currentFields = dialogData.map( (item, i) => {
      if (i === number) return {
        label: item.label,
        value: text
      };

      return item;
    });
    setDialogData(currentFields);
  }

  const preparedPreviewObj = (data) => {
    let result = {};

    data.forEach( (item, i) => { 
      if (item.label) result[item.label] = i;
    });

    return result;
  }

  return (
    <MuiThemeProvider theme={THEME}>
      <Button variant="outlined" color="primary" onClick={setOpenModal.bind(this, true)}>
        Open dialog
      </Button>

      <Dialog classes={{paper: classes.dialogContainer}} onClose={setOpenModal.bind(this, false)} aria-labelledby="customized-dialog-title" open={isOpenModal}>
        <DialogTitle className={classes.dialogTitle} id="customized-dialog-title" onClose={setOpenModal.bind(this, false)}>
          <span className={classes.dialogTitle}>
            <SaveAlt className={classes.dialogTitleIcon} />  Import Customers Base
          </span>
        </DialogTitle>
        
        <DialogContent dividers>
          <Typography classes={{root: classes.dialogBold}}>
            Fields from uploaded CSV file
          </Typography>
          <Typography gutterBottom className={classes.dialogDescription}>
            Please choose correct columns and click Show Table Preview to see your imported data.
            <br /><a href="/" className={classes.dialogAnchor}>Send us your base file</a> and we'll import it ourselves if you have any problems with that.
          </Typography>
        </DialogContent>

        <DialogContent>
          <form noValidate autoComplete="off">
            {dialogData.map( (item, i) => 
              <div key={i} className={classes.fieldContainer}>
                <FormControl className={classes.formField} variant="outlined">
                  <InputLabel htmlFor="component-outlined">Field {i}</InputLabel>

                  <OutlinedInput
                    id="component-outlined"
                    value={item.value}
                    label={`Field ${i}`}
                    classes={{root: classes.root}}
                    onChange={ (e) => changeFieldText(i, e.target.value)}
                  />
                </FormControl>
                <Select 
                  className={classes.rootItem} 
                  classes={{icon: classes.icon, outlined: classes.selectBorder}} 
                  value={item.label} 
                  onChange={(e) => setDialogField(i, e.target.value)} 
                  displayEmpty 
                  variant="outlined" 
                  IconComponent={ExpandMore}
                  defaultValue=''
                >
                  {
                    fieldLabels.map( item => <MenuItem key={item} value={item}>{item === '' ? 'Не выбрано' : item}</MenuItem>)
                  }
                </Select>
              </div>
            )}

            <Button autoFocus onClick={onPreview.bind(this, preparedPreviewObj(dialogData))} color="primary" classes={{root: classes.formButton, label: classes.labelButton}}>
              <CachedIcon className={classes.dialogButtonIcon} /> Show Table Preview
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </MuiThemeProvider>
  );
}
