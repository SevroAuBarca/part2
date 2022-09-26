export const FormNotes = ({ addNote, newNote, setNewNote, user }) => {
  const handleNoteChange = (event) => {
    console.log(event.target.value);
    setNewNote(event.target.value);
  };
  return (
    <form onSubmit={addNote}>
      <p>{user.name} Loged-in</p>
      <input
        value={newNote}
        onChange={handleNoteChange}
        placeholder="Create Note..."
      />
      <button type="submit">save</button>
    </form>
  );
};
