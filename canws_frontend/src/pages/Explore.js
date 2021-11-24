// Routing and functionality Librarires
import React, { useState } from "react";

// Styling components
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import MenuItem from "@mui/material/MenuItem";

import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";

import HomePNG from "../homePic.png";

// import Rout

// import theme
import { createTheme } from "@mui/material/styles";

// import search client to search
import SearchClient from "../api/search/search.js";
import { borderBottom } from "@mui/system";

// create default theme to make search bar
const theme = createTheme({
  typography: {
    fontFamily: [""].join(","),
  },
});

// renders a search bar
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  borderColor: theme.palette.common.black,
  backgroundColor: alpha(theme.palette.common.white, 0.1),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
  borderBottom: "1px solid black",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
    fontSize: "22px",
  },
}));

// function for creating year dropdowns
function YearDropDown() {
  // define new state variable
  const [yearOpen, setYearOpen] = React.useState(false);
  const [year, setYear] = React.useState("");

  //
  return (
    <FormControl style={{ minWidth: 160 }}>
      <InputLabel id="year-select-label">Course Level</InputLabel>
      <Select
        labelId="year-select-label"
        id="year-select"
        value={year}
        label="Level"
        onClose={() => setYearOpen(false)}
        onOpen={() => setYearOpen(true)}
        onChange={(event) => setYear(event.target.value)}
      >
        <MenuItem value={0}>0</MenuItem>
        <MenuItem value={1}>1</MenuItem>
        <MenuItem value={2}>2</MenuItem>
        <MenuItem value={3}>3</MenuItem>
        <MenuItem value={4}>4</MenuItem>
        <MenuItem value={5}>5</MenuItem>
        <MenuItem value={6}>6</MenuItem>
        <MenuItem value={7}>7</MenuItem>
        <MenuItem value={-1}>any</MenuItem>
      </Select>
    </FormControl>
  );
}

// function for creating faculty dropdowns
function FacultyDropDown() {
  // define new state variable
  const [facultyOpen, setFacultyOpen] = React.useState(false);
  const [faculty, setFaculty] = React.useState("");

  // list of faculties
  const faculties = [
    "Faculty of Music",
    "John H. Daniels Faculty of Architecture, Landscape, & Design",
    "Faculty of Applied Science & Engineering",
    "University of Toronto Scarborough",
    "University of Toronto Mississauga",
    "Faculty of Arts and Science",
    "any",
  ];
  // add menu items in dropdown corresponding to above faculties
  var facultyMenuItems = [];
  for (var i = 0; i < faculties.length; i++) {
    facultyMenuItems.push(
      <MenuItem value={faculties[i]}>{faculties[i]}</MenuItem>
    );
  }

  // return JSX of faculty dropdowns
  return (
    <FormControl style={{ minWidth: 120 }}>
      <InputLabel id="faculty-select-label">Faculty</InputLabel>
      <Select
        labelId="faculty-select-label"
        id="faculty-select"
        value={faculty}
        label="Faculty"
        onClose={() => setFacultyOpen(false)}
        onOpen={() => setFacultyOpen(true)}
        onChange={(event) => setFaculty(event.target.value)}
      >
        {facultyMenuItems}
      </Select>
    </FormControl>
  );
}

