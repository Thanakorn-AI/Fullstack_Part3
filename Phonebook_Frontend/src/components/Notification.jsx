// Phonebook_Frontend/src/components/Notification.jsx
const Notification = ({ message, isError }) => {
  if (message === null) {
    return null
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
  }

  return <div style={notificationStyle}>{message}</div>
}

export default Notification
