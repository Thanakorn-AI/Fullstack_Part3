// Phonebook_Frontend/src/App.jsx
import React, { useState, useEffect } from 'react';
import phonebookService from './services/phonebook';
import Filter from './components/Filter';
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';

// Notification component with inline styling
const Notification = ({ message, isError }) => {
  if (message === null) {
    return null;
  }
  
  const notificationStyle = {
    color: isError ? 'red' : 'green',
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px',
    borderColor: isError ? 'red' : 'green'
  };

  return (
    <div style={notificationStyle}>
      {message}
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');  // New state for handling phone numbers
  const [searchTerm, setSearchTerm] = useState('');
  const [notification, setNotification] = useState(null);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    phonebookService.getAll()
      .then(response => {
        setPersons(response.data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);


  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const addPerson = event => {
    event.preventDefault();
    const personObject = { name: newName, number: newNumber };
    const existingPerson = persons.find(p => p.name.toLowerCase() === newName.toLowerCase());
  
    if (existingPerson) {
      if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
        phonebookService
          .update(existingPerson.id, { ...existingPerson, number: newNumber })
          .then(response => {
            setPersons(persons.map(p => p.id === existingPerson.id ? response.data : p));
            setNotification(`Updated ${newName}'s number`);
            setIsError(false);
            setTimeout(() => setNotification(null), 5000);
            setNewName('');
            setNewNumber('');
          })
          .catch(error => {
            console.error('Error updating person:', error);
            setNotification(error.response.data.error || `Failed to update ${newName}.`);
            setIsError(true);
            setTimeout(() => setNotification(null), 5000);
          });
      }
    } else {
      phonebookService
        .create(personObject)
        .then(response => {
          setPersons(persons.concat(response.data));
          setNotification(`Added ${newName} to the Phonebook`);
          setIsError(false);
          setTimeout(() => setNotification(null), 5000);
          setNewName('');
          setNewNumber('');
        })
        .catch(error => {
          console.error('Error adding person:', error);
          setNotification(error.response.data.error || `Error adding ${newName} to the phonebook.`);
          setIsError(true);
          setTimeout(() => setNotification(null), 5000);
        });
    }
  };
  
  const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      phonebookService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id));
        })
        .catch(error => {
          console.error('Error deleting person:', error);
          setNotification(`The information of ${name} was already removed from the server.`);
          setIsError(true);
          setPersons(persons.filter(p => p.id !== id)); // Optionally refresh list if not found
          setTimeout(() => {
            setNotification(null);
          }, 5000);
        });
    }
  };

  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} isError={isError} />
      <Filter value={searchTerm} onChange={handleSearchChange} />
      <h3>Add a new contact</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons persons={filteredPersons} onDelete={deletePerson} />
    </div>
  );
};

export default App;