// function for creating department dropdowns
function DeptDropDown() {
  // define new state variable
  const [deptOpen, setDeptOpen] = React.useState(false);
  const [dept, setDept] = React.useState("");

  // define departments
  const depts = [
    "Anatomy and Cell Biology",
    "Factor Inwentash Faculty of Social Work",
    "Centre for European, Russian and Eurasian Studies",
    "Women and Gender Studies Institute",
    "Nutritional Sciences",
    "Immunology",
    "Astronomy and Astrophysics",
    "English (UTSC)",
    "Rotman Commerce",
    "Faculty of Arts and Science",
    "Chemical and Physical Sciences",
    "History",
    "Near & Middle Eastern Civilizations",
    "Canadian Institute for Theoretical Astrophysics",
    "Centre for Diaspora & Transnational Studies",
    "Economics",
    "Sociology (UTSC)",
    "University of Toronto Mississauga",
    "Anthropology",
    "Munk School of Global Affairs and Public Policy",
    "Pharmacology",
    "Dept. of Historical & Cultural Studies (UTSC)",
    "Centre for Teaching and Learning (UTSC)",
    "Statistical Sciences",
    "John H. Daniels Faculty of Architecture, Landscape, & Design",
    "Engineering First Year Office",
    "Laboratory Medicine and Pathobiology",
    "Division of Engineering Science",
    "Anthropology (UTSC)",
    "Management",
    "Italian Studies",
    "Psychology (UTSC)",
    "School of Environment",
    "Art History",
    "Indigenous Studies Arts & Science",
    "Computer Science",
    "East Asian Studies",
    "Biological Sciences (UTSC)",
    "Human Geography (UTSC)",
    "New College",
    "Trinity College",
    "Mathematics",
    "Biochemistry",
    "Biology",
    "Department for the Study of Religion",
    "Ecology and Evolutionary Biology",
    "Institute of Biomedical Engineering",
    "Centre for Industrial Relations and Human Resources",
    "English and Drama",
    "Linguistics",
    "Physics",
    "Dept. of Arts, Culture & Media (UTSC)",
    "University College",
    "Management (UTSC)",
    "Philosophy (UTSC)",
    "Spanish and Portuguese",
    "Geography and Planning",
    "English",
    "Slavic Languages and Literatures",
    "Faculty of Music",
    "ASDN: Arts and Science, Office of the Dean",
    "Classics",
    "Cross Disciplinary Programs Office",
    "Cinema Studies Institute",
    "Earth Sciences",
    "Germanic Languages & Literatures",
    "Psychology",
    "Edward S. Rogers Sr. Dept. of Electrical & Computer Engin.",
    "Political Science (UTSC)",
    "Faculty of Applied Science & Engineering",
    "University of Toronto Scarborough",
    "Historical Studies",
    "Chemical Engineering and Applied Chemistry",
    "Political Science",
    "Dept. of Computer & Mathematical Sci (UTSC)",
    "Language Studies",
    "Philosophy",
    "Inst for Studies in Transdisciplinary Engin Educ & Practice",
    "Mechanical & Industrial Engineering",
    "Centre for Drama, Theatre and Performance Studies",
    "St. Michael's College",
    "Geography, Geomatics and Environment",
    "Centre for Study of United States",
    "Chemistry",
    "Jewish Studies",
    "Materials Science and Engineering",
    "Institute for Management and Innovation",
    "Health and Society (UTSC)",
    "Mathematical and Computational Sciences",
    "Sociology",
    "Molecular Genetics",
    "Inst. for the History & Philosophy of Science & Technology",
    "Human Biology Program",
    "Physiology",
    "Victoria College",
    "Civil and Mineral Engineering",
    "Cell and Systems Biology",
    "French",
    "Dept. of Physical & Environmental Sci (UTSC)",
    "Language Studies (UTSC)",
    "Institute for the Study of University Pedagogy",
    "Visual Studies",
    "Centre for Criminology and Sociolegal Studies",
    "Centre for Critical Development Studies (UTSC)",
    "Sexual Diversity Studies",
    "Institute of Communication and Culture",
    "any",
  ];
  depts.sort();

  // add menu items in dropdown corresponding to above depts
  var deptMenuItems = [];
  for (var i = 0; i < depts.length; i++) {
    deptMenuItems.push(<MenuItem value={depts[i]}>{depts[i]}</MenuItem>);
  }

  // return JSX of dept dropdown
  return (
    <FormControl style={{ minWidth: 150 }}>
      <InputLabel id="dept-select-label">Department</InputLabel>
      <Select
        labelId="dept-select-label"
        id="dept-select"
        value={dept}
        label="Department"
        onClose={() => setDeptOpen(false)}
        onOpen={() => setDeptOpen(true)}
        onChange={(event) => setDept(event.target.value)}
      >
        {deptMenuItems}
      </Select>
    </FormControl>
  );
}

