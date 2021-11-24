import react, { useState } from 'react';
import Box from "@mui/material/Box";
import Container from "@mui/material/Container"
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import SchoolIcon from '@mui/icons-material/School';

import '../App.css'


export default function Tab(props){

  const { selected, setSelected, removeTab, tabName, tabID, type } = props; 
  const [ showClose, toggleClose ] = useState(0); 
  return (
    <Box            
      onMouseOver={() => {toggleClose(1)}}
      onMouseOut={() => {toggleClose(0)}}
    >

        <div className={selected === tabID? 'tab activetab' : 'tab'}>
          <Container
            disableGutters
            onClick={() => {setSelected(tabID);}}>
              {tabName} 
          </Container> 
          
          <div class = 'iconWrapper'> 
            
            {(tabName != "Home") &&
                <CloseIcon 
                  className={showClose ? 'show' : 'hide'}
                  fontSize="medium" 
                  onClick={()=>removeTab(tabID)}/>
      
            } 
            
            {(type === "Results" && !showClose) && 
            
              <SearchIcon 
                className={showClose ? 'hide' : 'show'}
                fontSize="medium"/>
    
            }
          {(type === "CourseInfo" && !showClose) && 
            
            <SchoolIcon 
              className={showClose ? 'hide' : 'show'}
              fontSize="medium" 
            />
  
          }
            
            {(tabName === "Home") &&
  
              <HomeIcon 
                fontSize="medium" 
                />
              } 
           </div>


        </div>

    </Box>
  );
}