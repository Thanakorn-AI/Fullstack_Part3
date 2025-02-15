// Phonebook_Backend/models/person.js
const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

// Use environment variable to get your Mongo URI
const url = process.env.MONGODB_URI;

console.log('Connecting to', url);

mongoose.connect(url)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.log('Error connecting to MongoDB:', error.message);
  });

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

// Transform _id -> id, remove __v
personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

module.exports = mongoose.model('Person', personSchema);

