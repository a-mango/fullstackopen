import React, { useState, useEffect } from "react";
import personService from "./services/persons";
import Filter from "./components/Filter";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      console.log(initialPersons);
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

  const addPerson = (event) => {
    event.preventDefault();

    if (nameExists(newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    const newPerson = {
      name: newName,
      number: newNumber,
    };

    personService.create(newPerson).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson));
      setNewName("");
    });
  };

  const handlePersonDelete = (id) => {
    // Filter the person by id
    const person = persons.filter((p) => p.id === id)[0];
    // Check if the person was found or display an error
    if (person === undefined) {
      window.alert(`Person with id ${id} was not found`);
    } else {
      // Confirm the deletion
      const isDeletionConfirmed = window.confirm(
        `Delete ${person.name} from the phonebook ?`
      );
      if (isDeletionConfirmed) {
        // Send rest call to delete person and handle error
        console.log("Deleting person", person);
        personService
          .remove(id)
          .then(request => {
            console.log(request);
          })
          .catch(() => {
            window.alert(`Resource wasn't found on the server`);
          });
        // Remove the person from the application's state
        setPersons((persons) => persons.filter((p) => p.id !== id));
      }
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter
        filter={filter}
        setFilter={setFilter}
        handleFilterChange={handleFilterChange}
      />
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <Persons
        persons={personsToShow}
        setPersons={setPersons}
        handlePersonDelete={handlePersonDelete}
      />
    </div>
  );
};

export default App;
