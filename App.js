const express = require('express');
const morgan = require('morgan');

const app= express();
// app.use(morgan('dev'))
app.use(express.json())

morgan.token('body', (req, res) => {
  if(req.method==="POST"){
    return JSON.stringify(req.body)
  }
});
  app.use(morgan(':method :url :status :response-time ms - :res[content-length] :body '));
let persons=[
  {
    id:1,
    name: "arto Hellas",
    number: "040-123456"
  },
  {
    id:2,
    name: "ada Lovelace",
    number: "39-44-5323523"
  },
  {
    id:3,
    name: "Dan Abramov",
    number: "12-43-234345"
  },
  {
    id:4,
    name: "Mary Poppendick",
    number: "39-23-6423122"
  }
]
app.get('/info',(req,res)=>{
  res.send(
    `<p>Phonebook has info for ${persons.length} people</p>
    <p> ${new Date()}</p>`
    )
})

app.get('/api/persons',(req,res)=>{
  res.json(persons)
})

app.get('/api/persons/:id',(req,res)=>{
  const id=req.params.id;
  const person = persons.find(person => person.id===Number(id));

  if(!person){
    res.status(404).json({message:'no existe'})
  }else{
    res.json(person)
  }
})

app.delete('/api/persons/:id',(req,res)=>{
  const id=req.params.id;
  const person = persons.find(person => person.id === Number(id));

  if(!person){
    res.status(404).json({message:'usuario no existe'})
  }else{
    persons=persons.filter(person=>person.id !== Number(id))
    res.json(persons)
  }
})

app.post('/api/persons',(req,res)=>{
  const newPerson=req.body;
  const id=Math.floor(Math.random() * 100000) + 1;

  if (!newPerson.name) {
    res.status(404).json({ message: `Name is empty` })
  } else if(!newPerson.number){
    res.status(404).json({ message: `Number is empty` })
  }else if (persons.find(element => element.name === newPerson.name)) {
    res.status(404).json({ message: `Name already exists` });
  } else {
    newreg={...newPerson,"id":id};
    persons.push(newreg)
    res.json(persons)
    res.status(201)  
  };
})

const port= process.env.PORT || 3001;
app.listen(port);
console.log(`Server runnig at http://localhost:${port}/`)