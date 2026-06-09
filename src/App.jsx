import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [note, setNote] = useState("");
  const [search, setSearch] = useState("");

  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem("notes");
    return savedNotes ? JSON.parse(savedNotes) : [];
  });

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    if (note.trim() === "") return;

    const newNote = {
      id: Date.now(),
      text: note,
      date: new Date().toLocaleString(),
    };

    setNotes([newNote, ...notes]);
    setNote("");
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const filteredNotes = notes.filter((note) =>
    note.text.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <div className="card">
        <h1>📝 Smart Notes App</h1>
        <p className="subtitle">
          Capture, Search & Organize Your Ideas
        </p>

        <div className="stats">
          <div className="stat-box">
            Total Notes: {notes.length}
          </div>
        </div>

        <div className="input-section">
          <input
            type="text"
            placeholder="Write your note here..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                addNote();
              }
            }}
          />

          <button onClick={addNote}>
            Add Note
          </button>
        </div>

        <div className="search-section">
          <input
            type="text"
            placeholder="🔍 Search notes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {filteredNotes.length === 0 ? (
          <p className="empty">
            No Notes Found 📭
          </p>
        ) : (
          <div className="notes-grid">
            {filteredNotes.map((note) => (
              <div
                className="note-card"
                key={note.id}
              >
                <p>{note.text}</p>

                <small>{note.date}</small>

                <button
                  className="delete-btn"
                  onClick={() =>
                    deleteNote(note.id)
                  }
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}

        <footer>
          Built with ReactJS by Yamini
          Chatrasi 💙
        </footer>
      </div>
    </div>
  );
}

export default App;