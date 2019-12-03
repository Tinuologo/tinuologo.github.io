const express = require('express');
const fetch = require('node-fetch');

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));


app.get('/api', (req, res) => {
  const baseURL = 'https://api.umd.io/v0/courses/list';
  fetch(baseURL)
    .then((r) => r.json())
    .then((data) => {
      let instArray = [];
      for (let i = 0; i <data.length; i++) {
        if (data[i]["course_id"].includes("INST")) {
          instArray.push(data[i]);
        }
      }  
      //console.log(instArray);
      //console.log(instArray.length);
      return instArray;
    })
    .then(data => data.map(c => c.course_id + ": " + c.name))
    .then((data) => {
      console.log(data);
      res.send({ data: data });
    })
    .catch((err) => {
      console.log(err);
      res.redirect('/error');
    });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));