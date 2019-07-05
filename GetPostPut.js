const express = require('express');
const app = express();
const Joi = require("@hapi/joi");

app.use(express.json());


//app.post()
//app.put()
//app.delete()
const items = [
  {id:1, name: 'derp'},
  {id:2, name: 'derp1'},
  {id:3, name: 'derp2'}
]
app.get('/', (req, res) => {
  res.send('Hello World!!!');
});

app.get('/list', (req, res) => {
  res.send(items);
});

app.post('/list', (req,res)=>{
  const { error } = validateItem(req.body);

  if(error){
    res.status(400).send(error.details[0].message);
    return;
  }

  const item = {
    id: items.length +1,
    name: req.body.name
  };
  items.push(item)
  res.send(item)
});

app.get('/list/:id', (req, res)=>{
  const item = items.find(c => c.id === parseInt(req.params.id));
  if(!item) res.status(404).send('Item not found');//404
  else res.send(item);
});

app.put('/list/:id', (req, res)=>{
  const item = items.find(c => c.id === parseInt(req.params.id));
  if(!item) res.status(404).send('Item not found');//404

  const { error } = validateItem(req.body);
  if(error){
    res.status(400).send(error.details[0].message);
    return;
  }
  item.name = req.body.name;
  res.send(item);
});

function validateItem(item){
  const schema = {
    name: Joi.string().min(3).required()
  }

  return Joi.validate(item, schema);
}

//env variable set outside application ex PORT
const port = process.env.PORT || 8080;
app.listen(port, ()=> {
  console.log(`listening on port ${port}...`)
});
