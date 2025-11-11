import { useState } from "react";

const Persons = ({ data }) => {
  return (
    <div>
      {data.map((user) => (
        <p key={user.name}>
          {user.name}: {user.phone}
        </p>
      ))}
    </div>
  );
};

const PersonForm = ({ action }) => {
  return (<form onSubmit={action.submit[0]}>
    <div>
      Name: <input value={action.name[0]} onChange={action.name[1]} />
    </div>
    <div>
      Phone Number:{" "}
      <input value={action.phone[0]} onChange={action.phone[1]} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>)
};

const Filter = ({action})=>{
  return <div>
        Search: <input value={action.query[0]} onChange={action.query[1]} />
      </div>
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", phone: "040-123456" },
    { name: "Ada Lovelace", phone: "39-44-5323523" },
    { name: "Dan Abramov", phone: "12-43-234345" },
    { name: "Mary Poppendieck", phone: "39-23-6423122" },
  ]);

  const [newName, setNewName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("+251");
  const [query, setQuery] = useState("");

  const handleNewName = (e) => {
    setNewName(e.target.value);
  };
  const handlePhoneNumber = (e) => {
    setPhoneNumber(e.target.value);
  };
  const submitPerson = (e) => {
    e.preventDefault();
    const included = persons.some(
      (user) => user.name.toLowerCase() === newName.toLowerCase()
    );
    if (included) {
      alert(`${newName} is already added to phonebook`);
      return;
    }
    setPersons(
      persons.concat({
        name: newName,
        phone: phoneNumber,
      })
    );
    setNewName("");
    setPhoneNumber("+251");
  };
  
  const handleQuery = (e) => {
    setQuery(e.target.value);
  };
  
  const queryResult = (data) => {
    return data.filter((person) => {
      const name = person.name.toLowerCase();
      const queryTerm = query.toLowerCase();
      return name.includes(queryTerm);
    });
  };
  let searchResult = persons;
  if (query !== "") {
    searchResult = queryResult(persons);
  }
  
  const formAction = {
    name: [newName, handleNewName],
    phone: [phoneNumber, handlePhoneNumber],
    query: [query, handleQuery],
    submit: [submitPerson]
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter action={formAction}/>
      <h2>Add a new</h2>
      <PersonForm action={formAction} />
      <h2>Numbers</h2>
      <Persons data={searchResult} />
    </div>
  );
};

export default App;
