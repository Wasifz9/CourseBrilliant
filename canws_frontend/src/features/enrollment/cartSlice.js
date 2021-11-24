import { createSlice } from "@reduxjs/toolkit";

// the initial state of our enrollment feature
const initialState = {
  count: 0,
  courses: [],
};

// all the ways in which our enrollment state can be changed *** called reducers ****
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    addCourse: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      let index = state.courses.indexOf(action.payload);
      if (index > -1) {
        // throw error course is already added
      } else {
        state.courses.push(action.payload);
        state.count += 1;
      }
     
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    removeCourse: (state, action) => {
      let index = state.courses.indexOf(action.payload);
      if (index > -1) {
        state.courses.splice(index, 1);
      } else {
        // throw error that course isnt added yet
      }
      state.count -= 1;
    },
    clearCourses: (state) => {
      state.count = 0;
      state.courses = [];
    },
  },
});

// the corresponding functions for all of our enrollment state manioulation *** called actions ***
export const { addCourse, removeCourse, clearCourses } = cartSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectCartCount = (state) => state.cart.count;
export const selectCartCourses = (state) => state.cart.courses;

export default cartSlice.reducer;
