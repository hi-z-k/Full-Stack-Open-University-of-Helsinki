import express from "express";
import morgan from "morgan";
import {
  getPhonebook,
  addPerson,
  findPerson,
  deletePerson,
  total,
} from "./Database/mongo.js";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT || 3001;

const tiny = `:method :url :status :res[content-length] - :response-time ms `;
morgan.token("content", (req, res) => {
  if (req.body) {
    return `${JSON.stringify(req.body)}`;
  }
  return ``;
});

app.use(express.static("dist"));
app.use(express.json());
app.use(morgan(`${tiny} :content`));

app.get("/api/persons", (request, response) => {
  getPhonebook().then((persons) => response.json(persons));
});

app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  findPerson(id).then(({ scode, data }) => {
    response.status(scode).json(data);
  });
});

app.post("/api/persons", (request, response) => {
  const data = request.body;
  const { name, phone } = data;
  addPerson(name, phone).then(({ scode, data }) => {
    response.status(scode).json(data);
  });
});

app.get("/info", async (request, response) => {
  try {
    const { scode, data } = await total();
    response.status(scode).type("html").send(`
      <p>Phonebook has info for ${data} people</p>
      <p>${new Date()}</p>
      `);
  } catch (e) {
    response.status(500).send("Something went wrong");
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  deletePerson(id).then(({ scode, data }) => {
    response.status(scode).json(data);
  });
});

app.listen(PORT, () => {
  console.log(`Phonebook API is live at Port ${PORT}`);
});
