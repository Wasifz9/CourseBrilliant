// Routing logic for app 

import {
  Switch,
  Route
} from "react-router-dom";



import Explore from "../pages/Explore";
import Home from "../pages/Home";
import MyPath from "../pages/MyPath";
import Results from "../pages/Results";
import BluePrint from "../pages/BluePrint";
import Bp from "../pages/Bp";
import Recommendation from "../pages/Recommendation";

export const ROOT = "/";
export const MYPATH = "/my-path";
export const EXPLORE = "/explore";
export const RESULTS = "/results"; // note that this is dummy page, we will need to create new results page links corresponding with filters and search terms.
export const BLUEPRINT = "/blueprint";
export const RECOMMENDATION = "/recommendation";

export function RouterConfig(props) { 
  const { cartedCourses, printedCourses, addToBluePrint, removeFromBluePrint, removeFromCart, results, exportCsv, removeFromBP, bpMap, addTab, setResultsFromAnotherPage } = props;

  return (
    <Switch>
    <Route exact path={EXPLORE}>
      <Explore setResultsFromAnotherPage={setResultsFromAnotherPage}/>
    </Route>
    <Route exact path={BLUEPRINT}>
    
                <Bp removeFromBP={removeFromBP} bpMap={bpMap}/>
    </Route>
    <Route exact path={RECOMMENDATION}>
      <Recommendation />
    </Route>
    <Route exact path={ROOT}>
      <Explore addTab={addTab} setResultsFromAnotherPage={setResultsFromAnotherPage}/>
    </Route>
    <Route exact path={RESULTS}>
      <Results results={results}/>
    </Route>
  </Switch>
  ); 
}
