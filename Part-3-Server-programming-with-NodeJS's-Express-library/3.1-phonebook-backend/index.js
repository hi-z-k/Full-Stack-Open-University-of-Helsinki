import express, { response } from "express";

const app = express();
const PORT = 3001;
const persons =[
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
app.get('/api/persons',(request,response)=>{
    response.json(persons)
})
app.get('/info',(request,response)=>{
    let message = `
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${new Date()}</p>
    `
    response.type('html').send(message)
})


app.listen(PORT,()=>{
    console.log(`Notes API is live at Port ${PORT}`)
})
