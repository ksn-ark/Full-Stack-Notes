const mongoose = require('mongoose')
const logger = require('../utils/logger')

if (process.argv.length < 3) {
  logger.info('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://Nark:${password}@cluster0.7zpdp1o.mongodb.net/noteApp?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

Note.find({}).then((result) => {
  result.forEach((note) => {
    logger.info(note)
  })
  mongoose.connection.close()
})
