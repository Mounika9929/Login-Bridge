import NoteItem from "../NoteItem";
import './index.css'

const NoteList = ({ notes, onEdit, onDelete }) => {
  if (!notes || notes.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-4">
        No notes found
      </p>
    );
  }

  return (
    <ul className="flex flex-col gap-4 mt-4">
      {notes.map((note) => (
        <NoteItem
          key={note.id}
          note={note}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
};

export default NoteList;
