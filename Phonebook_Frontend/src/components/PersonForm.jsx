// Phonebook/src/components/PersonForm.jsx
const PersonForm = ({ addPerson, newName, handleNameChange, newNumber, handleNumberChange }) => {
  return (
    <form onSubmit={addPerson}>
      <div>
          name: <input
          id="name"
          name="name"
          value={newName}
          onChange={handleNameChange}
          autoComplete="name"
        />
      </div>
      <div>
          number: <input
          id="number"
          name="number"
          value={newNumber}
          onChange={handleNumberChange}
          autoComplete="tel"
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm