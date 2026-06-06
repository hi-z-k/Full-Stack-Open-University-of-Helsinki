import {Schema, model} from "mongoose"

const commentSchema = Schema({
  content: String,
  user: {
    type: Schema.Types.ObjectId,
    ref:"User",
    required: true
  }
})

commentSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Comment = model('Comment', commentSchema)

export default Comment