import "./App.css";

// Routing and functionality Librarires
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

// Styling components
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import Drawer from "@mui/material/Drawer";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import FolderSpecialIcon from "@mui/icons-material/FolderSpecial";
import { Container } from "@mui/material";
import Alert from '@mui/material/Alert';

// API calls
import SearchClient from "./api/search/search.js";

// import Router=
import {
  RouterConfig,
  ROOT,
  MYPATH,
  EXPLORE,
  BLUEPRINT,
  RECOMMENDATION,
} from "./router/RouterConfig.js";

// import theme
import { ThemeProvider, createTheme } from "@mui/material/styles";

// import Results
import Results from "./pages/Results";
import Tab from "./components/Tab";

// import Cart
import Cart from "./features/enrollment/Cart";

// import Course Information Page
import CourseInfo from "./features/courseInfoPage/CourseInfo";

// import Course recommendations
import recommend from "./features/recommendations/recommend";

const theme = createTheme({
  typography: {
    fontFamily: [""].join(","),
  },
});

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
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
  },
}));

// global variables for managing the tabs
var tabs = ["Home"];
// var tabCount = 2;
var resultCount = 0;
var courseInfoCount = 0;
var reqDataMaster = new Map();

var tabMap = new Map();
var bpMap = new Map();

bpMap.set(0, []);
bpMap.set(1, []);
bpMap.set(2, []);
bpMap.set(3, []);
bpMap.set(4, []);
bpMap.set(5, []);
bpMap.set(6, []);
bpMap.set(7, []);

var tabPages = [];

// keeps track of varted courses
var cartedCourses = [];
var enrolledCourses = [];
var tabIDs = [];

var printedCourses = {
  //Keeping track of arrays.
  0: [],
  1: [],
  3: [],
  4: [],
  5: [],
  6: [],
  7: [],
  8: [],
  9: [],
  10: [],
  11: [],
};

// var recommendations = recommend(printedCourses, cartedCourses); //returning recommendation list
// console.log(recommendations);

var searchValue = "";

