import { useState } from "react";

const AddressList = ({ data }) => {
  return (
    <div>
      {data.map((user) => (
        <p key={user.name}>{user.name}</p>
      ))}
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const handleNewName = (e) => {
    setNewName(e.target.value);
  };
  const submitPerson = (e) => {
    e.preventDefault();
    const included = persons.some((user) => user.name.toLowerCase() === newName.toLowerCase());
    if (included) {
      alert(`${newName} is already added to phonebook`)
      return
    }
    setPersons(persons.concat({ name: newName }));
    setNewName("");
  };
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={submitPerson}>
        <div>
          name: <input value={newName} onChange={handleNewName} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <AddressList data={persons} />
    </div>
  );
};

export default App;
