import React, { useState, useEffect } from 'react';
import Note from './components/Note';
import INote from './shared/interfaces/INote';
import noteService from "./services/notes";
import ErrorMessage from './components/ErrorMessage';
import "./App.css";

const App = (): JSX.Element => {
  const [notes, setNotes] = useState<INote[]>([]);
  const [input, setInput] = useState<string>("A new note...");
  const [showAll, setShowAll] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const showError = (message: string, duration?: number): void => {
    setErrorMessage(message);

    if (duration)
      setTimeout(() => setErrorMessage(null), duration);
  };
  
  useEffect(() => {
    noteService.getNotes()
      .then(notes => setNotes(notes))
      .catch(() => showError("Error: Failed to fetch notes, server unavailable"))
  }, []);

  const notesToShow: INote[] = showAll ? notes : notes.filter(note => note.important);

  const toggleShowAll: (() => void) = () =>
    setShowAll(!showAll);
  
  const changeInput: ((event: React.ChangeEvent<HTMLInputElement>) => void) = (event) =>
    setInput(event.target.value);

  const onInputClick: ((event: React.MouseEvent<HTMLInputElement>) => void) = (event) => {
    if (event.currentTarget.value === "A new note...")
      event.currentTarget.value = "";
  };

  const addNote: ((event: React.FormEvent<HTMLFormElement>) => void) = (event) => {
    event.preventDefault();

    const note: INote = {
      id: notes.length + 1,
      content: input,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
    };

    noteService.createNote(note)
      .then(note => {
        setNotes(notes.concat(note));
        setInput("");
      })
      .catch(() => showError("Error: Failed to save the note"));
  };

  const toggleImportanceOf = (id: number) => {
    const note = notes.find(note => note.id === id);

    if (note) {
      noteService.updateNote(id, { ...note, important: !note.important })
        .then(updatedNote => {
          setNotes(notes.map(note =>
            note.id === id ? updatedNote : note
          ));
        }).catch(() => {
          showError("Error: Failed to update the note", 5000);
          setNotes(notes.filter(note => note.id !== id));
        });
    }
  };

  return (
    <div>
      <h1>Notes</h1>
      <ErrorMessage message={errorMessage} />
      <button onClick={toggleShowAll}>
        Show {showAll ? "important" : "all"}
      </button>
      <ul>
        {notesToShow.map(note =>
          <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)} />
        )}
      </ul>

      <form onSubmit={addNote}>
        <input value={input} onChange={changeInput} onClick={onInputClick}/>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default App;