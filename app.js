const express = require('express');
const app = express();
const Joi = require("@hapi/joi");
const path = require('path');
const jsr = require('jsrender');
const fmail = require('./JS/Mail.js');
const mongodb = require('./JS/MongoDB.js');

var error = { status: "", message: "" };
console.log(fmail.Mailer);
console.log(mongodb);

base_path = '/Static/HTML/';

app.engine('html', jsr.__express); // Set JsRender as template engine for .html files
app.set('view engine', 'html');
app.set('views', __dirname + base_path); // Folder location for JsRender templates for Express

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
app.get("/test", async (request, response) => {
    response.render('test.html',error);

});


app.post("/register", async (request, response) => {
    console.log(request.body);
    console.log("/register Req");
    mongodb("register", request.body).then(function (result) {
        console.log("SUCCESS");
        console.log(result);
       // error = result;
    }).catch(function (error) {
        console.log("ERROR");
       this.error = error
    });
    console.log(error);
    response.redirect("/");
});
app.get("/login",  async (request, response) => {
    response.redirect("/test");

});
app.get("/register",  async (request, response) => {
    response.redirect("/test");

});
app.post("/login", async (request, response) => {
    console.log(request.body);
    console.log("/login Req");
    error = mongodb("login", request.body);
    response.redirect("/");
   
});

app.get("/dump", async (request, response) => {
    try {
        mongodb("dump", request.body).then(function (result) {
            console.log("SUCCESS");
            //error = result;
            response.send(result);
        }).catch(function (error) {
            console.log("ERROR");
            console.log(error);
        });
    } catch (error) {
        response.status(500).send(error);
    }
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
