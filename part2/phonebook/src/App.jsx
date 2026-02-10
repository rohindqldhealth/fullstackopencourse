import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personsService from "./services/persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [number, setNumber] = useState("");
  const [filteredPersons, setFilteredPersons] = useState([]);
  const [message, setMessage] = useState({ text: null, isError: false });

  useEffect(() => {
    personsService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: number,
    };

    // check if person or number exists
    if (
      persons.some(
        (person) => person.name.toLowerCase() === newName.toLowerCase(),
      )
    ) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, do you want to update their phonenumber?`,
        )
      ) {
        const person = persons.find(
          (p) => p.name.toLowerCase() === newName.toLowerCase(),
        );
        const updatedPerson = { ...person, number: number };
        personsService
          .update(person.id, updatedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((p) => (p.id !== person.id ? p : returnedPerson)),
            );
            setNewName("");
            setNumber("");
          });
      }
      return;
    }

    if (persons.some((person) => person.number === number)) {
      alert(`${number} is already added to phonebook`);
      return;
    }
    personsService.create(personObject).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson));
      setNewName("");
      setNumber("");
    });
    setMessage({ text: `Added ${newName}`, isError: false });
    setTimeout(() => {
      setMessage({ text: null, isError: false });
    }, 5000);
  };

  const deletePerson = (id) => {
    if (window.confirm("Are you sure you want to delete this person?")) {
      personsService
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
          setMessage({
            text: `Deleted ${persons.find((p) => p.id === id).name}`,
            isError: false,
          });
        })
        .catch((_error) => {
          setMessage({
            text: `Information of ${persons.find((p) => p.id === id).name} has already been removed from server`,
            isError: true,
          });
        });

      setTimeout(() => {
        setMessage({ text: null, isError: false });
      }, 5000);
    }
  };

  const filtered = filteredPersons.length > 0 ? filteredPersons : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter setFilter={setFilteredPersons} persons={persons} />
      <h3>add a new Person</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        setNewName={setNewName}
        number={number}
        setNumber={setNumber}
      />
      <h3>Numbers</h3>
      <Persons filtered={filtered} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
