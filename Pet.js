var express = require('express');
const app = express();
var mongoose = require('mongoose')

var bodyParser = require('body-parser');
// var helmet = require('helmet');

app.use(bodyParser.urlencoded({ extended: false }));

// app.use(helmet());

mongoose.connect('mongodb://localhost:27017/vvvvv')

const surveySchema = new mongoose.Schema({
    name: String,
    breed: String,
    petName: String,
    petType: String,
    petAge: Number
});

const Survey = mongoose.model('MMMMM', surveySchema);

app.listen(5000, () => {
    console.log("Application started and Listening on port 5000");
  });
  
app.get("/", (req, res) => {
    res.sendFile(__dirname+'/Petsurvey.html')
  });


  app.post('/survey', async (req, res) => {
    const survey = new Survey({
        name: req.body.name,
        breed: req.body.breed,
        petName: req.body.petName,
        petType: req.body.petType,
        petAge: req.body.petAge
    });

    try {
        await survey.save();
        res.send('Survey submitted successfully!');
    } catch (ex) {
        res.status(500).send('Something went wrong!');
    }
});


app.get('/surveys', async (req, res) => {
    const count = await Survey.countDocuments();
    res.send(`Number of surveys: ${count}`);
});


  // app.get('/surveys_age', async (req, res) => {
  //   const count = await Survey.countDocuments({ petAge: { $lt: 3 } });
  //   res.send(`Number of surveys with petAge below 3: ${count}`);
  // });
  