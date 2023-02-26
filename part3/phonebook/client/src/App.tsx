import React, { useEffect, useState} from 'react';
import IPerson from './shared/interfaces/IPerson';
import TextField from './components/TextField';
import PersonForm from './components/PersonForm';
import PersonList from './components/PersonList';
import personService from "./services/persons";
import INotification from './shared/interfaces/INotification';
import Notification from './components/Notification';
import "./App.css"
import NotificationType from './shared/enums/NotificationType';

const App = (): JSX.Element => {
  const [persons, setPersons] = useState<IPerson[]>([]);
  const [newName, setNewName] = useState<string>("");
  const [newNumber, setNewNumber] = useState<string>("")
  const [filter, setFilter] = useState<string>("");
  const [notification, setNotification] = useState<INotification | null>(null);
  
  const filterRegExp: RegExp = new RegExp(filter.toLowerCase());
  const shown: IPerson[] = filter === "" ? persons : persons.filter(person =>
    filterRegExp.test(person.name.toLowerCase()));

  useEffect(() => {
    personService.getPersons()
      .then(persons => setPersons(persons));
  }, []);

  const showNotification = (message: string, type: NotificationType, duration?: number): void => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), duration);
  };

  const changeName: ((event: React.ChangeEvent<HTMLInputElement>) => void) = (event) => {
    setNewName(event.target.value);
  };
  
  const changeNumber: ((event: React.ChangeEvent<HTMLInputElement>) => void) = (event) => {
    setNewNumber(event.target.value);
  };

  const changeFilter: ((event: React.ChangeEvent<HTMLInputElement>) => void) = (event) => {
    setFilter(event.target.value);
  };

  const addPerson: ((event: React.FormEvent<HTMLFormElement>) => void) = (event) => {
    event.preventDefault();

    const existingPerson = persons.find(person => person.name === newName);

    console.log(existingPerson);
    if (existingPerson) {
      if (existingPerson.number === newNumber) {
        alert(`${existingPerson.name} has already been added to the phonebook`);
        return;
      }

      if (window.confirm(`${existingPerson.name} has already been added to the phonebook, replace the old number with a new one?`)) {
        personService.updatePerson({ ...existingPerson, number: newNumber })
          .then(updatedPerson => {
            setPersons(persons.map(person => (
              person.id === updatedPerson.id ? updatedPerson : person)
            ));

            showNotification(`Updated ${updatedPerson.name}`, NotificationType.MESSAGE, 5000);
          }).catch(() => showNotification(`Failed to update ${existingPerson.name}`, NotificationType.ERROR, 5000));
      }
      
      return;
    }

    const newPerson: IPerson = {
      name: newName,
      number: newNumber
    };

    personService.createPerson(newPerson)
      .then(person => {
        setPersons(persons.concat(person));
        setNewName("");
        setNewNumber("");
        showNotification(`Added ${person.name}`, NotificationType.MESSAGE, 5000);
      })
      .catch(() => showNotification(`Failed to add ${newPerson}`, NotificationType.ERROR, 5000));
  };

  const deletePerson = (id: string): void => {
    const person = persons.find(person => person.id === id);
    
    if (person && window.confirm(`Delete ${person.name}`)) {
      personService.deletePerson(id)
        .then(id => {
          setPersons(persons.filter(person => person.id !== id));
          showNotification(`Deleted ${person.name}`, NotificationType.MESSAGE, 5000);
        });
    }
  };
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification {...notification ? { message: notification.message, type: notification.type } : {}}/>
      <TextField label="Filter" onChange={changeFilter} />
      
      <h2>Add new</h2>
      <PersonForm onSubmit={addPerson} name={newName} number={newNumber} onNameChange={changeName} onNumberChange={changeNumber} />

      <h2>Numbers</h2>
      <PersonList people={shown} deletePerson={deletePerson}/>
    </div>
  )
};

export default App;