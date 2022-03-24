const express = require('express');

const app= express();
app.use(express.json())

const persons=[
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
  const person = persons.find(person => person.id===Number(id));

  if(!person){
    res.status(404).json({message:'archivo no existente'})
  }else{
    res.json(person)
  }
})

app.post('/api/persons',(req,res)=>{
  
  let randonId =Math.floor(Math.random() * 100000) + 1;
  const newPerson ={
    id:randonId,
    name: "pepito",
    number: "39-23-6423122"
  }
 
  const valided=persons.find(person=>person.name===newPerson.name)

  if (valided===undefined && newPerson.name!="" && newPerson.number!=""){
      res.json(newPerson)
  }else{
    if(valided!==undefined &&newPerson.number==""){
      res.status(404).json({error:'not name in new document and not number in new document'})
    }
    else if(newPerson.name==""){
      res.status(404).json({error:'not name in new document'})
    }else if(newPerson.number==""){
      res.status(404).json({error:'not number in new document'})
    }else if(valided!==undefined){
      res.status(404).json({error:'name must be unique'})
    }
  }  
})

const port= process.env.PORT || 3001;
app.listen(port);
console.log(`Server runnig at http://localhost:${port}/`)