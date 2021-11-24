import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Box from "@mui/material/Box";
import { Menu, MenuItem, Grid, Item, AppBar, Toolbar, Select, FormControl, InputLabel, Button, Divider } from "@mui/material";
import ResultItem from './ResultItem';

export default function Results(props) {

  const { results, page, selected, addToCart, cartedCourses, removeFromCart, addTab, removeTab, tabID } = props;

  // define new state variables for year dropdown
  const [yearOpen, setYearOpen] = React.useState(false);
  const [year, setYear] = React.useState('');
    
  // define new state variables for campus dropdown
  const [campusOpen, setCampusOpen] = React.useState(false);
  const [campus, setCampus] = React.useState(''); 

  // define campuses
  const campuses = ['St. George', 'Scarborough', 'Mississauga', 'any'];
    
  // define new state variables for department dropdown
  const [deptOpen, setDeptOpen] = React.useState(false);
  const [dept, setDept] = React.useState('');

  // define departments
  const depts = [
      'Anatomy and Cell Biology', 'Factor Inwentash Faculty of Social Work', 'Centre for European, Russian and Eurasian Studies', 'Women and Gender Studies Institute', 'Nutritional Sciences', 'Immunology', 'Astronomy and Astrophysics', 'English (UTSC)', 'Rotman Commerce', 'Faculty of Arts and Science', 'Chemical and Physical Sciences', 'History', 'Near & Middle Eastern Civilizations', 'Canadian Institute for Theoretical Astrophysics', 'Centre for Diaspora & Transnational Studies', 'Economics', 'Sociology (UTSC)', 'University of Toronto Mississauga', 'Anthropology', 'Munk School of Global Affairs and Public Policy', 'Pharmacology', 'Dept. of Historical & Cultural Studies (UTSC)', 'Centre for Teaching and Learning (UTSC)', 'Statistical Sciences', 'John H. Daniels Faculty of Architecture, Landscape, & Design', 'Engineering First Year Office', 'Laboratory Medicine and Pathobiology', 'Division of Engineering Science', 'Anthropology (UTSC)', 'Management', 'Italian Studies', 'Psychology (UTSC)', 'School of Environment', 'Art History', 'Indigenous Studies Arts & Science', 'Computer Science', 'East Asian Studies', 'Biological Sciences (UTSC)', 'Human Geography (UTSC)', 'New College', 'Trinity College', 'Mathematics', 'Biochemistry', 'Biology', 'Department for the Study of Religion', 'Ecology and Evolutionary Biology', 'Institute of Biomedical Engineering', 'Centre for Industrial Relations and Human Resources', 'English and Drama', 'Linguistics', 'Physics', 'Dept. of Arts, Culture & Media (UTSC)', 'University College', 'Management (UTSC)', 'Philosophy (UTSC)', 'Spanish and Portuguese', 'Geography and Planning', 'English', 'Slavic Languages and Literatures', 'Faculty of Music', 'ASDN: Arts and Science, Office of the Dean', 'Classics', 'Cross Disciplinary Programs Office', 'Cinema Studies Institute', 'Earth Sciences', 'Germanic Languages & Literatures', 'Psychology', 'Edward S. Rogers Sr. Dept. of Electrical & Computer Engin.', 'Political Science (UTSC)', 'Faculty of Applied Science & Engineering', 'University of Toronto Scarborough', 'Historical Studies', 'Chemical Engineering and Applied Chemistry', 'Political Science', 'Dept. of Computer & Mathematical Sci (UTSC)', 'Language Studies', 'Philosophy', 'Inst for Studies in Transdisciplinary Engin Educ & Practice', 'Mechanical & Industrial Engineering', 'Centre for Drama, Theatre and Performance Studies', "St. Michael's College", 'Geography, Geomatics and Environment', 'Centre for Study of United States', 'Chemistry', 'Jewish Studies', 'Materials Science and Engineering', 'Institute for Management and Innovation', 'Health and Society (UTSC)', 'Mathematical and Computational Sciences', 'Sociology', 'Molecular Genetics', 'Inst. for the History & Philosophy of Science & Technology', 'Human Biology Program', 'Physiology', 'Victoria College', 'Civil and Mineral Engineering', 'Cell and Systems Biology', 'French', 'Dept. of Physical & Environmental Sci (UTSC)', 'Language Studies (UTSC)', 'Institute for the Study of University Pedagogy', 'Visual Studies', 'Centre for Criminology and Sociolegal Studies', 'Centre for Critical Development Studies (UTSC)', 'Sexual Diversity Studies', 'Institute of Communication and Culture', 'any'];
  depts.sort();
    
  // define new state variables for faculty dropdown
  const [facultOpen, setFacultOpen] = React.useState(false);
  const [facult, setFacult] = React.useState('');

  // define faculties
  const facults = ['Faculty of Music', 'John H. Daniels Faculty of Architecture, Landscape, & Design', 'Faculty of Applied Science & Engineering', 'University of Toronto Scarborough', 'University of Toronto Mississauga', 'Faculty of Arts and Science', 'any']; 
  
  // will populate this array with resultItem instances
  var resultList = [];

  // loop through every search result from the initial search term, and then make sure the course fulfills all the users
  // filtering preferences before creating a resultItem.
  for(var i = 0; i < results.length; i++) {
    var obj = results[i];
    if (year == obj.course_level || year == '' || year == -1) {
      if (dept == obj.department || dept == '' || dept == 'any') {
	if (facult == obj.division || facult == '' || facult == 'any') {
	  if (campus == obj.campus || campus == '' || campus == 'any') {
    	    resultList.push( <ResultItem cartedCourses={cartedCourses} 
	      removeFromCart={removeFromCart} addToCart={addToCart} key={i} 
	      data={obj} addTab={addTab} removeTab={removeTab} page={page}
	      selected={selected}></ResultItem>);
	  }
	}
      }
    }
  }

  // if there are no results, return a warning.
  if (resultList.length == 0) {
    resultList.push(
      <Box padding={10}>
	<Typography variant="h5">There are no results for your search. Check your spelling or adjust your search filters.</Typography>
      </Box>
    );
  }

  // if selected, render the page.
  if (selected === tabID){
    return (
      <Box padding={10}>
	        <Box my={2} display="flex" justifyContent="left" alignItems="center">
		    <Typography variant="h4">
		        Here are your course suggestions: find your match!
		    </Typography>
	        </Box>
	        <Divider/>
		<Box my={2} display="flex" justifyContent="left" alignItems="center">
		    <Box mx={1} mt={0} mb={1}>
			<Typography variant="h5">Further filter your results: </Typography>
		    </Box>
	        </Box>
	        <Box mb={1} display="flex" justifyContent="left" alignItems="center">
		    <Box mx={1} mb={1}>
		        <FormControl size="small" style={{minWidth: 150}}>
  			    <InputLabel id="course-level-select-label">Course Level</InputLabel>
  			    <Select
    				labelId="course-level-select-label"
    				id="course-level-select"
    				value={year}
    				label="Course Level"
          			onClose={()=>setYearOpen(false)}
          			onOpen={()=>setYearOpen(true)}
    				onChange={(event)=>setYear(event.target.value)}
	    			defaultValue={-1}
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
		    </Box>
		    <Box mx={1} mb={1}>
			<FormControl size="small" style={{minWidth: 150}}>
  			    <InputLabel id="dept-select-label">Department</InputLabel>
  			    <Select
    				labelId="dept-select-label"
    				id="dept-select"
    				value={dept}
    				label="Department"
          			onClose={()=>setDeptOpen(false)}
          			onOpen={()=>setDeptOpen(true)}
    				onChange={(event)=>setDept(event.target.value)}
	    			defaultValue={'any'}
 			    >
			    {depts.map((name) => (
            		 	<MenuItem
              			    key={name}
              			    value={name}
            			>
              			    {name}
            			</MenuItem>
          		    ))}
  			    </Select>
			</FormControl>
		    </Box>
	            <Box mx={1} mb={1}>
			<FormControl size="small" style={{minWidth: 150}}>
  			    <InputLabel id="facult-select-label">Faculty</InputLabel>
  			    <Select
    				labelId="facult-select-label"
    				id="facult-select"
    				value={facult}
    				label="Faculty"
          			onClose={()=>setFacultOpen(false)}
          			onOpen={()=>setFacultOpen(true)}
    				onChange={(event)=>setFacult(event.target.value)}
	    			defaultValue={'any'}
 			    >
			    {facults.map((name) => (
            		 	<MenuItem
              			    key={name}
              			    value={name}
            			>
              			    {name}
            			</MenuItem>
          		    ))}
  			    </Select>
			</FormControl>
		    </Box>
		    <Box mx={1} mb={1}>
			<FormControl size="small" style={{minWidth: 150}}>
  			    <InputLabel id="campus-select-label">Campus</InputLabel>
  			    <Select
    				labelId="campus-select-label"
    				id="campus-select"
    				value={campus}
    				label="Campus"
          			onClose={()=>setCampusOpen(false)}
          			onOpen={()=>setCampusOpen(true)}
    				onChange={(event)=>setCampus(event.target.value)}
	    			defaultValue={'any'}
 			    >
			    {campuses.map((name) => (
            		 	<MenuItem
              			    key={name}
              			    value={name}
            			>
              			    {name}
            			</MenuItem>
          		    ))}
  			    </Select>
			</FormControl>
		    </Box>
		</Box>
	    <Divider/>
        <Toolbar>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item xs={3} padding={1.5}>
              <Typography variant="h5">Course</Typography>
            </Grid>
            <Grid item xs={3} padding={1.5}>
              <Typography variant="h5">Department</Typography>
            </Grid>
            <Grid item xs={3} padding={1.5}>
              <Typography variant="h5">Faculty</Typography>
            </Grid>
            <Grid item xs={1} padding={1.5}>
              <Typography variant="h5">Level</Typography>
            </Grid>
	    <Grid item xs={1} padding={1.5}>
              <Typography variant="h5"></Typography>
            </Grid>
	    <Grid item>
	    </Grid>

          </Grid>
        </Toolbar>
        {
        resultList
        }

      </Box>
  );
}else {
  return null; 
}
}
