const express = require('express');
const app = express();
const Joi = require("@hapi/joi");
const path = require('path');

base_path = 'Static/HTML/'
app.use(express.json());
app.use(express.static('Static'));
//HOME PAGE
app.get('/', (req, res) => {
  res.sendFile(base_path + 'home.html', {
      root: path.join(__dirname, './')
  })
});

//ABOUT ME PAGE
app.get('/about', (req, res) => {
    res.sendFile(base_path +'demofile1.html', {
        root: path.join(__dirname, './')
    })
})

//SEND INFO PAGE WITH RESPONSE?????


////////////////////PORT STUFF///////////////////
//env variable set outside application ex PORT
const port = process.env.PORT || 8080;
app.listen(port, ()=> {
  console.log(`listening on port ${port}...`)
});
