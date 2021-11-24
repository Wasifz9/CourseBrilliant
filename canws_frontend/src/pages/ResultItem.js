import React, { useEffect,useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button"
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import SnackbarContent from '@mui/material/SnackbarContent';

// to allow course info page from link
import CourseInfo from '../features/courseInfoPage/CourseInfo';
import Link from '@mui/material/Link';

// styling components
import { Menu, MenuItem, Grid, Item, AppBar, Toolbar } from "@mui/material";

// import theme
import { ThemeProvider, createTheme } from '@mui/material/styles';

export default function Results(props) {

  const { data, addToCart, cartedCourses, removeFromCart, key,
          addTab, removeTab, page, selected} = props;

  // in case there is a bad search with no search results,
  // we open a snackbar. below are the functions required
  // for the snackbar.

  const [badOpenWarning, setBadOpenWarning] = useState(false);

  const addTabIfNotOpen = ()=> {
    var dontTriggerSnackBar = addTab('CourseInfo', data);
    if (!dontTriggerSnackBar) {
      setBadOpenWarning(true);
    }
  }

  const handleBadOpenWarningClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setBadOpenWarning(false);
  };

  const badOpenWarningAction = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleBadOpenWarningClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  )

  return (
    <div>
    <Snackbar
        open={badOpenWarning}
        autoHideDuration={4000}
        onClose={handleBadOpenWarningClose}  
        action={badOpenWarningAction}>
	<SnackbarContent style={{
    backgroundColor:'#005E93',
  }}
          message={<span id="client-snackbar">This tab is already open!</span>}
        />
      </Snackbar>
        <div className='ResultItem'>
      <Accordion padding ={5}>
        <AccordionSummary
          
          aria-controls="panel1a-content"
          id="panel1a-header"
          sx={{ justifyContent: "space-between" }}
        > 
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item xs={3} padding={2}>
              <Box>
                <Link
	  	  component="button"
	  	  onClick={addTabIfNotOpen}
		>{data.course_name}</Link>
      
                <Typography sx={{ color: "text.secondary" }}>{data.course_code}</Typography>
              </Box>
            </Grid>
            <Grid item xs={3} padding={2}>
              <Typography sx={{ color: "text.secondary" }}>
		          {data.department}
              </Typography>
            </Grid>
            <Grid item xs={3} padding={2}>
              <Typography sx={{ color: "text.secondary" }}>
                {data.division}
              </Typography>
            </Grid>
            <Grid item xs={1} padding={2} justifyContent="center">
              <Typography variant="h5">{data.course_level}</Typography>
            </Grid>
            <Grid item xs={1} padding={2} justifyContent="center">
              {!cartedCourses.includes(data) && <Button 
                variant="contained"
		color="primary_green"
                onClick={()=>addToCart(data)}
              >ADD</Button>} 
              {
               cartedCourses.includes(data) && <Button color="invalid_red" variant="contained" onClick={()=> removeFromCart(data)}> 
                <div style={{color:'white', fontSize:'8'}}> Remove </div> </Button> 
              }
            </Grid>
            <Grid item>
            </Grid>  
          </Grid>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
		{data.description}
          </Typography>
        </AccordionDetails>
      </Accordion>
      </div>
      </div>

  );
}
