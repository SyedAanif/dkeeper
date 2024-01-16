import React from "react";
// this a pre-built react component icon from  Material-UI built on Google's implementation of Material Design
import DeleteIcon from "@mui/icons-material/Delete";

function Note(props) {
  return (
    <div className="note">
      <h1>{props["title"]}</h1>
      <p>{props["content"]}</p>
      <button
        onClick={() => {
          props.onDelete(props["id"]);
        }}
      >
        {/* pre-built material UI react component */}
        <DeleteIcon />
      </button>
    </div>
  );
}

export default Note;
