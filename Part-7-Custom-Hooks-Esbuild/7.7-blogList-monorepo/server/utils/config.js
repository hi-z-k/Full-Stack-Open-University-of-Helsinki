import 'dotenv/config'

const MONGO_URL = process.env.MONGO_URL
const PORT = process.env.PORT
const SALT_ROUND = 10
const SECRET = process.env.SECRET
const ENV = process.env.NODE_ENV

export {MONGO_URL, PORT, SALT_ROUND, SECRET, ENV}