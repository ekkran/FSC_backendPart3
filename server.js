const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

morgan.token('body', (req, resp) => {
    return JSON.stringify(req.body)
})

app.use(cors())
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(express.static('dist'))

const mongoose = require('mongoose')

const Person = require('./models/person')

if (process.argv.length<3) {
    console.log('give password as argument')
    process.exit(1)
  }
  
const password = process.argv[2]

mongoose.set('strictQuery',false)

mongoose.connect(url)








function GetId(){
    return Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)
}

app.get('/api/persons', (request, response) => {
    Person.find({}).then(people => {
        response.json(people)
    })
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number.parseInt(request.params.id)
    const person = phonebook.find(x => x.id === id)
    if(person){
        response.json(person)
    }
    else{
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number.parseInt(request.params.id)
    phonebook = phonebook.filter(x => x.id !== id)

    response.status(204).end()
})

app.post('/api/persons/', (request, response) => {
    const body = request.body
    if(!body.name) {
        return response.status(400).json({error : "The name can not be empty"}).end()
    }
    if(!body.number){
        return response.status(400).json({error : "The number can not be empty"}).end()
    }
    if(phonebook.findIndex(x => x.name === body.name) >= 0){
        return response.status(400).json({error : "The name must be unique"}).end()
    }

    var newEntry = {
        id: GetId(),
        name: body.name,
        number: body.number
    }

    phonebook = phonebook.concat(newEntry)

    response.status(200).end()
})

app.get('/info', (request, response) => {
    response.send(`<p>Phonebook has info for ${phonebook.length} people</p> <p>${new Date().toString()}</p>`)
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })