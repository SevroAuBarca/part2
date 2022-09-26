import React, { useState, useEffect } from "react";
import { Header } from "../Header";
import { ShowNotes } from "./Shownotes";
import { NotesList } from "./NotesList";
import { Note } from "./Note";
import { FormNotes } from "./FormNotes";
import { getAll, create, update, setToken } from "../../services/notes";
import loginService from "../../services/login.js";
import { LoginForm } from "./LoginForm";
import { Notification } from "./Notifiation";
export const Notes = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState();
  const [showAll, setShowAll] = useState(true);
  const [message, setMessage] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  /*   const noteFormRef = useRef();
   */ const notesToShow = showAll
    ? notes
    : notes.filter((note) => note.important === true);
  useEffect(() => {
    console.log("effect");
    getAll().then((initialNotes) => {
      console.log("promise fulfilled");
      setNotes(initialNotes);
    });
  }, []);
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      setToken(user.token);
    }
  }, []);

  const addNote = async (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
    };

    try {
      const returnedNote = await create(noteObject);
      setNotes(notes.concat(returnedNote));
      setNewNote();
    } catch (error) {
      /*       alert("error, note need more than 3 characters");
       */
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedNoteappUser", JSON.stringify(user));
      setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setMessage("Wrong credentials");
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
    console.log("logging in with", username, password);
  };

  const toggleImportanceOf = (id) => {
    console.log("importance of " + id + " needs to be toggled");
    const note = notes.find((n) => n.id === id);
    const changedNote = { ...note, important: !note.important };

    update(id, changedNote)
      .then((returnedNote) => {
        setNotes(notes.map((note) => (note.id !== id ? note : returnedNote)));
      })
      .catch((error) => {
        alert(`the note '${note.content}' was already deleted from server`);
        setNotes(notes.filter((n) => n.id !== id));
      });
  };
  return (
    <section>
      <Header title={"Notes"} />

      <Notification message={message} />

      {user === null ? (
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
        />
      ) : (
        <FormNotes
          setNewNote={setNewNote}
          addNote={addNote}
          newNote={newNote}
          user={user}
        />
      )}
      <ShowNotes setShowAll={setShowAll} showAll={showAll} />
      <NotesList>
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        ))}
      </NotesList>
    </section>
  );
};
