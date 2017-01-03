// NOTE
// This is NOT for actual production
// This is for testing the production build process
// https://expressjs.com/en/advanced/best-practice-performance.html

import express from 'express';
import path from 'path';
import open from 'open';
import compression from 'compression';

/* eslint-disable no-console */

const port     = 3000;
const app      = express();

app.use(compression()); // enable gzip
app.use(express.static('dist'));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

// updated to use heroku test app https://enigmatic-everglades-55826.herokuapp.com/
// app.get('/users', function(req, res) {
//   // hard coded for simplicity. pretend this hits a real database
//   res.json([
//     {"id":1, "firstName":"Bob", "lastName":"Smith", "email":"bob@gmail.com"},
//     {"id":2, "firstName":"Tammy", "lastName":"Norton", "email":"tnorton@yahoo.com"},
//     {"id":3, "firstName":"Tina", "lastName":"Lee", "email":"lee.tina@hotmail.com"}
//   ])
// });

app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    open('http://localhost:' + port);
  }
});
