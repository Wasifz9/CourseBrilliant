import react, {useState} from 'react';
import BPitem from "./BPitem";

import {
  Container, 
  Grid,
  Button,
  Box,
  Typography,
  Stack
} from '@mui/material';


var rowList = []
const coursesPerTerm = 5; 

export default function Bp(props){

  const { bpMap, removeFromBP } = props;

  
  function validate(bpMap){
    var enrolled = []
    for (const [term, termCourses] of bpMap) {
      for (var i = 0; i < termCourses.length; i++) {
        enrolled.push(termCourses[i]);
      }
    }
  }
  
  function columnRenderer(termIndex){
    
    var term = '';

    termIndex%2==0 ? term = 'Fall' : term = 'Winter'

    var year = Math.ceil((termIndex+1)/2) 

    return (
       <div>
        <Typography variant ='subtitle1' sx={{fontWeight:'bold'}}>
          {term} 
        </Typography>

        <Typography variant='subtitle2'
        sx={{ color: "text.secondary" }}> 
          Year {year} 
        </Typography> 

       </div>
    );
  }


  function TableRow(term,termCourses){ 
    var courses=[]
    
    if (Array.isArray(termCourses)){ 
      for (var i = 0; i < coursesPerTerm; i++){
        if (typeof termCourses[i] === 'undefined'){
          courses.push(<h4 style={{color:'grey'}}> select</h4>)
        } else {
          courses.push(<BPitem course={termCourses[i]} removeFromBP={removeFromBP}/>)
        }
      } 
    }

    return(
      <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid Container xs={2}>
          <div className="BPCard"> 
            {columnRenderer(term)}
          </div>
        </Grid>
        <Grid Container xs={2}>
        <div className="BPCard"> {courses[0]}</div>
        </Grid>
        <Grid Container xs={2}>
           <div className="BPCard"> {courses[1]}</div>
        </Grid>
        <Grid Container xs={2}>
        <div className="BPCard"> {courses[2]}</div>
        </Grid>
        <Grid Container xs={2}>
        <div className="BPCard"> {courses[3]}</div>
        </Grid>
        <Grid Container xs={2}>
           <div className="BPCard"> {courses[4]}</div>
        </Grid>
      </Grid> 
      </Box>
    ); 
  }
  

  function createTable(){
    console.log('in createtable')
    console.log(bpMap)
    var termRows = []
    for (const [term, termCourses] of bpMap) {
        termRows.push(TableRow(term,termCourses))
  
    }
    return termRows
  }

  rowList = createTable()

  return (
    <Box 
      sx={{ 
        display:'flex',
        justifyContent:'center', 
        flexDirection:'column', 
      }}
      padding={10}
    >
      <Typography variant = 'h4'>
        Plan your BluePrint with us!
      </Typography>
      <div className="bpContainer">
      <Stack spacing={2}>
      {rowList}
      </Stack>
      </div>
    </Box>
  );
}