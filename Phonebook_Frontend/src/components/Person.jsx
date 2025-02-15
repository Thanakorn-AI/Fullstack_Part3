// Phonebook/src/components/Person.jsx
import React from 'react';

const Person = ({ person, onDelete }) => {
  return (
    <div>
      {person.name} {person.number}
      <button onClick={() => onDelete(person.id, person.name)}>Delete</button>
    </div>
  );
};

export default Person;
