const express = require("express");

// Create a new app object
const app = express();
app.use(express.json());

// Dummy data used by the server
let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1,
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2,
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3,
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: 4,
  },
];

/**
 * Home route
 */
app.get("/", (req, res) => {
  const html = `
  <p>Phonebook has information for ${persons.length} people</p>
  <p>${new Date()}</p>`;

  res.send(html);
});

/**
 * API read route
 * Returns all the persons in JSON format
 */
app.get("/api/persons", (req, res) => {
  res.json(persons);
});

/**
 * API read route
 * Returns the person with the specified id
 */
app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((p) => p.id === id);
  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

/**
 * API delete route
 * Deletes the persons with the specified id
 */
app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((person) => person.id !== id);

  // Send 204 no content response
  res.status(204).end();
});

app.post("/api/persons", (req, res) => {
  const body = req.body;

  // Check request content
  if (!body.name && body.number) {
    return res.status(400).json({
      error: "content missing",
    });
  }

  // Create a new person object
  const person = {
    name: body.name,
    number: body.number,
    date: new Date(),
    id: generateId(),
  };

  // Add new person to persons
  persons = persons.concat(person);

  // Respond with newly created person
  res.json(person);
});

/**
 * Generate an ID using Math.random,
 * Math.round and the exponential operator
 * Warning: is not collision-free
 */
const generateId = () => {
  return Math.round(Math.random() * 10 ** 10);
};

// Port to listen on
const PORT = 3001;

/**
 * Start the server on the specified port
 */
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
