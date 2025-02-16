// Phonebook/src/components/Filter.jsx
const Filter = ({ value, onChange }) => {
  return (
    <div>
        search: <input
        id="search"
        name="search"
        value={value}
        onChange={onChange}
        autoComplete="on"  />
    </div>
  )
}

export default Filter