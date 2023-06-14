const cors = require('cors');
const express = require('express')
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const app = express()
const uri = `mongodb+srv://hansi20ra:LaLa123@cluster0.xogz7vg.mongodb.net/?retryWrites=true&w=majority`

const carSchema = new mongoose.Schema({
  numberPlate: String,
  date: Date,
  customerId: String,
  name: String,
  carModel: String,
  milage: Number,
 
});

const Car = mongoose.model('Car', carSchema);

// **
const port = 8000
app.use(cors());
app.use(bodyParser.json());

// create route for post method
app.post('/postdata', (req , res) => {
 // res.send('Hello World!')
  console.log(req.body);

  const car = new Car({
    numberPlate: req.body.NumberPlate,
    date:req.body.date,
    customerId: req.body.CustomerId,
    name:req.body.name,
    carModel: req.body.CarModel,
    milage: req.body.Milage
  });

  car.save()
    .then(() => {
      console.log('Data saved to MongoDB');
      res.send('Data saved to MongoDB');
    })
    .catch(error => {
      console.error(error);
      res.status(500).send('Error saving data to MongoDB');
    });

})


// **
// create route for get method
app.get('/getdata', (req , res) => {
 Car.find()
    .then(cars => {
      res.json(cars);
    })
    .catch(error => {
      console.error(error);
      res.status(500).send('Error retrieving car data from MongoDB');
    });
})

async function connect(){
  try{
    await mongoose.connect(uri);
    console.log("connected to MongoDB");
  }catch(error){
    console.error(error);
  
  }
  }
connect()

app.listen(port, () => {
  
  console.log(`Example app listening on port ${port}`)
})