export default function App() {
  // state variables that cause app to refresh whenever it changes
  const [search, setSearch] = useState("null");
  const [singleResult, setResults] = useState(0);
  const [selected, setSelected] = useState("Home");
  const [tabCount, setTabCount] = useState(1);
  const [cartCount, setCartCount] = useState(0);
  const [cartIsOpen, toggleCart] = useState(false);
  const [badSearchWarning, setBadSearchWarning] = useState(false);
  const [printCount, setPrintCount] = useState(0);

  function setResultsFromAnotherPage(res, search) {
    searchValue = search;
    setResults(res);
    addTab("Results", res)
  }

  function addToCart(course) {
    if (cartCount > 10) {
      //return error
    } else {
      cartedCourses.push(course);
      setCartCount(cartCount + 1);
    }
  }

  function removeFromCart(course) {
    cartedCourses.splice(cartedCourses.indexOf(course), 1);
    setCartCount(cartCount - 1);
  }

  // add to addtoBP for error handling later
  function ifInBP(target) {
    for (const [key, value] of bpMap) {
      // console.log("entering for loop");
      for (var i = 0; i < value.length; i++) {
        if (value[i] === target) {
          return true;
        }
      }
    }
    return false;
  }

  function addToBP(course, year, semester) {
    console.log("adding bp");
    var k = year + semester;
    console.log(k);
    var sameTermCourses = bpMap.get(k);
    if (sameTermCourses === undefined) {
      alert("Please choose correct year and semester!");
    } else if (ifInBP(course)) {
      alert("this course is already in the blueprint!");
    } else if (sameTermCourses.length > 5) {
      console.log("errror");
      alert("No more than five courses in one semester!");
    } else {
      sameTermCourses.push(course)
      bpMap.set(k,sameTermCourses)
      removeFromCart(course)
    }
  }

  function removeFromBP(course) {
    console.log("removing" + course);
    for (const [term, termCourses] of bpMap) {
      for (var i = 0; i < termCourses.length; i++) {
        if (termCourses[i].course_name === course.course_name) {
          var tempCourseList = termCourses;
          tempCourseList.splice(i, 1);
          bpMap.set(term, tempCourseList);
        }
      }
    }
    addToCart(course);
  }

  // an ugly version for now
  function exportCsv() {
    var semesters = ["year 1", "year 2", "year 3", "year 4"];
    let csvContent = "data:text/csv;charset=utf-8,";
    for (const [key, value] of bpMap) {
      let row = "";
      row += semesters[key];
      row += ",";
      for (var i = 0; i < value.length; i++) {
        row += value[i].course_name;
        row += (",");
      }
      row += "\n";
      csvContent += row;
    }
    var encodedUri = encodeURI(csvContent);
    window.open(encodedUri);
  }

  function addTab(type, data) {
    if (tabCount > 8) {
      // return error
    } else {
      if (type === "Results") {
        resultCount += 1;
        var newTab = "";

        if (search.length > 6) {
          newTab = search.slice(0, 5);
          newTab += "...";
        } else {
          newTab = search;
	  if ( newTab == "null" ) {
	    if (searchValue.length > 6) {
              newTab = searchValue.slice(0, 5);
              newTab += "...";
            }
	    else {
	      newTab = searchValue;
	    }
	  }
        }
      } else if (type === "CourseInfo") {
	var course_code = `${data.course_code}`;
        if (course_code === 'undefined') {
	  course_code = `${data.code}`;
	}
	var tabKeyArray = Array.from(tabMap.keys());
	for (var i = 0; i < tabKeyArray.length; i++) {
	  if (tabKeyArray[i].includes(`${course_code}`)) {return false;}
	}
        courseInfoCount += 1;
        var newTab = null;
        newTab = `${data.course_name}`;
        if (newTab === "undefined") {
          newTab = `${data.name}`;
        }
        if (newTab.length > 12) {
          newTab = newTab.slice(0, 11);
          newTab += "...";
        }
      }

      data["type"] = type;
      data["tab_name"] = newTab;
      var newID = `tab_${+new Date()}_${data.course_code}`;
      tabMap.set(newID, data);

      setSelected(newID);
      setTabCount(tabCount + 1);
    }
    return true;
  }

  function removeTab(tab_id) {
    var data = tabMap.get(tab_id);
    var type = data.type;

    if (type == "Results") {
      resultCount -= 1;
    } else if (type === "CourseInfo") {
    }

    var indexOfTab = tabIDs.indexOf(tab_id);
    tabMap.delete(tab_id);
    tabIDs.splice(indexOfTab, 1);

    if (selected === tab_id && indexOfTab == tabCount - 1) {
      setSelected(tabIDs.pop());
    } else if (selected === tab_id) {
      setSelected(tabIDs[indexOfTab]);
    }

    setTabCount(tabCount - 1);
  }

  function searchGeneral(event) {
    if (event.code === "Enter") {
      const sc = new SearchClient("none");
      sc.getInfo(search).then((data) => {	
        var res = JSON.parse(data);
	console.log(data);
	//if (res == '"error":"data not found"') return false;
        setResults(res);
        addTab("Results", res);
      });
    }
    return true;
  }

  // in case there is a bad search with no search results,
  // we open a snackbar. below are the functions required
  // for the snackbar.

  const badSearchResult = ()=> {
    var dontTriggerSnackBar = searchGeneral(search);
    console.log(dontTriggerSnackBar);
    if (!dontTriggerSnackBar) {
      setBadSearchWarning(true);
    }
  }

  const handleBadSearchWarningClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setBadSearchWarning(false);
  };

  const badSearchWarningAction = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="#005E93"
        onClick={handleBadSearchWarningClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  function setTabs() {
    var serializedTabIDs = [];
    var serializedTabPages = [];
    var tabLabelIndex = 1;
    var tabHolder = [];

    tabHolder.unshift(
      <Tab
        selected={selected}
        tabName={"Home"}
        tabID={"Home"}
        removeTab={removeTab}
        setSelected={setSelected}
      />
    );

    serializedTabIDs.push("Home");

    for (const [tabID, tabData] of tabMap) {
      serializedTabIDs[tabLabelIndex] = tabID;
      tabHolder.push(
        <Tab
          selected={selected}
          tabName={tabData.tab_name}
          tabID={tabID}
          removeTab={removeTab}
          setSelected={setSelected}
          type={tabData.type}
        />
      );

      if (tabData.type === "CourseInfo") {
        serializedTabPages.push(
          <CourseInfo
            courseData={tabData}
            page={tabData.tab_name}
            selected={selected}
            addToCart={addToCart}
            cartedCourses={cartedCourses}
            tabID={tabID}
            removeFromCart={removeFromCart}
            addTab={addTab}
            reqDataMaster={reqDataMaster}
          />
        );
      } else if (tabData.type === "Results") {
        serializedTabPages.push(
          <Results
            cartedCourses={cartedCourses}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
            selected={selected}
            results={tabData}
            page={tabData.tab_name}
            addTab={addTab}
            type={tabData.type}
            tabID={tabID}
            removeTab={removeTab}
          />
        );
      }

      tabLabelIndex++;
    }
    tabs = tabHolder;
    tabPages = serializedTabPages;
    tabIDs = serializedTabIDs;
  }

  // render tabs each time
  setTabs();

  return (
    <div>
      <div className="header">
        <AppBar position="static" style={{ background: "#005E93" }}>
          <Toolbar>
            <MenuItem component={Link} to={ROOT} sx={{ flexGrow: 1 }}>
              <Typography variant="h5">
                <b> CourseBrilliant </b>
              </Typography>
            </MenuItem>

            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search for courses..."
                inputProps={{ "aria-label": "search" }}
                onKeyPress={searchGeneral}
                onChange={(e) => {
                  badSearchResult();
                  setSearch(e.target.value);
                }
		}
              />
            </Search>

            <Snackbar
              open={badSearchWarning}
              autoHideDuration={4000}
              onClose={handleBadSearchWarningClose}
              message="No search results. Try again."
              action={badSearchWarningAction}
            />

            <MenuItem
              component={Link}
              to={BLUEPRINT}
              onClick={() => setSelected("Home")}
            >
              BluePrint
            </MenuItem>

            <Button color="inherit">Share</Button>
          </Toolbar>
        </AppBar>

        <div className="tabs">
          {tabs}

          <div class="cartOpener">
            <div
              className="tab"
              style={{ width: 8 + "vw" }}
              onClick={() => {
                toggleCart(!cartIsOpen);
              }}
            >
              <Container
                disableGutters
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
              <b>Catalogue </b>
              <div style = {{marginRight:10+'%'}}>
                <FolderSpecialIcon/>
              </div>

              </Container>
            </div>
          </div>
        </div>
      </div>

      <div class="tabHolder">
        <Box sx={{ flexGrow: 1 }}>
          {selected === "Home" && (
            <RouterConfig
              cartedCourses={cartedCourses}
              printedCourses={printedCourses}
              removeFromCart={removeFromCart}
              results={singleResult}
              exportCsv={exportCsv}
              removeFromBP={removeFromBP}
              bpMap={bpMap}
	      setResultsFromAnotherPage={setResultsFromAnotherPage}
            />
          )}
          {tabPages}
        </Box>

        <div className="cartHolder">
          <div className={cartIsOpen ? "cart opencart" : "cart"}>
            <Cart
              cartedCourses={cartedCourses}
              removeFromCart={removeFromCart}
              addToBP={addToBP}
              printedCourses={printedCourses}
              removeFromBP={removeFromBP}
              bpMap={bpMap}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
