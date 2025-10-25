import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Header from "../Header";
import NoteForm from "../NoteForm";
import NoteList from "../NoteList";
import './index.css'

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [message, setMessage] = useState("");
  const [editingNote, setEditingNote] = useState(null);

  const token = Cookies.get("jwt_token");

  const fetchNotes = async () => {
    try {
      const res = await fetch("https://login-bridge.onrender.com/notes", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setNotes(data.notes);
    } catch (err) {
      console.error(err);
      setMessage("Network error");
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleSave = async (noteData) => {
    try {
      let res;
      if (editingNote) {
        res = await fetch(`https://login-bridge.onrender.com/notes/${editingNote.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(noteData),
        });
      } else {
        res = await fetch("https://login-bridge.onrender.com/add-note", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(noteData),
        });
      }

      const data = await res.json();
      setMessage(data.msg || data.err_msg);
      setEditingNote(null);
      fetchNotes();
    } catch (err) {
      console.error(err);
      setMessage("Network error");
    }
  };

  const handleEdit = (note) => setEditingNote(note);
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`https://login-bridge.onrender.com/notes/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setMessage(data.msg || data.err_msg);
      fetchNotes();
    } catch (err) {
      console.error(err);
      setMessage("Network error");
    }
  };
  const cancelEdit = () => setEditingNote(null);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <Header />
      <div className="max-w-3xl mx-auto mt-6 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Your Notes</h2>
        {message && <p className="mb-4 text-red-500">{message}</p>}
        <NoteForm
          onSave={handleSave}
          editingNote={editingNote}
          cancelEdit={cancelEdit}
        />
        <NoteList
          notes={notes}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default Notes;
