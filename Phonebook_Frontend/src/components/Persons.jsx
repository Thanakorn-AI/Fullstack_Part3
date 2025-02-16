// Phonebook/src/components/Persons.jsx

const Persons = ({ persons, onDelete }) => {
  return (
    <div>
      {persons.map(person =>
        <Person key={person.id} person={person} onDelete={onDelete} />
      )}
    </div>
  )
}

export default Persons