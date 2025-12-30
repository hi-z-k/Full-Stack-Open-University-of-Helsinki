import mongoose from "mongoose";
import "dotenv/config";
import Person from "./Schema/Person.js";

const URL = process.env.URL;
let isConnected = false;

const startConnection = async () => {
  if (isConnected) return mongoose;
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(URL, { family: 4 });
    console.log("established a connection - successful");
    isConnected = true;
    return mongoose;
  } catch (e) {
    isConnected = false;
    console.log(`failed to establish a connection`);
    throw e;
  }
};

const getPhonebook = () => {
  return startConnection()
    .then(() => Person.find({}))
    .catch((e) => {
      console.log("fetching data failed");
      throw e;
    });
};

const addPerson = (name, phone) => {
  if (!name || !phone) {
    return Promise.reject({ scode: 400, data: "Data incomplete" });
  }
  return startConnection()
    .then(() => nameExists(name))
    .then((exist) => {
      if (exist) {
        return Promise.reject({
          scode: 409,
          data: "The person already in database",
        });
      }
      const person = new Person({
        name,
        phone,
      });
      return person.save().then((data) => ({ scode: 201, data }));
    })

    .catch((e) => {

      if (e.name === 'ValidationError') {
        return Promise.reject({
          scode: 400,
          data: e.message,
        });
      }

      return Promise.reject({
        scode: e.scode || 500,
        data: e.data || e.message || `unable to register ${name} to the phonebook`,
      });
    });
};

const nameExists = (name) => {
  return startConnection()
    .then(() =>
      Person.findOne({
        name,
      })
    )
    .catch((error) => {
      if (error.scode) {
        return Promise.reject(error);
      }
      return Promise.reject({ scode: 500, data: `finding person ${name} failed` });
    });
};

const exists = (name) => {
  return startConnection()
    .then(() =>
      Person.findOne({
        name,
      })
    )
    .then(person => {
      if (!person) {
        return Promise.reject({
          scode: 404,
          data: "The person not in phonebook",
        });
      }
      return person
    })
    .catch((error) => {
      if (error.scode) {
        return Promise.reject(error);
      }
      return Promise.reject({ scode: 500, data: `finding person ${name} failed` });
    });
};

const findPerson = (id) => {
  return startConnection()
    .then(() => Person.findById(id))
    .then((person) => {
      if (!person) {
        return Promise.reject({
          scode: 404,
          data: "The person not in phonebook",
        });
      }
      return { scode: 200, data: person };
    })
    .catch(({ name }) => {
      if (name == "CastError") {
        return Promise.reject({ scode: 400, data: "Invalid Id" });
      }
      return Promise.reject({ scode: 500, data: "searching person failed" });
    });
};

const updatePerson = (id, data) => {
  const { name, phone } = data
  if (!name || !phone) {
    return Promise.reject({ scode: 400, data: "Data incomplete" });
  }
  return findPerson(id)
    .then(person => person.data)
    .then((person) => {
      person.phone = phone;
      return person.save();
    })
    .then((data) => ({ scode: 200, data }))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        return Promise.reject({
          scode: 400,
          data: e.message,
        });
      }
      else if (!error.scode) {
        return Promise.reject({ scode: 500, data: `updating ${name}'s phone number failed` });
      }
      return Promise.reject(error);
    });
};

const deletePerson = (id) => {
  return startConnection()
    .then(() => Person.findByIdAndDelete(id))
    .then((person) => {
      if (!person) {
        return Promise.reject({
          scode: 404,
          data: "The person not in phonebook",
        });
      }
      return { scode: 204, data: null };
    })
    .catch(({ name }) => {
      if (name == "CastError") {
        return Promise.reject({ scode: 400, data: "Invalid Id" });
      }
      return Promise.reject({ scode: 500, data: "deleting person failed" });
    });
};

const total = () => {
  return startConnection()
    .then(() => Person.countDocuments({}))
    .then((count) => ({ scode: 200, data: count }))
    .catch((e) => {
      return Promise.reject({
        scode: 500,
        data: "counting people on phonebook failed",
      });
    });
};

export { getPhonebook, updatePerson, addPerson, findPerson, total, deletePerson };
