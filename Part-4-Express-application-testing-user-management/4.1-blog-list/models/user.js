import {Schema, model} from "mongoose"

const userSchema = Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        minlength: 3,
        unique: true
    },
    passwordHash: {
        type: String,
    },
    blogs: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Blog'
        }
    ]
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