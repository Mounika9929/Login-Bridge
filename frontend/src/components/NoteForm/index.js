import { useState, useEffect } from "react";
import './index.css'

const NoteForm = ({ onSave, editingNote, cancelEdit }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (editingNote) {
      setTitle(editingNote.title);
      setContent(editingNote.content);
    } else {
      setTitle("");
      setContent("");
    }
  }, [editingNote]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !content) return;
    onSave({ title, content });
    setTitle("");
    setContent("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg mx-auto flex flex-col gap-4"
    >
      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={5}
        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
      />

      <div className="flex gap-4">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
        >
          {editingNote ? "Update Note" : "Add Note"}
        </button>
        {editingNote && (
          <button
            type="button"
            onClick={cancelEdit}
            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition-colors"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default NoteForm;
