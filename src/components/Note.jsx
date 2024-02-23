const Note = ({ note, toggleImportance }) => {
  const label = note.important ? 'important' : 'not important';

  return (
    <li className="flex justify-between items-center bg-gray-100 p-2 rounded mb-2">
      <span className="flex-1 truncate">{note.content}</span>
      <button
        onClick={toggleImportance}
        className={`whitespace-nowrap py-1 px-3 rounded text-sm font-medium leading-none text-center
                     ${note.important ? 'bg-red-500 hover:bg-red-700 text-white' : 'bg-green-500 hover:bg-green-700 text-white'}
                     w-48 md:w-60`} // Adjust width as needed
        style={{ minWidth: '8rem', maxWidth: '8rem', overflow: 'hidden', textOverflow: 'ellipsis' }}
      >
        {label}
      </button>
    </li>
  );
};

export default Note;
