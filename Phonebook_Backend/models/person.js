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
    name: {
      type: String,
      minLength: [3, 'You must enter at least three characters for a name'],  // Custom message
      required: true
    },
    number: {
      type: String,
      validate: {
        validator: function(v) {
          return /^(\d{2,3})-(\d+)$/.test(v) && v.length >= 8;
        },
        message: props => `${props.value} is not a valid phone number! It should have 2-3 digits, a hyphen, and remaining digits, with a total length of at least 8.`
      },
      required: [true, 'Phone number is required']
    }
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

