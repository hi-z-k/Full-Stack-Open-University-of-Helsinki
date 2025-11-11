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
const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phone: '040-123456' },
    { name: 'Ada Lovelace', phone: '39-44-5323523' },
    { name: 'Dan Abramov', phone: '12-43-234345' },
    { name: 'Mary Poppendieck', phone: '39-23-6423122' }
  ])  
  const [newName, setNewName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("+251")
  const [query, setQuery] = useState('')
  const handleNewName = (e) => {
    setNewName(e.target.value);
  };
  const handlePhoneNumber = (e) => {
    setPhoneNumber(e.target.value);
  }
  const handleQuery = (e) => {
    setQuery(e.target.value)
  }
  const queryResult = (data) => {
    return data.filter(person => {
      const name = person.name.toLowerCase()
      const queryTerm = query.toLowerCase()
      return name.includes(queryTerm)
    })
  }
  let searchResult = persons
  if (query !== ""){
    searchResult = queryResult(persons)
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
      phone: phoneNumber
    }));
    setNewName("")
    setPhoneNumber("+251")
  };
  return (
    <div>
      <h2>Phonebook</h2>
      <div>Search: <input value={query} onChange={handleQuery} /></div>
      <form onSubmit={submitPerson}>
      <div>
        Name: <input value={newName} onChange={handleNewName} />
      </div>
        <h2>Add a new</h2>
        <div>Phone Number: <input value={phoneNumber} onChange={handlePhoneNumber} /></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <AddressList data={searchResult} />
    </div>
  );
};

export default App;
