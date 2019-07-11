const express = require('express');
const app = express();
const Joi = require("@hapi/joi");
const path = require('path');
const fmail = require('./Mail.js');

console.log(fmail.Mailer);


base_path = 'Static/HTML/'
app.use(express.urlencoded({ extended: true })); //html forms
//app.use(express.json());       //api calls
app.use(express.static('Static'));
//HOME PAGE

//////////////////ROUTING 'N STUFF///////////////////
app.get('/', (req, res) => {
  res.sendFile(base_path + 'home.html', {
      root: path.join(__dirname, './')
  })
});

//DATA PAGE
app.get('/resume', (req, res) => {
    res.sendFile(base_path +'IFrame.html', {
        root: path.join(__dirname, './')
    });
})

//SEND INFO PAGE WITH RESPONSE?????
//CONTACT ME POPUP
app.post('/', (req, res) => {

  const { error } = validateEmail(req.body);
  if(error){
    res.status(400).send(error.details[0].message);
    return;
  }
  console.log(req.body.name)
  fmail.Mailer(req.body.name,req.body.email,req.body.subject, req.body.message);
  res.sendFile(base_path +'home.html', {
      root: path.join(__dirname, './')
  });

});
//////////////////VALIDATION///////////////////
//EMAIL
function validateEmail(item){
  const schema = {
    email: Joi.string().email().required(),
    message: Joi.string().min(3).required(),
    subject: Joi.string().max(255),
    name: Joi.string().max(2000).required()
  };

  return Joi.validate(item, schema);
}
////////////////////PORT STUFF///////////////////
//env variable set outside application ex PORT
const port = process.env.PORT || 8080;
app.listen(port, ()=> {
  console.log(`listening on port ${port}...`)
});
