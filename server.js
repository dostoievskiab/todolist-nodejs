const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const porta = 3000 //Porta do listening
const MongoClient = require('mongodb').MongoClient
var db

//Conexão com o DB e informações básicas sobre o funcionamento
//Retirado o primeiro paramento por que contem dados do BD
MongoClient.connect('mongodb://dbuser:Teste123@ds149324.mlab.com:49324/db-crud', (err,database) =>
{
  if (err) return console.log(err)
  db = database
  app.listen(porta, function() {
    console.log('Listening na Porta: ' + porta);
    console.log('Caminho: ' + __dirname);
  })
})

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public')) //Define que a pasta public para que o servidor possa 'servir' as mesmas.
app.use(bodyParser.json())
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  db.collection('quotes').find().toArray((err, result) =>{
    if (err) return console.log(err)
    res.render('index.ejs', {quotes: result})
  })
})

app.put('/quotes', (req, res) => {
  db.collection('quotes').findOneAndUpdate({name: req.body.procura}, {
    $set: {
      name: req.body.name,
      quote: req.body.quote
    }
  }, {
    sort: {_id: -1},
    updsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})

app.post('/quotes', (req, res) => {
  db.collection('quotes').save(req.body, (err, result) =>
  {
    if (err) return console.log(err)
    res.redirect('/')
  })
})

app.delete('/quotes', (req, res) =>{
  db.collection('quotes').findOneAndDelete({name: req.body.name},
    (err, result) => {
      if (err) return res.send(500, err)
      res.send({message: 'Quote deleted!'})
    })
})
