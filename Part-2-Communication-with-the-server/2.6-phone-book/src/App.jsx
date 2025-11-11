import { useState } from "react";

const AddressList = ({ data }) => {
  return (
    <div>
      {data.map((user) => (
        <p key={user.name}>{user.name}: {user.phone}</p>
      ))}
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas", phone:"+251901020304" }]);
  const [newName, setNewName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("+251")

  const handleNewName = (e) => {
    setNewName(e.target.value);
  };
  const handlePhoneNumber = (e)=>{
    setPhoneNumber(e.target.value);
  }
  const submitPerson = (e) => {
    e.preventDefault();
    const included = persons.some((user) => user.name.toLowerCase() === newName.toLowerCase());
    if (included) {
      alert(`${newName} is already added to phonebook`)
      return
    }
    setPersons(persons.concat({ 
      name: newName, 
      phone:phoneNumber 
    }));
    setNewName("")
    setPhoneNumber("+251")
  };
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={submitPerson}>
        <div>
          name: <input value={newName} onChange={handleNewName} />
        </div>
        <div>number: <input value={phoneNumber} onChange={handlePhoneNumber}/></div>
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
