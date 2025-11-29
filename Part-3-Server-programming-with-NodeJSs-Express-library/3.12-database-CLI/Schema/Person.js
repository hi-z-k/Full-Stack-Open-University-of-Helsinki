import mongoose from "mongoose"
const {Schema,model} = mongoose


const personSchema = new Schema({
    fullName: String,
    phone: String,
})
const Person = model('Person',personSchema)
function makePerson(fullName,phone){
    return new Person({
        fullName,
        phone,
    })
}

export {makePerson,Person}