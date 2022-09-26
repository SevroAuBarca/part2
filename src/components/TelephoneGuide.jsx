import React, { useState, useEffect } from "react";
import { getAll, create, update, deleted } from "../services/persons";

export const TelephoneGuide = () => {
  const [persons, setPersons] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [message, setMessage] = useState("");
  let auxPerson = [];
  let valuePerson = [];

  if (!searchValue.length >= 1) {
    auxPerson = persons;
  } else {
    auxPerson = persons;
    valuePerson = auxPerson.filter((person) => {
      console.log("entra o k");
      return person.name.toLowerCase().includes(searchValue.toLowerCase());
    });
  }

  useEffect(() => {
    console.log("first");
    getAll().then((response) => {
      setPersons(response);
    });
  }, []);

  console.log(auxPerson);
  const handleSubmit = (e) => {
    e.preventDefault();
    const isSave = persons.some(
      ({ name }) => name.toLowerCase() === newName.toLowerCase()
    );
    if (isSave) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, wanna change the number?`
        )
      ) {
        updatePerson(newName);
      }
    } else addPerson();
  };

  const addPerson = () => {
    const personObject = {
      name: newName,
      number: newNumber,
    };

    create(personObject)
      .then((returnedPerson) => {
        console.log(returnedPerson);
        setPersons(persons.concat(returnedPerson.content));
        setNewName("");
        setNewNumber("");
        setMessage(`${returnedPerson.content.name} added!`);
        setTimeout(() => {
          setMessage("");
        }, 3000);
      })
      .catch((error) => {
        setMessage(
          "Error on add, name must have more than 3 characters and number more than 8 characters"
        );
        setNewName("");
        setNewNumber("");
        setTimeout(() => {
          setMessage("");
        }, 3000);
      });
  };

  const updatePerson = (name) => {
    const person = persons.find((n) => n.name === name);
    const changedPerson = { ...person, number: newNumber };
    const { id } = changedPerson;
    console.log(id);
    update(id, changedPerson)
      .then((returnedPerson) => {
        console.log(returnedPerson);
        setPersons(
          persons.map((person) => (person.id !== id ? person : returnedPerson))
        );
      })
      .catch((error) => {
        setMessage(
          `the note '${person.content}' was already deleted from server`
        );
        setPersons(persons.filter((n) => n.id !== id));
      });
  };

  const deletePerson = (id) => {
    if (window.confirm("Seguro que quieres eliminar este campo?")) {
      deleted(id).then((deletedPerson) => {
        auxPerson = persons;
      });
    }
  };

  const handleChange = (event) => {
    if (event.target.dataset.val === "name") {
      setNewName(event.target.value);
    } else if (event.target.dataset.val === "number") {
      setNewNumber(event.target.value);
    } else if (event.target.dataset.val === "filter") {
      setSearchValue(event.target.value);
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <input
        type={"text"}
        data-val={"filter"}
        value={searchValue}
        onChange={handleChange}
        placeholder="search"
      />
      <form onSubmit={handleSubmit}>
        <div>
          <p>{message}</p>
        </div>
        <div>
          name:{" "}
          <input
            type={"text"}
            data-val={"name"}
            value={newName}
            onChange={handleChange}
          />
        </div>
        <div>
          number:{" "}
          <input
            type={"text"}
            data-val={"number"}
            value={newNumber}
            onChange={handleChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {searchValue === ""
          ? auxPerson?.map((person) => (
              <li key={person.name}>
                {person.name} {person.number}{" "}
                <button onClick={() => deletePerson(person.id)}>Delete</button>
              </li>
            ))
          : valuePerson?.map((person) => (
              <li key={person.name}>
                {person.name} {person.number}{" "}
                <button onClick={() => deletePerson(person.id)}>Delete</button>
              </li>
            ))}
      </ul>
    </div>
  );
};
