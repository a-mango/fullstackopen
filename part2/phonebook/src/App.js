import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const nameExists = (name) =>
    persons.some((p) => p.name.toUpperCase() === name.toUpperCase());

  const personsToShow =
    filter === ""
      ? persons
      : persons.filter((p) =>
          p.name.toUpperCase().includes(filter.toUpperCase())
        );

  const confirm = (message) => window.confirm(message);

  const resetForm = () => {
    setNewName("");
    setNewNumber("");
  };

  const addPerson = (event) => {
    event.preventDefault();

    // Check if person already exists, then place either a create or an update call
    const newPerson = {
      name: newName,
      number: newNumber,
    };

    // If person already exists, prompt if its number should be updated
    if (nameExists(newName)) {
      updatePerson(newPerson);
    } else {
      personService.create(newPerson).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
      });
    }
    resetForm();
  };

  const updatePerson = (person) => {
    if (
      confirm(
        `${newName} already exists. Replace the old number with a new one?`
      )
    ) {
      // Find the existing person to get the id
      const oldPerson = persons.find(
        (p) => p.name.toUpperCase() === person.name.toUpperCase()
      );
      // Send REST call to update person on the server
      personService
        .update(oldPerson.id, person)
        .then((returnedPerson) => {
          setPersons(
            persons.map((p) =>
              p.id !== returnedPerson.id ? p : returnedPerson
            )
          );
        })
        .catch(() => {
          window.alert(`The person ${person.name} was deleted from the server`);
          setPersons(persons.filter((p) => p.id !== person.id));
        });
    }
  };

  const deletePerson = (person) => {
    // Check if the person was found or display an error
    if (person === undefined) {
      window.alert(`Person with id ${person.id} was not found`);
    } else {
      // Confirm the deletion
      if (confirm(`Delete ${person.name} from the phonebook?`)) {
        personService.remove(person.id).catch(() => {
          window.alert(`Resource wasn't found on the server`);
        });
        // Remove the person from the application's state
        setPersons((persons) => persons.filter((p) => p.id !== person.id));
      }
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter filter={filter} setFilter={setFilter} />
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <Persons persons={personsToShow} handleDelete={deletePerson} />
    </div>
  );
};

export default App;
