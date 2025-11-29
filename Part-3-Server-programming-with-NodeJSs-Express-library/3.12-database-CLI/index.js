import mongoose from "mongoose";
import { makePerson, Person } from "./Schema/Person.js";

const hasPassword = process.argv.length >= 3;

const getActionLink = (password) => {
  return `mongodb+srv://fullstack:${password}@cluster0.k2nwzpr.mongodb.net/AddressBook?retryWrites=true&w=majority&appName=Cluster0`;
};

const printPeople = (people) => {
  console.log(`phonebook:`);
  people.forEach(({ fullName, phone }) => {
    console.log(`${fullName} ${phone}`);
  });
};

if (!hasPassword) {
  console.log(`didn't pass database user password...`);
  process.exit();
}

const [password, fullName, phoneNum] = process.argv.slice(2);
const url = getActionLink(password);

mongoose.set("strictQuery", false);
mongoose
  .connect(url, { family: 4 })
  .then(() => {
    if (password && fullName && phoneNum) {
      return makePerson(fullName, phoneNum)
        .save()
        .then((r) => {
          console.log(`added ${fullName} number ${phoneNum} to phonebook`);
        })
        .catch((e) => console.log(`Couldn't save the data...`));
    } else {
      return Person.find({})
        .then((people) => printPeople(people))
        .catch((e) => console.log(`Couldn't load the phonebook...`));
    }
})
.then(() => mongoose.connection.close())
.catch((err) => console.log("Incorrect password...."));
