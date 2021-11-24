import { createSlice } from "@reduxjs/toolkit";

// the initial state of our enrollment feature
const initialState = {
  count:2,
  selected: 'Home', 
  tabs: ['Home', 'Cart'],
  resultCount:0
};

// all the ways in which our enrollment state can be changed *** called reducers ****
export const tabSlice = createSlice({
  name: "tabs",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    addTab: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      if (state.count > 8){
        // throw error and restrict more tab creation 
      } else { 
        console.log(action.payload)
        if (action.payload==='Results'){
          state.resultCount+=1;
          if (state.resultCount > 1){
            const newTab = `Results (${state.resultCount+1})`;
            state.tabs.push(newTab);
            state.selected = newTab;
          } else {
            state.tabs.push(action.payload); 
            state.selected=action.payload;
          }
        }
 
        state.count += 1;

      }   
	
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    removeTab: (state, action) => {
      let index = state.tabs.indexOf(action.payload);
      if (index > -1) {
        state.tabs.splice(index, 1);
        state.count -= 1;
      } else {
        // throw error that course isnt added yet
      }

    },
    selectTab: (state, action) => {
      state.selected = action; 
    },
    clearTabs: (state) => {
      state.count = 1;
      state.tabs = [];
    },
    

  },
});

// the corresponding functions for all of our enrollment state manioulation *** called actions ***
export const { addTab, removeTab, selectTab, clearTabs } = tabSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const getTabCount = (state) => state.tabs.count;
export const getTabs = (state) => state.tabs.tabs;
export const getSelectedTab = (state) => state.tabs.selected; 

export default tabSlice.reducer;
