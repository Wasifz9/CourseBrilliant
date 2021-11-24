import react, { useState } from "react";
import { Typography } from "@mui/material";
export default function BPitem(props) {
  const { course, addToBP, removeFromBP, removeFromBluePrint } = props;
  const [close, toggleClose] = useState(0);

  return (
    <div
      className="selectedCourse"
      onClick={() => removeFromBP(course)}
      onMouseOver={() => {
        toggleClose(1);
      }}
      onMouseOut={() => {
        toggleClose(0);
      }}
    >
      <div>
        {" "}
        <Typography variant="subtitle1"> {course.course_code} </Typography>
      </div>

      {close == 1 && <div style={{ fontSize: "12" }}>Remove</div>}
    </div>
  );
}
