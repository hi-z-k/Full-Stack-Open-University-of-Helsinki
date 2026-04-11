import {Schema, model} from "mongoose"

const userSchema = Schema({
    name: {
        type: String,
        required: true,
        minlength: 5
    },
    username: {
        type: String,
        required: true,
        minlength: 5,
        unique: true
    },
    passwordHash: {
        type: String,
        required: true,
    }
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const User = model('User', userSchema)

export default User