import { 
  noteItemClasses,
  noteButtonBaseClasses,
  noteButtonImportantClasses,
  noteButtonNotImportantClasses } 
  from '../styles/styleConstants';


const Note = ({ note, toggleImportance }) => {
  const buttonClasses = `${noteButtonBaseClasses} ${note.important ? 
    noteButtonImportantClasses : noteButtonNotImportantClasses}`;

  return (
    <li className={noteItemClasses}>
      <span className="flex-1 mr-2 break-words">{note.content}</span>
      <button
        onClick={toggleImportance}
        className={buttonClasses}
        style={{ minWidth: '8rem', maxWidth: '8rem', overflow: 'hidden', textOverflow: 'ellipsis' }}>
        {note.important ? 'important' : 'not important'}
      </button>
    </li>
  );
};

export default Note;
