import mongoose from "mongoose"
const {Schema,model} = mongoose


const personSchema = new Schema({
    name: String,
    phone: String,
})
personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})
const Person = model('Person',personSchema)


export default Person