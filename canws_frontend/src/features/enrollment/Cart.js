import * as React from "react";

import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import Container from "@mui/material/Container";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Paper } from "@mui/material";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Cart(props) {
  const {
    cartedCourses,
    removeFromCart,
    addToBP,
    removeFromBP,
    bpMap
  } = props;
  // holds all rows
  const [yearOpen, setYearOpen] = React.useState(false);
  const [year, setYear] = React.useState("");
  const [semesterOpen, setSemesterOpen] = React.useState(false);
  const [semester, setSemester] = React.useState("");

  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(0);

  // handlers for state
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

function enrolledCourse(course){

  // course naming structure is different between courses opened from results
  // and courses opened from prereqs. This next block of code handles that.
  var correct_course_name = course.course_name;
  var correct_course_code = course.course_code
  if (correct_course_name == null) {
    correct_course_name = course.name;
    correct_course_code = course.code;
  }

  return(
    <div className="cartItem">
    <Paper sx={{boxShadow:5, p:4, display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
        <div >
        <Typography variant="h6">{correct_course_name}</Typography>
        <Typography variant="subtitle1">{correct_course_code}</Typography>
        </div>
        <div
          className="rmvbtn"
          onClick={() => removeFromBP(course)}
          color="error"
        >
          Remove
        </div>
    </Paper>
    </div>
  );
}

function catalogCourse(row){

  // course naming structure is different between courses opened from results
  // and courses opened from prereqs. This next block of code handles that.
  var correct_course_name = row.course_name;
  var correct_course_code = row.course_code
  if (correct_course_name == null) {
    correct_course_name = row.name;
    correct_course_code = row.code;
  }

  return(
  <div className="cartItem">
  <Accordion sx={{ boxShadow: 5, p:1}}>
    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
      
      <Paper sx ={{boxShadow:0, display:'flex', flexDirection:'column'}}>
        <div>
        <Typography fontWeight="bold" variant="subtitle1">{correct_course_name}</Typography>
        <Typography variant="subtitle2">{correct_course_code}</Typography>
        </div>
        <div
          className="rmvbtn"
          onClick={() => removeFromCart(row)}
          variant="contained"
          color="error"
        >
          Remove
        </div>
      </Paper>
    </AccordionSummary>
    <AccordionDetails

    >
      <Container sx={{ display: "flex", justifyContent: "space-around" }}
      spacing={10}
       disableGutters>
      <FormControl size="small" style={{minWidth: 110}}>
        <InputLabel id="semester-select-label">Semester</InputLabel>
        <Select
          labelId="semester-select-label"
          id="semester-select"
          value={semester}
          label="Semester"
          onClose={() => setSemesterOpen(false)}
          onOpen={() => setSemesterOpen(true)}
          onChange={(event) => setSemester(event.target.value)}
        >
          <MenuItem value={0}>fall</MenuItem>
          <MenuItem value={1}>winter</MenuItem>
        </Select>
      </FormControl>
      <FormControl size="small" style={{minWidth: 60}}>
        <InputLabel id="year-select-label">Year</InputLabel>
        <Select
          labelId="year-select-label"
          id="year-select"
          value={year}
          label="Year"
          onClose={() => setYearOpen(false)}
          onOpen={() => setYearOpen(true)}
          onChange={(event) => setYear(event.target.value)}
        >
          <MenuItem value={0}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={4}>3</MenuItem>
          <MenuItem value={6}>4</MenuItem>
        </Select>
      </FormControl> 
      <Button
	color="primary_blue"
        onClick={() => addToBP(row, year, semester)}
        variant="contained"
      >
        Enroll
      </Button>
      </Container>

    </AccordionDetails>
  </Accordion>
</div>);
}

  // cart rowList
  var rowList = [];
  var enrolledRL = [];
  var enrolled = [];

  for (const [semester, courses] of bpMap) {
    for (var i = 0; i < courses.length; i++) {
      enrolled.push(courses[i]);
    }

  }

  for (var i = 0; i < enrolled.length; i++) {
    var row = enrolled[i];
    enrolledRL.push(
      enrolledCourse(row)
    );
  }

  for (var i = 0; i < cartedCourses.length; i++) {
    var row = cartedCourses[i];
    rowList.push(
      catalogCourse(row)
    );
  }

  return (
    <div id ='scrollable'>
      <Container>
        <Box sx={{ fontSize:16, borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            centered
            indicatorColor="secondary"
            textColor="inherit"
            variant="fullWidth"
          >

            <Tab
              label="Catalogued"
              {...a11yProps(0)}
            />
            <Tab label="Enrolled" {...a11yProps(1)} />
          </Tabs>
        </Box>

        <TabPanel value={value} index={0}>
          {rowList}
        </TabPanel>
        <TabPanel value={value} index={1}>
          {enrolledRL}
        </TabPanel>
      </Container>
    </div>
  );
}
