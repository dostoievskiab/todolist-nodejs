const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const porta = 3000 //Porta do listening
const MongoClient = require('mongodb').MongoClient
var db

//Conexão com o DB e informações básicas sobre o funcionamento
MongoClient.connect('mongodb://', (err,database) =>
{
  if (err) return console.log(err)
  db = database
  app.listen(porta, function() {
    console.log('Listening na Porta: ' + porta);
    console.log('Caminho: ' + __dirname);
  })
})

app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine', 'ejs')


app.get('/', (req, res) => {
  db.collection('quotes').find().toArray((err, result) =>{
    if (err) return console.log(err)
    res.render('index.ejs', {quotes: result})
  })
})


app.post('/quotes', (req, res) => {
  db.collection('quotes').save(req.body, (err, result) =>
  {
    if (err) return console.log(err)
    res.redirect('/')
  })
})
