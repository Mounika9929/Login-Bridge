import './index.css'

const NoteItem = ({ note, onEdit, onDelete }) => {
  return (
    <li className="bg-white p-4 rounded-lg shadow-md mb-4 flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <h4 className="text-lg font-semibold">{note.title}</h4>
        <small className="text-gray-400 text-sm">
          {new Date(note.created_at).toLocaleString()}
        </small>
      </div>
      <p className="text-gray-700">{note.content}</p>
      <div className="flex gap-2 mt-2">
        <button
          onClick={() => onEdit(note)}
          className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500 transition-colors"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(note.id)}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors"
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default NoteItem;
