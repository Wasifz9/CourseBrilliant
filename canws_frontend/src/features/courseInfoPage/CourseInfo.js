// Routing and functionality Librarires
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

// Importing Paper to make prereq/postreq nodes
import PrereqParsingClient from "../../api/prereq/prereq.js";
import SearchClient from "../../api/search/search.js";
import PrereqItem from "./PrereqItem.js";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { CardActionArea, Container } from "@mui/material";

// Importing accordion to expand and collapse paper prereq/postreq nodes
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// Importing other stylistic elements
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack"
import {
  Menu,
  MenuItem,
  Grid,
  Item,
  AppBar,
  Toolbar,
  Snackbar,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// Now for the main function to render the page content
export default function CourseInfo(props) {
  // extracting props from App.js where the function is called
  // courseData 	  - data object including information like course code, course name, description, etc.
  // page 	  - includes the tab's name
  // selected	  - represents tab that user is looking at, see tab ID for further explanation
  // addToCart	  - function to add courseData to the cart
  // cartedCourses  - array of courses that are currently in the cart
  // removeFromCart - function to remove courseData from cart
  // tabID	  - must be same as 'selected' if we want it to render
  // addTab	  - function to add a new tab when prerequisite is selected
  // reqDataMaster  - struct of requisite courseData structures

  const {
    courseData,
    selected,
    addToCart,
    cartedCourses,
    removeFromCart,
    tabID,
    addTab,
    reqDataMaster,
  } = props;

  // state variable to update page rendering when requisite data has been loaded
  const [reqReady, setReqReady] = useState(false);

  // we call this function once to get all the requisite data of the courseData
  function getReqData(courseData) {
    // prereqs holds prerequisite course codes, prereqDataPrelim holds courseData objects associated with
    // the codes. the same naming convention applies to the arrays for future courses (postreqs, coreqs,
    // exclusions).
    const ppc = new PrereqParsingClient("none");
    var prereqs = [];
    var prereqDataPrelim = [];
    var postreqs = [];
    var postreqDataPrelim = [];
    var exclusions = [];
    var exclusionDataPrelim = [];
    var coreqs = [];
    var coreqDataPrelim = [];
    var reqDataPrelim = [];

    // there is a difference in naming convention of courseData members when they are generated from
    // the results page versus another course's prerequisite tree. this handles the difference.
    var course_data_full = "";
    course_data_full = courseData.course_code;
    if (course_data_full == null) {
      course_data_full = courseData.code;
    }

    // find the requisite course codes from the course plan endpoint
    // (localhost:5001/course/plan/<course_data_full>)
    ppc
      .getCoursePrereqs(course_data_full)
      .then(
        (data) => {
          for (var i = 0; i < data.prereqs.length; i++) {
            if (
              data.prereqs[i] != "No Pre-requisites" &&
              data.prereqs[i] != course_data_full
            ) {
              prereqs.push(data.prereqs[i]);
            }
          }
          for (var i = 0; i < data.postreqs.length; i++) {
            if (
              data.postreqs[i] != "No Post-requisites" &&
              data.postreqs[i] != course_data_full
            ) {
              postreqs.push(data.postreqs[i]);
            }
          }
          for (var i = 0; i < data.exclusions.length; i++) {
            if (data.exclusions[i] != "No Exclusions") {
              exclusions.push(data.exclusions[i]);
            }
          }
          for (var i = 0; i < data.coreqs.length; i++) {
            if (data.coreqs[i] != "No Co-requisites") {
              coreqs.push(data.coreqs[i]);
            }
          }
        }
        // search for the courseData structures of each course code in the
        // requisite arrays
      )
      .then(() => {
        const scPre = new SearchClient("none");
        const scPost = new SearchClient("none");
        const scExc = new SearchClient("none");
        const scCo = new SearchClient("none");
        for (var i = 0; i < prereqs.length; i++) {
          scPre.getCourseInfo(prereqs[i]).then((data) => {
            prereqDataPrelim.push([data.code, data.name]);
          });
        }
        for (var i = 0; i < postreqs.length; i++) {
          scPost.getCourseInfo(postreqs[i]).then((data) => {
            postreqDataPrelim.push([data.code, data.name]);
          });
        }
        for (var i = 0; i < exclusions.length; i++) {
          scExc.getCourseInfo(exclusions[i]).then((data) => {
            exclusionDataPrelim.push([data.code, data.name]);
          });
        }
        for (var i = 0; i < coreqs.length; i++) {
          scCo.getCourseInfo(coreqs[i]).then((data) => {
            coreqDataPrelim.push([data.code, data.name]);
          });
        }
        // wait until all the requisite arrays have been populated, then
        // return them to reqDataMaster and change the state variable
        // to make the page rerender
        Promise.all([
          scPre.getCourseInfo(prereqs[prereqs.length - 1]),
          scPost.getCourseInfo(postreqs[postreqs.length - 1]),
          scExc.getCourseInfo(exclusions[exclusions.length - 1]),
          scCo.getCourseInfo(coreqs[coreqs.length - 1]),
        ]).then(() => {
          reqDataPrelim.push(prereqDataPrelim);
          reqDataPrelim.push(postreqDataPrelim);
          reqDataPrelim.push(exclusionDataPrelim);
          reqDataPrelim.push(coreqDataPrelim);
          reqDataMaster.set(course_data_full, reqDataPrelim);
          setReqReady(true);
        });
      });
  }

  // to save reqs in JS format and print in return
  var prereqJS = [];
  var postreqJS = [];
  var exclusionJS = [];
  var coreqJS = [];

  // to justify content within prerequisites columns
  var existingColumns = [];
  var columnSize = 4;
  var columnSizeLeft = 4;

  if (!reqReady) {
    // populate the reqDataMaster structure if it hasn't already been set
    getReqData(courseData);
  } else {
    // handling the inconsistent courseData naming structure again
    var course_data_real = "";
    course_data_real = courseData.course_code;
    if (course_data_real == null) {
      course_data_real = courseData.code;
    }

    // store copy of reqDataMaster for this courseData tab
    var reqData = reqDataMaster.get(course_data_real);

    if (reqData[0][0] != "" && reqData[0][0] != null) {
      prereqJS.push(<Typography variant="h5">Prerequisites</Typography>);
      existingColumns.push("pre");
    }
    if (reqData[1][0] != "" && reqData[1][0] != null) {
      postreqJS.push(<Typography variant="h5">Future Courses</Typography>);
      existingColumns.push("post");
    }
    if (reqData[2][0] != "" && reqData[2][0] != null) {
      exclusionJS.push(<Typography variant="h5">Exclusions</Typography>);
      existingColumns.push("exc");
    }
    if (reqData[3][0] != "" && reqData[3][0] != null) {
      coreqJS.push(<Typography variant="h5">Corequisites</Typography>);
      existingColumns.push("co");
    }

    // we print the requisite data in three columns, prereqs on the left, postreqs on the right,
    // coreqs, the course itself, and the exclusions in the middle. if any of these categories are
    // missing, we rearrange the columns with the following block of code.
    if (existingColumns.length == 0) {
      columnSize = 12;
      columnSizeLeft = 12;
      coreqJS.push(
        <Typography>
          This course is standalone - it does not have any relations to other
          courses.
        </Typography>
      );
    } else if (existingColumns.length == 1) {
      if (existingColumns.includes("pre") || existingColumns.includes("post")) {
        columnSize = 6;
        if (existingColumns.includes("post")) {
          columnSizeLeft = 0;
        }
      }
    } else if (existingColumns.length == 2) {
      if (existingColumns.includes("pre")) {
        columnSize = 6;
        if (existingColumns.includes("post")) {
          columnSize = 4;
        }
      } else if (existingColumns.includes("post")) {
        columnSize = 6;
      }
    } else if (existingColumns.length == 3) {
      if (existingColumns.includes("co") && existingColumns.includes("exc")) {
        columnSize = 6;
      }
    }

    // create prereq items for each set of reqs
    for (var i = 0; i < reqData[0].length; i++) {
      if (reqData[0][i][0] != "" && reqData[0][i][0] != null) {
        prereqJS.push(
          <PrereqItem
            course_code={reqData[0][i][0]}
            course_name={reqData[0][i][1]}
            addTab={addTab}
          ></PrereqItem>
        );
      }
    }

    for (var i = 0; i < reqData[1].length; i++) {
      if (reqData[1][i][0] != "" && reqData[1][i][0] != null) {
        postreqJS.push(
          <PrereqItem
            course_code={reqData[1][i][0]}
            course_name={reqData[1][i][1]}
            addTab={addTab}
          ></PrereqItem>
        );
      }
    }

    for (var i = 0; i < reqData[2].length; i++) {
      if (reqData[2][i][0] != "" && reqData[2][i][0] != null) {
        exclusionJS.push(
          <PrereqItem
            course_code={reqData[2][i][0]}
            course_name={reqData[2][i][1]}
            addTab={addTab}
          ></PrereqItem>
        );
      }
    }

    for (var i = 0; i < reqData[3].length; i++) {
      if (reqData[3][i][0] != "" && reqData[3][i][0] != null) {
        coreqJS.push(
          <PrereqItem
            course_code={reqData[3][i][0]}
            course_name={reqData[3][i][1]}
            addTab={addTab}
          ></PrereqItem>
        );
      }
    }
  }

  // if user is on tab, render
  if (selected === tabID) {
    // if courseInfo page is rendered from Results, it uses new naming.
    // if courseInfo page is rendered from another CourseInfo page, it uses old naming.
    var oldNaming = false;
    if (courseData.course_code == null) {
      oldNaming = true;
    }

    var courseCodeFull = courseData.course_code;
    var courseNameFull = courseData.course_name;
    var courseDeptFull = courseData.department;
    var courseDivisionFull = courseData.division;
    var courseLevelFull = courseData.course_level;
    var courseDescriptionFull = courseData.description;

    if (oldNaming) {
      var courseCodeFull = courseData.code;
      var courseNameFull = courseData.name;
      var courseDeptFull = courseData.dept;
      var courseDivisionFull = courseData.div;
      var courseLevelFull = courseData.level;
      var courseDescriptionFull = courseData.desrp;
    }

    return (
      <Box padding={10} >
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item xs={12} padding={1.5}>
            <Typography variant="h3">
              {courseCodeFull}: {courseNameFull}
            </Typography>
          </Grid>
          <Grid item xs={4} padding={1.5}>
            <Typography variant="h5">Department</Typography>
          </Grid>
          <Grid item xs={4} padding={1.5}>
            <Typography variant="h5">Faculty</Typography>
          </Grid>
          <Grid item xs={2} padding={1.5}>
            <Typography variant="h5">Year</Typography>
          </Grid>

          <Grid item xs={2} padding={1.5}>
            {!cartedCourses.includes(courseData) && (
              <Button
                color="primary_blue"
                variant="contained"
                onClick={() => addToCart(courseData)}
              >
                ADD TO CART
              </Button>
            )}
            {cartedCourses.includes(courseData) && (
              <Button
                color="invalid_red"
                variant="outlined"
                onClick={() => removeFromCart(courseData)}
              >
                {" "}
                REMOVE FROM CART
              </Button>
            )}
          </Grid>

          <Grid item xs={4} padding={1.5}>
            <Typography>{courseDeptFull}</Typography>
          </Grid>
          <Grid item xs={4} padding={1.5}>
            <Typography>{courseDivisionFull}</Typography>
          </Grid>
          <Grid item xs={2} padding={1.5}>
            <Typography>{courseLevelFull}</Typography>
          </Grid>
          <Grid item xs={2} padding={1.5}>
            <Typography></Typography>
          </Grid>

          <Grid item xs={12} padding={1.5}>
            <Typography variant="h5">Description</Typography>
          </Grid>
          <Grid item xs={12} padding={1.5}>
            <Typography>{courseDescriptionFull}</Typography>
          </Grid>

          <Grid item xs={12} padding={1.5}>
            <Typography variant="h5">
              Course Prerequisites, Corequisites, Exclusions, and Future Paths
            </Typography>
          </Grid>
          <Grid item xs={columnSizeLeft} padding={1.5}>
          {prereqJS.length>0 &&(   <Stack
                sx={{
                  backgroundColor:'white',
                  boxShadow: 4
                }}
                spacing={2}
                padding={3}
            >
              {prereqJS}
              </Stack>)}
          </Grid>
          <Grid item xs={columnSize} padding={1.5}>
          <Stack
                sx={{
                  backgroundColor:'white',
                  boxShadow: 4
                }}
                spacing={2}
                padding={3}
            >
            
              {coreqJS}
              <Typography variant="h5">Current Course</Typography>
              <Card sx={{ maxWidth: 345, backgroundColor: "#005E93" }}>
                <CardContent>
                  <Typography color="#FFFFFF" component="div">
                    {courseCodeFull}: {courseNameFull}
                  </Typography>
                </CardContent>
              </Card>
              {exclusionJS}
            </Stack>
          </Grid>
          <Grid item xs={columnSize} padding={1.5} sx={{display:'f'}} >

          {postreqJS.length>0 &&(   <Stack
                sx={{
                  backgroundColor:'white',
                  boxShadow: 4
                  
                }}
                spacing={2}
                padding={3}
              >
                {postreqJS}
              </Stack> )
            } 
          </Grid>
        </Grid>
      </Box>
    );
  } else {
    return null;
  }
}
