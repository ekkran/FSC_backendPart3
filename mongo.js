const mongoose = require('mongoose')

if (process.argv.length<3) {
    console.log('give password as argument')
    process.exit(1)
  }
  
  const password = process.argv[2]
  
  const url =
    `mongodb+srv://produser:${password}@fsc.059ah.mongodb.net/?retryWrites=true&w=majority&appName=FSC`
  
  mongoose.set('strictQuery',false)
  
  mongoose.connect(url)

  const personSchema = mongoose.Schema({
    name: String,
    number: String    
  })

  const Person = mongoose.model('Person', personSchema)

if(process.argv.length > 3){
    const person = new Person({
        name:process.argv[3],
        number:process.argv[4]
      })
    person.save().then(result => {
        console.log(`Added ${person.name} number ${person.number} to phonebook`)
        mongoose.connection.close()
    })
}
else{
    Person.find({}).then(result => {
        result.forEach(element => {
            console.log(element)
        });
        mongoose.connection.close()
    })
}

  
