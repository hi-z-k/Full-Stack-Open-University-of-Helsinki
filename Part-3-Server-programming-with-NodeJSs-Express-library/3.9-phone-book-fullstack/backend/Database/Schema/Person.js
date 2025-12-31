import mongoose from 'mongoose'
const { Schema, model } = mongoose


const personSchema = new Schema({
  name: {
    type: String,
    minlength: [3, 'the name must be at least three characters long.'],
  },
  phone: {
    type: String,
    minlength: [8, 'the phone number must be at least eight characters long.'],
    validate: {
      validator: (v) => /^\d{2,3}-\d+$/.test(v),
      message: props => `${props.value} is not a valid phone number!`
    }
  },
})
personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})
const Person = model('Person', personSchema)


export default Person