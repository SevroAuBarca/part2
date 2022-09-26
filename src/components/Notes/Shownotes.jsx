export const ShowNotes = ({ setShowAll, showAll }) => (
  <div>
    <button onClick={() => setShowAll(!showAll)}>
      show {showAll ? "important" : "all"}
    </button>
  </div>
);
