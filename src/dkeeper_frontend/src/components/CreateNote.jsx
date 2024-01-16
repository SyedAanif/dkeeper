import React, { useState } from "react";

// Material-UI Icon
import AddIcon from "@mui/icons-material/Add";

// Floating Action Button(FAB)
import Fab from "@mui/material/Fab";

// Zoom Animation on FAB
import Zoom from "@mui/material/Zoom";
// // or
// import { Zoom } from '@mui/material';

function CreateNote(props) {
  let emptyNote = {
    title: "",
    content: "",
  };
  const [noteDetails, setNoteDetails] = useState(emptyNote);

  function createNote(event) {
    // add to main list
    props.onAdd(noteDetails);

    // clear data
    setNoteDetails(emptyNote);

    //  necessary to prevent refresh
    event.preventDefault();

    // reset note taker
    setClicked(false);
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setNoteDetails((prevDetails) => {
      return { ...prevDetails, [name]: value };
    });

    // console.log(noteDetails);
  }

  // hold state for expanding the text area
  const [clicked, setClicked] = useState(false);
  function expand() {
    setClicked(true);
  }

  return (
    <form className="create-note ">
      {/* render only if clicked */}
      {clicked && (
        <input
          name="title"
          placeholder="Title"
          onChange={handleChange}
          value={noteDetails["title"]}
        />
      )}
      <textarea
        name="content"
        placeholder="Take a note..."
        rows={clicked ? "4" : "1"}
        onChange={handleChange}
        value={noteDetails["content"]}
        onClick={expand}
      />
      {/* <button onClick={createNote}> */}
      {/* pre-built material UI component */}
      {/* <AddIcon /> */}
      {/* </button> */}
      {/* zoom transition in */}
      <Zoom in={clicked}>
        {/* Floating Action Button */}
        <Fab onClick={createNote}>
          {/* pre-built material UI component */}
          <AddIcon />
        </Fab>
      </Zoom>
    </form>
  );
}

export default CreateNote;
