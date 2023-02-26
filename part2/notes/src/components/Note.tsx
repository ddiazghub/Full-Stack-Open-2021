import React from 'react';
import INote from '../shared/interfaces/INote';

const Note = (props: { note: INote, toggleImportance: () => void }): JSX.Element => {
  return (
    <li className="note">
      {props.note.content}
      <button onClick={props.toggleImportance}>{props.note.important ? "Make not important" : "Make important"}</button>
    </li>
  );
};

export default Note;