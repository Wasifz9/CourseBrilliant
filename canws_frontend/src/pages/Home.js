// Routing and functionality Librarires
import React from "react";
import { Link } from "react-router-dom";

// Styling components
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";

// import theme
import { ThemeProvider, createTheme } from '@mui/material/styles';


export default function Home() {

	const [open, setOpen] = React.useState(false);

  	const handleClickOpen = () => {
    	    setOpen(true);
  	};

  	const handleClose = () => {
    	    setOpen(false);
  	};

	return (
	<Box padding={30} display="flex" alignItems="center">
		<Typography variant="h2">
		    School can be tough... but course planning doesn&apos;t have to be!
		</Typography>
		<Box mx={5}>
		    <Button color="primary_blue" variant="contained" style={{textTransform: 'none'}}>
			    Start your Blueprint
		    </Button>
		</Box>
		<Box mx={5}>
		    <Typography variant="h5">or</Typography>
		</Box>
		<Box mx={5}>
		    <Button color="primary_blue" variant="contained" style={{textTransform: 'none'}} onClick={handleClickOpen}>
			    Continue your Blueprint
		    </Button>
		</Box>
		<Dialog open={open} onClose={handleClose}>
        	    <DialogTitle>Continue your Blueprint!</DialogTitle>
        	    <DialogContent>
          		<DialogContentText>
			    Enter your Blueprint link, and click Launch to continue your plan.
          		</DialogContentText>
          	        <TextField
            		    autoFocus
           		    margin="dense"
            		    id="name"
            		    label="Blueprint Link"
            		    type="link"
            		    fullWidth
            		    variant="standard"
          	    	/>
        	    </DialogContent>
        	    <DialogActions>
          		<Button onClick={handleClose}>Cancel</Button>
          		<Button onClick={handleClose}>Launch</Button>
        	    </DialogActions>
      		</Dialog>
	</Box>
	)

}
