const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const MongoClient = require('mongodb').MongoClient

//aqui o express permite adicionar uma middleware para converter dados do form
app.use(bodyParser.urlencoded({extended: true}))
//renderização
app.set('view-engine', 'ejs')

var db

MongoClient.connect('mongodb+srv://admin:admin123@cluster0-znepd.mongodb.net/test?retryWrites=true&w=majority', (err, client) => {
        if (err) return console.log('err')
        db = client.db('star-wars-quotes') // whatever your database name is
        app.listen(3000, () => {console.log('listening on 3000')})
})

app.get('/', function(req, res){
    //res.sendFile(__dirname + '/index.html')
    db.collection('quotes').find().toArray((err, result) => {
      if (err) return console.log(err)
      // renders index.ejs
      //res.sendFile(__dirname + '/index.html')
      res.render('index.ejs', {quotes: result})
    })
})

// esta requisição recebe a action '/quotes' e busca no arquivo html os parâmetros 
// 'name' e 'quote'
app.post('/quotes', (req, res) => {
    db.collection('quotes').save(req.body, (err, result)=>{
        if(err) return console.log(err)
        console.log('saved to database')
        res.redirect('/')
    })
})

// app.get('/', (req, res) => {
//   db.collection('quotes').find().toArray((err, result) => {
//     if (err) return console.log(err)
//     // renders index.ejs
//     //res.sendFile(__dirname + '/index.html')
//     res.render('index.ejs', {quotes: result})
//   })
// })
