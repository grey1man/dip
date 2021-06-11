const express = require('express');
const port = 3000;
const app = express();
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({extended: false});

//http://localhost:3000/
//app.get('/', express.static(__dirname + "/test"));
//app.use('/', express.static(__dirname + "/public"));
//app.get('/', (request, response) => {
//    console.log(`запрос пошел нахуй`);
    //response.sendFile('test/test.html', {root: __dirname});
//});
app.use('/', express.static(__dirname + '/pag'));


app.post('/db',bodyParser.json(), (request, response) => {
  console.log(request);
  let db = new sqlite3.Database('testdb.db', {root: __dirname}, sqlite3.OPEN_READONLY, (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the chinook database.');
  });
  console.log(`запрос пришел куда надо`);
  console.log(request);
  db.serialize(function() {
  db.get('SELECT info FROM namesd WHERE first_name = ? AND last_name = ?', [request.body.first_name, request.body.second_name] ,function(err, row) {
      console.log(row)
      if (row == undefined)
      {
        row = new Set();
        row.err = 'error of autorization';
        response.json(row);
        db.close();
      }
      else
      {
        row.log_in = 1;
        row.err = ''
        response.json(row);
        db.close();
      }    
    });
  });
});



const server = app.listen(port, (error) => {
    if (error) return console.log(`Error: ${error}`);
    console.log(`Server listening on port ${server.address().port}`);
});




