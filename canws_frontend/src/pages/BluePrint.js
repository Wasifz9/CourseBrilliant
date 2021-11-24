import react, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
// import { DataGrid, GridToolbar } from '@mui/x-data-grid';
// import { useDemoData } from '@mui/x-data-grid-generator';
// import Paper from '@mui/material/Paper';
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
// import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import { Link } from "react-router-dom";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
  gridClasses,
} from "@mui/x-data-grid";

import Cart from "../features/enrollment/Cart";
import BPitem from "./BPitem";

function CustomToolbar() {
  return (
    <GridToolbarContainer className={gridClasses.toolbarContainer}>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

export default function BluePrint(props) {

  function tableCell(course){
    if (typeof course != "undefined"){
      return (
        <TableCell align="right">
        <Button onClick={() => removeFromBluePrint(course)}>
          <p> {course}</p> 
        </Button>
      </TableCell>
      ); 
      } else {
        return  <TableCell align="right">select </TableCell>
      }
    }
  
  const {
    cartedCourses,
    printedCourses,
    addToBluePrint,
    removeFromBluePrint,
    removeFromCart,
    exportCsv,
  } = props;

  const [bp, setBP] = useState(0);

  // console.log("LENGTH!!!!!!!!!");
  // console.log(printedCourses.length);
  // console.log(cartedCourses.length);
  var blueprint = [[], [], [], [], [], [], [], [], [], [], [], []];
  var semesters = [
    "year1 fall",
    "year1 winter",
    "year1 summer",
    "year2 fall",
    "year2 winter",
    "year2 summer",
    "year3 fall",
    "year3 winter",
    "year3 summer",
    "year4 fall",
    "year4 winter",
    "year4 summer",
  ];

  var rowList = [];

  for (const [semester, courses] of Object.entries(printedCourses)) {
  // for (const [semester, courses] of bpMap) {
    // the key semester indicates which row the course should go to
    // courses: list of the courses in that semester
    for (var i = 0; i < courses.length; i++) {
      blueprint[semester].push(courses[i]);
    }
  }




  for (var i = 0; i < 8; i++) {
    var row = blueprint[i];
    var course_name_row = [];
    for (var j = 0; j < row.length; j++) {
      if (row[j] != "") {
        course_name_row[j] = row[j].course_name;
      } else {
        course_name_row[j] = "select";
      }
    }
    var nameRow = course_name_row;
    var tableCells = []

    

    rowList.push(
      <TableRow
        key={semesters[i]}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      >
        <TableCell component="th" scope="row">
          {semesters[i]}
        </TableCell>
        {/* use removeFromBluePrint here */}
          {/* <BPitem course={course_name_row[0]} removeFromBluePrint={removeFromBluePrint}/> */}
        {/* <TableCell align="right">
          <Button onClick={() => removeFromBluePrint(nameRow[0])}>
            {nameRow[0]}
          </Button>
        </TableCell>
        <TableCell align="right">
          <Button onClick={() => removeFromBluePrint(nameRow[1])}>
            {nameRow[1]}
          </Button>
        </TableCell>
        <TableCell align="right">
          <Button onClick={() => removeFromBluePrint(nameRow[2])}>
            {nameRow[2]}
          </Button>
        </TableCell>
        <TableCell align="right">
          <Button onClick={() => removeFromBluePrint(nameRow[3])}>
            {nameRow[3]}
          </Button>
        </TableCell>
        <TableCell align="right">
          <Button onClick={() => removeFromBluePrint(nameRow[4])}>
            {nameRow[4]}
          </Button>
        </TableCell>
        <TableCell align="right">
          <Button onClick={() => removeFromBluePrint(nameRow[5])}>
            {nameRow[5]}
          </Button>
        </TableCell> */}
        {tableCell(nameRow[0])}
        {tableCell(nameRow[1])}
        {tableCell(nameRow[2])}
        {tableCell(nameRow[3])}
        {tableCell(nameRow[4])}
        {tableCell(nameRow[5])}
        {tableCell(nameRow[6])}
      </TableRow>
    );
  }

  return (
    <Box padding={10}>
      <div>
        <h2>My Blueprint</h2>
        <Box
          sx={{
            width: "30%",
            maxWidth: 460,
            bgcolor: "background.paper",
            position: "fixed",
            right: 0,
          }}
        ></Box>

        <TableContainer>
          <Table sx={{ maxWidth: 850 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Semester</TableCell>
                <TableCell align="right">course 1</TableCell>
                <TableCell align="right">course 2</TableCell>
                <TableCell align="right">course 3</TableCell>
                <TableCell align="right">course 4</TableCell>
                <TableCell align="right">course 5</TableCell>
                <TableCell align="right">course 6</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{rowList}</TableBody>
          </Table>
        </TableContainer>

        <Button sx={{ width: "10%" }} onClick={() => exportCsv()}>
          export blueprint
        </Button>
      </div>
    </Box>
  );
}
