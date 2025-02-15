// Phonebook_Backend/index.js
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');  
const app = express();
const cors = require('cors');
app.use(cors());
// Serve static frontend
app.use(express.static('dist'));

// Import the Person model
const Person = require('./models/person');

// Custom Morgan token for logging request bodies
morgan.token('body', (req) => {
    // Only stringify the body if it's not empty to avoid logging empty objects on GET requests
    return Object.keys(req.body).length ? JSON.stringify(req.body) : '';
});

app.use(express.json());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));


app.get('/api/persons', (request, response) => {
    Person.find({})
      .then(persons => {
        response.json(persons);
      })
      .catch(error => {
        // Optional: handle errors
        console.log(error);
        response.status(500).end();
      });
  });
  

  app.get('/info', async (req, res) => {
    try {
      const count = await Person.countDocuments(); // Count entries in the database
      const date = new Date();
      res.send(`Phonebook has info for ${count} people<br/>${date}`);
    } catch (error) {
      res.status(500).send('Error fetching phonebook info');
    }
  });
  

// Route to get a single person by ID
app.get('/api/persons/:id', (req, res) => {
    Person.findById(req.params.id)
      .then(person => {
        if (person) res.json(person);
        else res.status(404).send({ error: 'Person not found' });
      })
      .catch(error => res.status(400).send({ error: 'Malformed ID' }));
  });
  


// Route to delete a single person by ID
app.delete('/api/persons/:id', (req, res, next) => {
    Person.findByIdAndDelete(req.params.id)
      .then(result => {
        if (result) {
          res.status(204).end();  // Successfully deleted
        } else {
          res.status(404).json({ error: 'Person not found' });
        }
      })
      .catch(error => next(error));  // Pass errors to error handler
  });
  


// Route to add a new person
app.post('/api/persons', async (req, res) => {
    const { name, number } = req.body;
  
    if (!name || !number) {
      return res.status(400).json({ error: 'The name or number is missing' });
    }
  
    const existingPerson = await Person.findOne({ name });
    if (existingPerson) {
      return res.status(400).json({ error: 'Name must be unique' });
    }
  
    const person = new Person({ name, number });
    person.save()
      .then(savedPerson => {
        res.json(savedPerson);
      })
      .catch(error => {
        console.error('Error saving person to the DB:', error);
        res.status(500).json({ error: 'Failed to save person to the database' });
      });
  });
  

app.get('/', (req, res) => {
    res.send(`Phonebook API is running. Here's how you can interact with the API:
    <ul>
        <li>GET /api/persons - Retrieves all persons</li>
        <li>GET /api/persons/:id - Retrieves a person by ID</li>
        <li>POST /api/persons - Adds a new person (provide name and number in the request body)</li>
        <li>DELETE /api/persons/:id - Deletes a person by ID</li>
        <li>GET /info - Provides information on the number of people in the phonebook and the current server time</li>
    </ul>`);
});

app.use((error, req, res, next) => {
    console.error(error.message);
  
    if (error.name === 'CastError') {
      return res.status(400).send({ error: 'malformatted id' });
    }
  
    res.status(500).send({ error: 'internal server error' });
  });
  


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
