import { useState, useEffect } from "react";
import Server from "./Services/server";
const Persons = ({ data,onDelete}) => {
  return (
    <div>
      {data.map((user) => (
        <p key={user.id}>
          {user.name}: {user.phone}
          {"\t"}
          <button type="button" onClick={()=>onDelete(user.id)}>Delete</button>
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
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("+251");
  const [query, setQuery] = useState("");

  const hook = ()=>{
    Server.loadDataFromServer()
    .then(data=>setPersons(data))
  }
  useEffect(hook,[])


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
    const newUser = {
        name: newName,
        phone: phoneNumber,
      }
    Server.addDataToServer(newUser)
    .then(data=>{
      setPersons(persons.concat(data))
      setNewName("");
      setPhoneNumber("+251");
    })
    .catch(error=>alert(`Couldn't add ${newName}, Try again`))
    
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
  const deletePhone = (id)=>{
    const person = persons.find(person=>person.id===id)
    if (!person) return
    const isConfirmed = confirm(`Do you want to delete ${person.name} from the phonebook?`)
    if (isConfirmed){
      Server.DeleteFromServer(id)
      .then(id=>setPersons(persons.filter(person=>person.id !== id)))
      .catch(e=>alert(`Couldn't delete ${person.name} from the phonebook`))
    }
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
      <Persons data={searchResult} onDelete={deletePhone}/>
    </div>
  );
};

export default App;
