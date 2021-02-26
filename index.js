//Express request
const express = require("express")
//Morgan library request
const morgan = require('morgan')

const app = express()
//Poniendo a funcionar morgan 
//app.use(morgan("dev"))

app.use(express.json())

morgan.token('myTokenBody', (req) => {
    if (req.body) return JSON.stringify(req.body)
    return ''
})


app.use(
    morgan(
        ':method :url :status :res[content-length] :myTokenBody - :response-time ms'
    )
)

//Agregando el objeto lista de personas
const persons = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "040-123456"
    },
    {
        id: 2,
        name: "Ada Lovelace",
        number: "39-44-5323523"
    },
    {
        id: 3,
        name: "Dan Abramov",
        number: "12-43-234345"
    },
    {
        id: 4,
        name: "Mary Poppendy",
        number: "39-23-6423122"
    }
]
//Seleccionando el puerto de ejecución de la app
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on http://localhost: ${PORT}`)
})


//Ejercicio 0
app.get("/", (request, response) => {
    response.send("<h1>Hello world</h1>")
})


//Ejercicio 1
app.get("/api/persons", (req, resp) => {
    resp.json(persons)
})


//Ejercicio 2
app.get("/info", (req, resp) => {
    resp.send(`Phonebook has info for ${infoPersons} people  ${new Date()}`)
})


//Ejercicio 3
app.get("/api/persons/:id", (req, resp) => {
    const { id } = req.params
    const person = persons.find(item => item.id === Number(id))
    if (person) {
        resp.json(person)
    } else {
        resp.status(404).end()
    }
})


//Ejercicio 4

app.get("/api/persons/result/:id", (req, resp) => {

    const { id } = req.params
    const resultPersons = persons.filter(item => item.id !== Number(id))
    resp.json(resultPersons)

})

//Ejercicio 5

app.post("/api/persons/newperson/", (req, resp) => {
    const newPerson = req.body
    const resultpersonone = persons.concat(newPerson)
    persons.push({
        id: persons.length + 1
    })

    console.log(resultPersonone)
    resp.status(201).json(newperson)

})