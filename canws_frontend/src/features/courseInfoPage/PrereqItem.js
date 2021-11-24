import * as React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button"

// to allow course info page from link
import Link from '@mui/material/Link';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { CardActionArea } from '@mui/material';

// for searching
import SearchClient from "../../api/search/search.js";

// styling components
import { Menu, MenuItem, Grid, Item, AppBar, Toolbar } from "@mui/material";

// import theme
import { ThemeProvider, createTheme } from '@mui/material/styles';

export default function PrereqItem(props) {

  // function to return new tab with req course info
  function addTabReq(course_code) {
  
    const sc = new SearchClient("none");
    sc.getCourseInfo(course_code).then((data) => {
      addTab('CourseInfo', data);
    });

  }

  // extract props
  const {course_code, course_name, addTab} = props;

  // return prereq item
  return ( 
    <Card sx={{ maxWidth: 345, backgroundColor: '#005E93' }}>
      <CardActionArea onClick={()=>addTabReq(course_code)}>
        <CardContent>
          <Typography color='#FFFFFF' component="div">
	    {course_code}: {course_name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );

}
