import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateNote from "./CreateNote";
import { dkeeper_backend } from "../../../declarations/dkeeper_backend";

function App() {
  const [notes, updateNotes] = useState([]);

  function addNote(noteDetails) {
    // backend update
    dkeeper_backend.createNote(noteDetails.title, noteDetails.content);
    // front end update
    updateNotes((prevNotes) => {
      return [noteDetails, ...prevNotes];
    });
  }

  // this HOOK gets triggered on every re-render of the component or first time load of component
  // NOTE:: we can re-run inti infinite loop if we use useState and useEffect together, because of re-render
  // to prevent infinte re-render we can use second arg and set it to some prop, which is used to check for change for the HOOK trigger
  useEffect(() => {
    // uncomment this to see the change and also remove [] to see infinite
    // console.log("Use effect triggered");
    // separate out a fucntion, because MOTOKO QUERY is ASYNC
    fetchData();
  }, []);

  async function fetchData() {
    // backend get
    const notesArray = await dkeeper_backend.readNotes();
    // update notes in the HOOK
    updateNotes(notesArray);
  }

  function deleteNote(id) {
    // backend remove
    dkeeper_backend.removeNote(id);
    // front end remove
    updateNotes((prevNotes) => {
      return prevNotes.filter((_, index) => {
        return index !== id;
      });
    });
  }

  return (
    <div>
      <Header />
      <CreateNote onAdd={addNote} />
      {notes.map((note, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={note["title"]}
            content={note["content"]}
            onDelete={deleteNote}
          />
        );
      })}

      <Footer />
    </div>
  );
}

export default App;
