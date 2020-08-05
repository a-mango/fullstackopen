const express = require("express");

// Create a new app object
const app = express();
app.use(express.json());

// Dummy data used by the server
const persons = [
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
  <p>${new Date()}</p>`

  res.send(html);
});

/**
 * API read route
 * Returns all the persons in JSON format
 */
app.get("/api/persons", (req, res) => {
  res.json(notes);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});