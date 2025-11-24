import express, { request, response } from "express";
import morgan from "morgan";
const app = express();
const PORT = process.env.PORT || 3001


const tiny = `:method :url :status :res[content-length] - :response-time ms `
morgan.token('content',(req,res)=>{
  if (req.body){
    return `${JSON.stringify(req.body)}`
  }
  return ``
})


app.use(express.static('dist'))
app.use(express.json())
app.use(morgan(`${tiny} :content`))

let persons = [
  {
    "name": "Arto Hellas",
    "phone": "040-123456",
    "id": "1"
  },
  {
    "name": "Ada Lovelace",
    "phone": "39-44-5323523",
    "id": "2"
  },
  {
    "name": "Dan Abramov",
    "phone": "12-43-234345",
    "id": "3"
  },
  {
    "name": "Mary Poppendieck",
    "phone": "39-23-6423122",
    "id": "4"
  }
]
app.get('/api/persons', (request, response) => {
  response.json(persons)
})
app.get('/info', (request, response) => {
  let message = `
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${new Date()}</p>
    `
  response.type('html').send(message)
})


app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const data = persons.find(n => n.id === id)
  if (data) response.json(data)
  else response.status(404).send("Person not found in the phonebook")
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  let prevLength = persons.length
  persons = persons.filter(n => n.id !== id)
  if (prevLength === persons.length) {
    return response.status(404).json({ error: 'ID not found' })
  }
  response.status(204).end()
})


const generateId = () => {
  const rand = (max) => {
    return Math.floor(Math.random() * max)
  }
  const idList = persons.map(n => +n.id)
  const maxDouble = 2 * Math.max(...idList) 
  let id = rand(maxDouble)
  let idExists = idList.find(idNum => idNum === id)
  while (idExists) {
    id = rand(maxDouble)
    idExists = idList.find(idNum => idNum === id)
  }
  return `${id}`
}


app.post('/api/persons', (request, response) => {
  const data = request.body
  const names = persons.find(n=>n.name===data.name)
  if (names){
    response.status(409).json({ error: 'name must be unique' })
    return
  }
  if (data.name && data.phone) {
    let res = {
      name: data.name,
      phone: data.phone,
      id: generateId()
    }
    persons.push(res)
    response.status(201).json(res)
  }
  else {
    response.status(400).json({ error: 'Missing critical data' })
  }
})

app.listen(PORT, () => {
  console.log(`Notes API is live at Port ${PORT}`)
})
