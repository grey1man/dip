const express = require('express');
const port = 3000;
const app = express();
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require("body-parser");
const { request } = require('express');
const urlencodedParser = bodyParser.urlencoded({extended: false});


//http://localhost:3000/

app.use('/', express.static(__dirname + '/public'));

app.post('/auth', bodyParser.json(), (request, response) =>
{
  const db = new sqlite3.Database('testdb.db', {root: __dirname}, sqlite3.OPEN_READONLY, (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the chinook database.');
  });

  db.serialize(function() {

    db.get('SELECT * FROM peoples WHERE log = ? AND pas = ?', [request.body.log, request.body.pas] ,function(err, row) {
      if (row === undefined)
      {
        response.redirect('http://localhost:3000/');
        db.close();
      }
      else
      {
        row.log_in = 1
        response.json(row)
        db.close();
      }
    });
  });
});

app.get('/wp', urlencodedParser, (request, response, next) =>{
  if (request.query.log_in == 1)
  {
    next()
  }
  else
  {
    response.redirect('http://localhost:3000/');
  }
})
app.use('/wp', express.static(__dirname + '/wp'));

app.post('/hours', bodyParser.json(), (request, response) =>{
  const db = new sqlite3.Database('testdb.db', {root: __dirname}, sqlite3.OPEN_READONLY, (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the chinook database.');
  });
  console.log(request.body);
  db.serialize(function() {
    db.get(`SELECT lections, practise, labs, srs FROM hours WHERE first_name = ? AND second_name = ? AND 
    third_name = ? AND discipline = ? AND institute = ? AND course = ? AND dir_prep = ? AND qualification = ? AND form_ed = ?`, 
    [request.body.first_name, request.body.second_name, request.body.third_name, request.body.discipline, request.body.institute,
      request.body.course, request.body.dir_prep, request.body.qualification, request.body.form_ed] ,function(err, row) {
      if (row === undefined)
      {
        let answ = {err : 1}
        response.json(answ)
        db.close();
      }
      else
      {
        response.json(row)
        db.close();
      }
    });
  });
})


//delete
app.use('/test', express.static(__dirname + '/pag'));

const server = app.listen(port, (error) => {
  if (error) return console.log(`Error: ${error}`);
  console.log(`Server listening on port ${server.address().port}`);
});



