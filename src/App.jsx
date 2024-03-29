import { useState, useEffect } from 'react';

import Note from './components/Note'
import noteService from './services/NoteService.jsx'
import Notification from './utilities/Notification.jsx';
import './styles/output.css';
import { inputClasses, submitButtonClasses } from './styles/styleConstants.jsx'


const App = () => {
  const [notes, setNotes] = useState(null);
  const [newNote, setNewNote] = useState('');
  const [showAll, setShowAll] = useState(true);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('normal');

 

  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, []);

  // not rendering if notes is null
  if (!notes) {
    return null
  }

  const displayMessage = (msg, type = 'normal', timeout = 2000) => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => {
      setMessage('');
      setMessageType('normal'); // Reset to default after showing message
    }, timeout);
  };

  const toggleImportanceOf = (id) => {
    const note = notes.find(n => n.id === id);
    const changedNote = { ...note, important: !note.important };
    noteService
      .update(id, changedNote)
      .then(returnedNote =>{
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
    })
    .catch(error => {
      displayMessage(
          'An error occurred while changing the note importance', 
          'error', 
          5000);
      setNotes(notes.filter(n => n.id !== id));
    });
  };
  
  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() > 0.5,
    };
    noteService.create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote));
        setNewNote('');
        displayMessage(
          `added note '${newNote}' successfully`, 
          'normal', 2000);
      })
      .catch(error => {
        displayMessage(
          'An error occurred while adding the note', 
          'error', 
          5000);
      });
  };

  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  };

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important === true)

    return (
      <div className="max-w-xl mx-auto p-4">
        <h1 className="text-3xl font-semibold mb-4">Notes</h1>
        <Notification message={message} type={messageType}/>
        <div>
          <button onClick={() => setShowAll(!showAll)}>
            show {showAll ? 'important' : 'all' }
          </button>
        </div>      
        <ul className="mt-4">
          {notesToShow.map(note => 
            <Note 
              key={note.id} 
              note={note} 
              toggleImportance={() => toggleImportanceOf(note.id)}/>
          )}
        </ul>
        <form onSubmit={addNote}>
          <input
              className={inputClasses}
              value={newNote}
              onChange={handleNoteChange}
          />
          <button 
            type="submit"
            className={submitButtonClasses}>
              save
          </button>
        </form> 
      </div>
    )
  }
export default App;