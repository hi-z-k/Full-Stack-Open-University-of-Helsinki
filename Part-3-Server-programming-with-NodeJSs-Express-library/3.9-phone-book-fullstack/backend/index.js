import express, { response } from "express";
import morgan from "morgan";
import {
  getPhonebook,
  addPerson,
  findPerson,
  deletePerson,
  updatePerson,
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

app.get("/api/persons", (request, response,next) => {
  getPhonebook()
  .then((persons) => response.json(persons))
  .catch(error => next(error))
});

app.get("/api/persons/:id", (request, response,next) => {
  const id = request.params.id;
  findPerson(id)
  .then(({ scode, data }) => {
    response.status(scode).json(data)
  })
  .catch(error => next(error));
});

app.post("/api/persons", (request, response,next) => {
  const data = request.body;
  const { name, phone } = data;
  addPerson(name, phone)
  .then(({ scode, data }) => {
    response.status(scode).json(data);
  })
  .catch(error => next(error));
});

app.get("/info", async (request, response,next) => {
  try {
    const { scode, data } = await total();
    response.status(scode).type("html").send(`
      <p>Phonebook has info for ${data} people</p>
      <p>${new Date()}</p>
      `);
  } catch (error) {
      next(error)
    }
});

app.delete("/api/persons/:id", (request, response,next) => {
  const id = request.params.id;
  deletePerson(id).then(({ scode, data }) => {
    response.status(scode).json(data);
  })
  .catch(error => next(error));
});


app.put("/api/persons/:id", (request, response,next) => {
  const newData = request.body;
  const id = request.params.id;
  updatePerson(id,newData).then(({ scode, data }) => {
    response.status(scode).json(data);
  })
  .catch(error => next(error));
});


app.use((request,response,next)=>{
  response.status(404).send({
    error: "the resource doesn't exist"
  })
})

const errorHandler = (error,request,response,next) =>{
  const message = error.data || error.message || "something went wrong"
  if (error.name === 'ValidationError'){
    return response.status(400).json({ message })
  }
  else if (error.scode){
    return response.status(error.scode).json({ message })
  }
  return response.status(500).json({ message})
}

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Phonebook API is live at Port ${PORT}`);
});