// function for creating campus dropdowns
function CampusDropDown() {
  // define new state variable
  const [campusOpen, setCampusOpen] = React.useState(false);
  const [campus, setCampus] = React.useState("");
  const [search, setSearch] = React.useState("null");

  // list of campuses
  const campuses = ["St. George", "Scarborough", "Mississauga", "any"];

  // add menu items in dropdown corresponding to above campuses
  var campusMenuItems = [];
  for (var i = 0; i < campuses.length; i++) {
    campusMenuItems.push(
      <MenuItem value={campuses[i]}>{campuses[i]}</MenuItem>
    );
  }

  // return JSX of campus dropdowns
  return (
    <FormControl style={{ minWidth: 120 }}>
      <InputLabel id="campus-select-label">Campus</InputLabel>
      <Select
        labelId="campus-select-label"
        id="campus-select"
        value={campus}
        label="Campus"
        onClose={() => setCampusOpen(false)}
        onOpen={() => setCampusOpen(true)}
        onChange={(event) => setCampus(event.target.value)}
      >
        {campusMenuItems}
      </Select>
    </FormControl>
  );
}

export default function Explore(props) {
  const { setResultsFromAnotherPage } = props;

  // state variables for go button and search bar
  var search = "";

  // function to search for results based on search bar's input
  function searchGeneral(event) {
    if (event.code === "Enter") {
      const sc = new SearchClient("none");
      sc.getInfo(search).then((data) => {
        var res = JSON.parse(data);
        setResultsFromAnotherPage(res, search);
      });
    }
    return true;
  }

  return (
    <Box padding={10} >
        <Box mx={1} sx={{marginBottom:'5vh'}}>
          <Typography variant="h3">
            Tell us a little about the courses you&apos;re looking for. Let
            CourseBrilliant figure out the rest.
          </Typography>
        </Box>
       <Box sx={{ display: "flex", flexDirection: "row", flexWrap:'wrap'}}> 
      <Box flexGrow={2}>
        <Box display="flex" justifyContent="left" alignItems="center">
          <Box mx={1} my={2}>
            <Typography variant="h5"> I want to find a</Typography>
          </Box>
          <Box mx={1} my={2}>
            <YearDropDown />
          </Box>
          <Box mx={1} my={2}>
            <Typography variant="h5">
              {" "}
              year level course that is delivered by
            </Typography>
          </Box>
        </Box>
        <Box display="flex" justifyContent="left" alignItems="center">
          <Box mx={1} my={2}>
            <Typography variant="h5">the </Typography>
          </Box>
          <Box mx={1} my={2}>
            <DeptDropDown />
          </Box>
          <Box mx={1} my={2}>
            <Typography variant="h5">
              department within the faculty of
            </Typography>
          </Box>
        </Box>
        <Box display="flex" justifyContent="left" alignItems="center">
          <Box mx={1} my={2}>
            <FacultyDropDown />
          </Box>
          <Box mx={1} my={2}>
            <Typography variant="h5">
              on the University of Toronto&apos;s{" "}
            </Typography>
          </Box>
          <Box mx={1} my={2}>
            <CampusDropDown />
          </Box>
        </Box>
        <Box display="flex" justifyContent="left" alignItems="center">
          <Typography variant="h5">campus</Typography>
          <Box mx={1} my={2}>
            <Typography variant="h5">that is related to</Typography>
          </Box>
          <Box mx={1} my={2}>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search for courses..."
                inputProps={{ "aria-label": "search" }}
                onKeyPress={searchGeneral}
                onChange={(e) => {
                  search = e.target.value;
                }}
              />
            </Search>
          </Box>
          </Box>
          <Box mx={1} my={2}>
            <Typography variant="h5">.</Typography>
          </Box>
        </Box>
      <Box flexGrow={1}> 
      <img className="homePic" src={HomePNG} alt="fireSpot" />
      </Box>
      </Box>
      
    </Box>
  );
}
