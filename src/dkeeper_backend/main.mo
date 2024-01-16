import Text "mo:base/Text";
import List "mo:base/List";
import Debug "mo:base/Debug";
import Nat "mo:base/Nat";

actor DKeeper {

  // create custom data-type accessible from outside the actor
  public type Note = {
    title : Text;
    content : Text;
  };

  // Create an empty List of Note type --> Think of Generics from Java
  stable var notes : List.List<Note> = List.nil<Note>();

  public func createNote(titleText : Text, contentText : Text) {
    Debug.print("Note create on backend");

    // create a note --> Set attributes to the data-type
    let newNote : Note = {
      title = titleText;
      content = contentText;
    };

    // pre-pend(head) items to the list beginning and assign to the list
    notes := List.push(newNote, notes);

    Debug.print(debug_show (notes));

  };

  // query ARRAY of notes. -> easier to retrieve on block chain
  public query func readNotes() : async [Note] {
    return List.toArray(notes);
  };

  // remove some id from list
  // See docs: https://internetcomputer.org/docs/current/motoko/main/base/List
  public func removeNote(id : Nat) {
    // get elements till index
    let listFront = List.take(notes, id);

    // drop elements till index
    let listBack = List.drop(notes, id +1);

    // concat the lists
    notes := List.append(listFront, listBack);

  };
};
