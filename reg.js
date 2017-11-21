
const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const bodyParser = require('body-parser');
const app = express();
var db;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
var url = 'mongodb://team:password123@ds111336.mlab.com:11336/projectx';
app.listen(3000,() =>{
    console.log("listenning on 3000");
    });
MongoClient.connect(url, (err, database)=> {
  if (err) throw err;
  db= database;
	console.log("before server");
    
});
 
app.post('/quotes',(req,res) => {
  var myobj = { name: req.body.name, password: req.body.password, phone: req.body.phone, email: req.body.email, gender: req.body.gender, age: req.body.age };
  db.collection("quotes").save(myobj, (err, res)=> {
    if (err) throw err;
    console.log("inserted");
    db.close();
  });
  res.send('inserted');
});
 
app.get('/', (req, res) => {
  //db.collection('quotes').find().toArray(function(err, results) {
  // if (err) return console.log(err)
    // renders index.ejs
    res.render('index.ejs', {/*quotes: results*/})
});
//});